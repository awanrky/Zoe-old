& "D:/Program Files (x86)/JetBrains/WebStorm 6.0/bin/WebStorm.exe"

cmd /c start powershell -NoExit -Command { $Host.UI.RawUI.WindowTitle = "Zoe - Node Server"; set-location d:/Projects/Zoe; ./start-node-development.ps1; }

cmd /c start powershell -NoExit -Command { $Host.UI.RawUI.WindowTitle = "Zoe - Node Unit Tests"; set-location d:/Projects/Zoe; ./start-mocha.ps1; }

cmd /c start powershell -Command { set-location "C:\Users\Mark\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\LiveReload"; start-process ./LiveReload.appref-ms; }