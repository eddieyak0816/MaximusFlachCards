@echo off
REM Launch the PowerShell launcher in a new window and exit this .bat so only the PowerShell window remains.
start "Maximus Launcher" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-and-watch.ps1"
exit /b 0
