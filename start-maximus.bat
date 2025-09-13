@echo off
REM start-maximus.bat
REM Starts the local caption proxy in a new console window and opens index.html in the default browser.
REM Place this file in the repo root (same folder as index.html and the 'server' folder).

REM Resolve script directory
set SCRIPT_DIR=%~dp0

REM Start the server in a new window (keeps it running)
pushd "%SCRIPT_DIR%server"
start "Maximus Server" cmd /k "npm install && npm start"
popd

REM Wait a moment for the server to begin starting (optional)
timeout /t 1 >nul

REM Open the front-end index.html in the default browser
start "" "%SCRIPT_DIR%index.html"

echo Launched server and opened index.html. Close the "Maximus Server" window to stop the server.
exit /b 0
