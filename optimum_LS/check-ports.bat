@echo off
echo Checking ports 3000-3010...

for /L %%p in (3000,1,3010) do (
    echo Checking port %%p...
    netstat -ano | findstr :%%p
)

echo Done checking ports.
pause
