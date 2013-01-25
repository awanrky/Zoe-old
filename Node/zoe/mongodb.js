var mongo = require('mongodb');

exports = module.exports = initialize;

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server;
var config;
var logger;
var defaultLogger = {
    log: function() {}
};

exports.m = mongo;

exports.isOpen = function() {
    return exports.db && exports.db.state === 'connected';
};
exports.db = undefined;
exports.callback = function() {};

function getDatabaseInformationString() {
    return config.databaseServer +
        ":" +
        config.databasePort +
        "/" +
        config.databaseName +
        ": " +
        (exports.isOpen() ? "Open" : "Closed");
}

function initialize(configuration, consoleOrLogger) {
    config = configuration;
    logger = consoleOrLogger || defaultLogger;
    
    server = new Server(
	    config.databaseServer,
	    config.databasePort,
	    { auto_reconnect: true }
    );
    exports.db = new Db(config.databaseName, server, { safe: true });
    return exports;
}

exports.open = function(callback) {
    exports.db.open(function (err, db) {
        if (!err) {
            logger.log(getDatabaseInformationString());
        } else {
            logger.log(getDatabaseInformationString());
        }
        if (typeof callback != 'undefined') {
            callback(exports.isOpen);
        }
        exports.callback(exports.isOpen);
    });
};
