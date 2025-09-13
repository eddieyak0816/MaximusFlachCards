# Kill any process using port 3000 (avoid EADDRINUSE)
Write-Host "Checking for existing process on port 3000..."
try {
    $netstat = netstat -ano | Select-String ":3000"
    foreach ($line in $netstat) {
        $parts = $line -split '\s+'
        $pid = $parts[-1]
        if ($pid -match '^[0-9]+$') {
            Write-Host "Killing process on port 3000 (PID $pid) ..."
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
} catch { Write-Host "No process found on port 3000 or failed to kill." }

<#
start-and-watch.ps1

Starts the local server in a new console window and opens the front-end in Chrome.
When the launched Chrome window is closed, the script stops the server and exits.

Usage: Right-click -> Run with PowerShell, or from PowerShell:
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
  .\start-and-watch.ps1
#>

# Resolve paths
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverDir = Join-Path $scriptDir 'server'
$indexPath = Join-Path $scriptDir 'index.html'

Write-Host "Starting server from: $serverDir"

# Decide whether to use an isolated temporary Chrome profile or the main profile.
# If the environment variable USE_MAIN_PROFILE is set to '1' or 'true', we'll open Chrome
# with the default user profile so existing IndexedDB (flashcards) is available.
$useMainProfile = $false
try { if ($env:USE_MAIN_PROFILE -and (($env:USE_MAIN_PROFILE -eq '1') -or ($env:USE_MAIN_PROFILE.ToLower() -eq 'true'))) { $useMainProfile = $true } } catch {}

if ($useMainProfile) {
    Write-Host "Using main Chrome profile (not isolated) - this will show your existing flashcards and signed-in state."
    $profileDir = $null
} else {
    # Create a temporary Chrome profile directory
    $profileDir = Join-Path $env:TEMP ("maximus_profile_{0}" -f ([guid]::NewGuid().ToString('N')))
    New-Item -ItemType Directory -Path $profileDir | Out-Null
}

# Start the server in a way that keeps only this PowerShell window visible when possible.
$startedInNewWindow = $false
try {
    # Prefer starting Node directly (equivalent to `npm start` which runs `node index.js`) so it runs in this console.
    $nodeCmd = (Get-Command node -ErrorAction SilentlyContinue)
    if ($nodeCmd) {
        Write-Host "Starting server with node (index.js) in this window..."
        $serverProc = Start-Process -FilePath $nodeCmd.Source -ArgumentList 'index.js' -WorkingDirectory $serverDir -NoNewWindow -PassThru -ErrorAction Stop
    } else {
        # If node isn't on PATH, fall back to npm via cmd.exe. Use a separate window so it behaves reliably.
        $cmdArgs = '/c npm start'
        Write-Host "Node not found on PATH; falling back to launching 'npm start' in a separate cmd window..."
        $serverProc = Start-Process -FilePath 'cmd.exe' -ArgumentList $cmdArgs -WorkingDirectory $serverDir -PassThru -ErrorAction Stop
        $startedInNewWindow = $true
    }
} catch {
    Write-Host "Failed to start server process: $($_.Exception.Message)"
    # Try a best-effort fallback to visible cmd window
    try { $serverProc = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c npm start' -WorkingDirectory $serverDir -PassThru -ErrorAction SilentlyContinue; $startedInNewWindow = $true } catch {}
}

Start-Sleep -Seconds 1

# Determine Chrome executable
$chromeExe = 'chrome.exe'
if (-not (Get-Command $chromeExe -ErrorAction SilentlyContinue)) {
    $possible = @(
        "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe",
        "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
    )
    foreach ($p in $possible) { if (Test-Path $p) { $chromeExe = $p; break } }
}

if (-not (Get-Command $chromeExe -ErrorAction SilentlyContinue)) {
    Write-Host "Chrome not found on PATH or in Program Files. Opening default browser instead (auto-stop may not work)."
    Start-Process -FilePath $indexPath
    Write-Host "Please close the server console window when finished." ; exit 0
}

# Build Chrome args. If using main profile, omit --user-data-dir so Chrome opens with your normal profile.
$urlPath = ($indexPath -replace '\\','/')
$quotedIndex = "`"file:///$urlPath`""

if ($useMainProfile) {
    $chromeArgs = "--new-window --no-first-run --no-default-browser-check --disable-extensions --disable-component-update --disable-background-networking --disable-session-crashed-bubble $quotedIndex"
    Write-Host "Launching Chrome with main profile (no isolated profile)..."
} else {
    # Build properly quoted user-data-dir for isolated profile
    $quotedProfile = "--user-data-dir=`"$profileDir`""
    $chromeArgs = "--new-window --no-first-run --no-default-browser-check --disable-extensions --disable-component-update --disable-background-networking --disable-session-crashed-bubble $quotedProfile $quotedIndex"
    Write-Host "Launching Chrome with isolated profile (clean flags)..."
}

$browserProc = Start-Process -FilePath $chromeExe -ArgumentList $chromeArgs -PassThru

Write-Host "Server PID: $($serverProc.Id); Browser PID: $($browserProc.Id)"

# If we're using the main profile, Chrome may spawn helper processes and the original process can exit immediately.
# In that case waiting on the browser process can cause this script to continue and stop the server too early.
if ($useMainProfile) {
    Write-Host "Using main Chrome profile. Waiting for the browser window to close..."
    # Wait for a Chrome window whose title matches the app to close. The app's page title
    # should include a recognizable keyword (e.g. 'Maximus'). Adjust if your title differs.
    $titlePattern = 'Maximus'
    try {
        while ($true) {
            $windows = Get-Process -Name chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -and $_.MainWindowTitle -like "*$titlePattern*" }
            if (-not $windows) { break }
            Start-Sleep -Seconds 1
        }
    } catch {
        Write-Host "Warning: failed to inspect browser windows; falling back to manual stop prompt."
        Write-Host "Press ENTER in this console to stop the server and exit."
        Read-Host | Out-Null
    }
    Write-Host "Browser window closed. Stopping server..."
    try { Stop-Process -Id $serverProc.Id -Force -ErrorAction SilentlyContinue } catch {}
} else {
    Write-Host "Waiting for the browser window to close..."
    # Wait for the specific browser process to exit
    try {
        $browserProc.WaitForExit()
    } catch {
        Write-Host "Warning: failed to wait for browser process. Proceeding to stop server anyway.";
    }

    try { Stop-Process -Id $serverProc.Id -Force -ErrorAction SilentlyContinue } catch {}
}

# Cleanup temporary profile
if (-not $useMainProfile) {
    try { Remove-Item -Recurse -Force $profileDir -ErrorAction SilentlyContinue } catch {}
}

