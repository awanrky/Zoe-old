var _ = require('underscore'),
    mongo = require('../../zoe/mongodb'),
    mongodb = require('mongodb');

var c;

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
        'type': 'weight',
        'value': data.value,
        'date': new Date(data.date),
        'createdOn': new Date()
    };

    mongo.db.collection(person, function(err, collection) {
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

    console.log(fromDate);
    console.log(toDate);

    mongo.db.collection(person, function(err, collection) {
        collection.find({
            'type': 'bodyWeight',
            'date': { $gt: fromDate, $lt: toDate }
        }).toArray(function(error, items) {
            res.send(items);
        });
    });
}

function getByPage(req, res, params) {
    res.set('Cache-Control', 'no-cache');
    
    var person = req.params.person;
    var page = req.params.page;
    var pageSize = req.params.pageSize;
    
    mongo.db.collection(person, function(err, collection) {
        collection.find({ 'type': 'bodyWeight' }).toArray(function(error, items) {
            res.send(items);
        });
    });
}