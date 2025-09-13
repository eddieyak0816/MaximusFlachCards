@echo off
REM Launch the app using your main Chrome profile (signed-in). Double-click this to open with existing IndexedDB data.
set USE_MAIN_PROFILE=1
start "Maximus (Main Profile)" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-and-watch.ps1"
exit /b 0
