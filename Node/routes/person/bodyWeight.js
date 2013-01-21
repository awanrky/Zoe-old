var _ = require('underscore');

var c;

var dataType = 'bodyWeight';
var collectionName = 'Data';

exports = module.exports = initialize;

function initialize(config) {
    c = config;

    setUpRoutes();
};

function setUpRoutes() {
    c.app.get(c.baseRoute + '/body-weight/range/:from/:to', getByDateRange);
    c.app.get(c.baseRoute + '/body-weight/page/:page/:pageSize', getByPage);

    c.app.post(c.baseRoute + '/body-weight', insertDate);

    c.app.delete(c.baseRoute + '/body-weight', deleteDate);

//    c.app.get(/^\/person\/(\w+)\/body-weight(?:\/(\w+))(?:\/(\w+))?$/, getByPersonId);
}

function deleteDate(req, res) {
    res.set('Cache-Control', 'no-cache');

    var person = req.params.person;
    var data = JSON.parse(req.body.data)[0];

    var record = {
        'person': person,
        '_id': data._id
    };

    c.mongo.db.collection(collectionName, function(err, collection) {
        if (err) {
            res.send(500, err);
            return;
        }
        collection.remove(record, {}, function(error, numberOfRemovedDocuments) {
            if (error) {
                res.send(500, error);
                return;
            }
            if (numberOfRemovedDocuments != 1) {
                res.send(500, numberOfRemovedDocuments + ' removed.  should have removed 1.');
            }
            res.send(200);
        });

    });
}

function insertDate(req, res) {
    res.set('Cache-Control', 'no-cache');

    var person = req.params.person;
    var data = JSON.parse(req.body.data)[0];
    
    var record = {
        'person': person,
        'type': dataType,
        'value': data.value,
        'date': new Date(data.date),
        'createdOn': new Date()
    };

    c.mongo.db.collection(collectionName, function (err, collection) {
        if (err) {
            res.send(500, err);
            return;
        }
        collection.insert(record, function (error) {
            if (error) {
                res.send(500, error);
                return;
            }
            res.send(200);
        });
    });
}

function getByDateRange(req, res) {
    res.set('Cache-Control', 'no-cache');

    var person = req.params.person;
    var fromDate = new Date(req.params.from);
    var toDate = new Date(req.params.to);

    c.mongo.db.collection(collectionName, function (err, collection) {
        if (err) {
            res.send(500, err);
            return;
        }
        collection.find({
            'person': person,
            'type': dataType,
            'date': { $gt: fromDate, $lt: toDate }
        }, {
            sort: { date: 1 }
        }).toArray(function (error, items) {
            if (error) {
                res.send(500, error);
                return;
            } 
            res.send(items);
        });
    });
}

function getByPage(req, res) {
    res.set('Cache-Control', 'no-cache');
    
    var person = req.params.person;
    var page = req.params.page;
    var pageSize = req.params.pageSize;
    
    c.mongo.db.collection(collectionName, function (err, collection) {
        if (err) {
            res.send(500, err);
            return;
        }
        collection.find({
            'person': person,
            'type': dataType
        }, {
            sort: { date: 1 },
            skip: page * pageSize,
            limit: pageSize
        }).toArray(function (error, items) {
            if (error) {
                res.send(500, error);
                return;
            }
            res.send(items);
        });
    });
}