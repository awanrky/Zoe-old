var _ = require('underscore');

var c;

var dataType = 'bodyWeight';

exports = module.exports = initialize;

function initialize(config) {
    c = config;

    setUpRoutes();
};

function setUpRoutes() {
    c.app.get(c.baseRoute + '/body-weight/range/:from/:to', getByDateRange);
    c.app.get(c.baseRoute + '/body-weight/page/:page/:pageSize', getByPage);

    c.app.post(c.baseRoute + '/body-weight', insertDate);

//    c.app.get(/^\/person\/(\w+)\/body-weight(?:\/(\w+))(?:\/(\w+))?$/, getByPersonId);
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

    c.mongo.db.collection('Data', function(err, collection) {
        collection.insert(record, function(error) {
            res.send('success');
        });
    });
}

function getByDateRange(req, res) {
    res.set('Cache-Control', 'no-cache');

    var person = req.params.person;
    var fromDate = new Date(req.params.from);
    var toDate = new Date(req.params.to);

    c.mongo.db.collection('Data', function(err, collection) {
        collection.find({
            'person': person,
            'type': dataType,
            'date': { $gt: fromDate, $lt: toDate }
        }, {
            sort: { date: 1 }
        }).toArray(function(error, items) {
            res.send(items);
        });
    });
}

function getByPage(req, res) {
    res.set('Cache-Control', 'no-cache');
    
    var person = req.params.person;
    var page = req.params.page;
    var pageSize = req.params.pageSize;
    
    c.mongo.db.collection(person, function(err, collection) {
        collection.find({
            'person': person,
            'type': dataType
        }, {
            sort: { date: 1 },
            skip: page * pageSize,
            limit: pageSize
        }).toArray(function (error, items) {
            res.send(items);
        });
    });
}