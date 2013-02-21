#!/bin/bash

PROJECT_DIRECTORY=`pwd`

PATH=$PATH:/usr/local/bin

# get all node packages for this project
cd "$PROJECT_DIRECTORY/Node"
npm install

#run node unit tests
mkdir "$PROJECT_DIRECTORY/test-results"
cd "$PROJECT_DIRECTORY/Node/public/scripts/test/node"
mocha --recursive --reporter xunit > "$PROJECT_DIRECTORY/test-results/node-unit-tests.xml"
