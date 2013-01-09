var configuration = require('../zoe-configuration'),
	_ = require('underscore'),
    mongo = require('../zoe/mongodb');

var db = mongo(configuration, console).db;

