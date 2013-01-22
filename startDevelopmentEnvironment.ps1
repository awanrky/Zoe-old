& "C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\devenv.exe" "D:\Projects\Zoe\Zoe.sln"

cmd /c start powershell -NoExit -Command {$Host.UI.RawUI.WindowTitle = "Zoe - Node Server"; set-location d:\Projects\Zoe\Node; node ./zoe-node.js}
cmd /c start powershell -NoExit -Command {$Host.UI.RawUI.WindowTitle = "Zoe - Unit Tests"; set-location d:\Projects\Zoe\Node\public\Tests\Node; mocha}
cmd /c start powershell -NoExit -Command {$Host.UI.RawUI.WindowTitle = "Zoe - Mongo"; set-location d:\Projects\Zoe\Data; mongo ZoeDevelopment}