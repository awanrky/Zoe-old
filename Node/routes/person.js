var _ = require('underscore');

var c;
var BSON;

exports = module.exports = initialize;

function initialize(config) {
    c = config;
    BSON = c.mongo.BSONPure;

    setUpRoutes();
};

function setUpRoutes() {
    c.app.get('/person/byid/:id', getById);
    c.app.get('/person/byname/:first/:middle/:last', getByName);
}

function sendError(res, error) {
    if (error) {
        res.type('json');
        res.json(500, {error: error});
        return true;
    }
    return false;
}

function getById(req, res) {
    res.set('Cache-Control', 'no-cache');
    var id = req.params.id;
    if (!(id.length === 24 || id.length === 12)) {
        sendError(res, "Invalid id: " + id);
        return;
    }
    
    c.mongo.db.collection('Person', function (err, collection) {
        if (sendError(res, err)) { return; }
        collection.find({ '_id': new BSON.ObjectID(id) }).toArray(function (error, items) {
            res.send(items);
        });
    });
};

function getByName(req, res) {
    res.set('Cache-Control', 'no-cache');
    var firstName = req.params.first;
    var middleName = req.params.middle;
    var lastName = req.params.last;
    
    c.mongo.db.collection('Person', function (err, collection) {
        if (sendError(res, err)) { return; }
        collection.find({ name: { first: firstName, middle: middleName, last: lastName } }).toArray(function (error, items) {
            res.send(items);
        });
    });
};