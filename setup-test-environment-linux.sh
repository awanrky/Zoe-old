#!/bin/bash

PROJECT_DIRECTORY=`pwd`

PATH=$PATH:/usr/local/bin

# get all node packages for this project
cd "$PROJECT_DIRECTORY/Node"
npm install

# set up configuration
cd "$PROJECT_DIRECTORY/Node"
cp ./test-configuration.js ./zoe-configuration.js

# set up mongo test database
cd "$PROJECT_DIRECTORY/Data/MongoScripts"
mongo localhost:27017/ZoeTest setup-database.js
mongo localhost:27017/ZoeTest setup-testdata.js

# run node unit tests
mkdir "$PROJECT_DIRECTORY/test-results"
cd "$PROJECT_DIRECTORY/Node/public/scripts/test/node"
mocha --recursive --reporter xunit > "$PROJECT_DIRECTORY/test-results/node-unit-tests.xml"
