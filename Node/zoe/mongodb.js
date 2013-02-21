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

    exports.db.open(function(err, db) {
        logger.log(getDatabaseInformationString());
    });
    
    return exports;
}

