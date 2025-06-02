@echo off
start http://localhost:3008
cd /d "%~dp0"
node server.js

:check
ping -n 2 localhost > nul
if errorlevel 1 goto check

exit
