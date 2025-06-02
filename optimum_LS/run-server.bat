@echo off
start http://localhost:3006
cd /d "%~dp0"
python -m http.server 3006

:check
ping -n 2 localhost > nul
if errorlevel 1 goto check

exit
