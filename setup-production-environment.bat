@echo off
echo.
echo ***********************************************************************************
echo                    Zoe Development Environment Setup
echo.
echo	- Make sure Node.js is installed
echo.
echo	- Make sure mongodb is installed and running on port 27017
echo.
echo	- WARNING!  This script will delete all data from the current PRODUCTION environment
echo.
echo ***********************************************************************************
pause
@echo on

cd Node
call npm install
cd ..
cd Data/MongoScripts
call SetupZoeProductionDatabase.bat

@echo off
echo.
echo Setup Complete