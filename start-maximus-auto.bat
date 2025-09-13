@echo off
REM Launch the PowerShell launcher in a new window using the main profile (so existing IndexedDB is visible), then exit.
set USE_MAIN_PROFILE=1
start "Maximus Launcher" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-and-watch.ps1"
exit /b 0
