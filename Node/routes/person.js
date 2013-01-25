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
    c.logger.log('Retreiving: ' + id);
    c.mongo.db.collection('Person', function (err, collection) {
        if (sendError(res, err)) { return; }
        collection.findOne({ '_id': new BSON.ObjectID(id) }, function (error, item) {
            if (sendError(res, error)) { return; }
            res.send(item);
        });
    });
};
