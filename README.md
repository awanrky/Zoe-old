Setup
=====

Install and set up environment
------------------------------

- Install [Node.js] [2]
- Install [mongodb] [3]
- clone repository at https://github.com/awanrky/Zoe
- copy Zoe/configuration.js to Zoe/zoe-configuration.js
- Edit zoe-configuration.js to point to the running instance of mongo
- run SetupDevelopmentEnvironment.bat

Run unit tests
--------------
(if you need to install mocha, run the command 'npm install -g mocha' at the command prompt)

- Server
	- change to Zoe/Node/public/Tests/Node directory at the command prompt
	- run 'mocha --recursive' command

- Client
	- run server (see Start Server section below)
	- navigate to http://<servername>:<serverport>/Tests/Web/ViewModelTests.html

Start Server
------------
- change to Zoe/Node directory at the command prompt
- run the command 'node .\zoe-node.js'
- point browser to node server/port specified in zoe-configuration.js (see Install and set up environment above)  for example: http://localhost:1976


License
=======
The MIT License (MIT) [1]
Copyright (c) 2013 Mark Ott

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	[1]:  http://opensource.org/licenses/MIT
	[2]:  http://nodejs.org/download
	[3]:  http://www.mongodb.org/downloads