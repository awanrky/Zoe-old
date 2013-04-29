#!/bin/bash
PROJECT_DIRECTORY=`pwd`

PATH=$PATH:/usr/local/bin

# get all node packages for this project
cd "$PROJECT_DIRECTORY/Node"
npm install

# set up configuration
cd "$PROJECT_DIRECTORY/Node"
cp ./test-configuration.js ./zoe-configuration.js
cp /mnt/Projects/Zoe/Node/oauth/twitter-private.js ./oauth/twitter-private.js
cp /mnt/Projects/Zoe/Node/oauth/fitbit-private.js ./oauth/fitbit-private.js

# set up mongo test database
cd "$PROJECT_DIRECTORY/Data/mongo-scripts"
mongo localhost:27017/ZoeTest setup-database.js
mongo localhost:27017/ZoeTest setup-testdata.js

# run node unit tests
mkdir "$PROJECT_DIRECTORY/test-results"
cd "$PROJECT_DIRECTORY/Node/public/scripts/test/node"
mocha --recursive --reporter xunit > "$PROJECT_DIRECTORY/test-results/node-unit-tests.xml"

echo -----------------------------------------------------------------------------
echo something is putting junk warning messages in my mocha output
echo for now, just get rid of it, later need to find why this happens
echo -----------------------------------------------------------------------------
find . -type f -exec sed -i 's/\[Error: Symbol kerberos_module not found.\]//g' {} \;
