& "C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\devenv.exe" "D:\Projects\Zoe\Zoe.sln"

cmd /c start powershell -NoExit -Command {$Host.UI.RawUI.WindowTitle = "Zoe - Node Server"; set-location d:\Projects\Zoe\Node; node ./zoe-node.js}

cmd /c start powershell -NoExit -Command {$Host.UI.RawUI.WindowTitle = "Zoe - Mongo"; set-location d:\Projects\Zoe\Data; mongo ZoeDevelopment}

# cmd /c start powershell -NoExit -Command {$Host.UI.RawUI.WindowTitle = "Zoe - Unit Tests"; set-location d:\Projects\Zoe\Node\public\scripts\tests\node; mocha --recursive; }
# Now using cygwin mintty and bash instead of powershell to run mocha.  the --watch parameter in mocha does not play well in the command prompt or in powershell, but it works ok when run through cygwin's mintty
# cmd /c d:\cygwin\bin\mintty --size "130,20" --title "Zoe - Node Unit Tests" --exec /bin/bash --login -i -c "cd /cygdrive/d/Projects/Zoe/Node/public/scripts/test/node; mocha --colors --recursive --reporter min --watch; /bin/bash;"

cmd /c d:\cygwin\bin\xterm -display 127.0.0.1:0.0 -e /bin/ssh mark@damselfly 'cd /mnt/Projects/Zoe/Node/public/scripts/test/node; mocha --colors --recursive --reporter min --watch;' 

# cmd /c start powershell -Command { set-location "C:\Users\Mark\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\LiveReload"; start-process ./LiveReload.appref-ms; }