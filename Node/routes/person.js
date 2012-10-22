// modified code from http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/

var mongo = require('mongodb'),
	configuration = require('../configuration'),
	_ = require('underscore');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server(
	configuration.databaseServer, 
	configuration.databasePort, 
	{auto_reconnect: true}
);
db = new Db(configuration.databaseName, server, {safe:true});

db.open(function(err, db) {
	if (!err) {
		console.log(
			"Connected to " + 
			configuration.databaseServer +
			":" +
			configuration.databasePort +
			"/" +
			configuration.databaseName);
	}
});

exports.getById = function(req, res) {
	res.set('Cache-Control', 'no-cache');
	var person = req.params.person;
	var id = req.params.id;
	console.log('Retreiving: ' + id);
	db.collection(person, function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {
			res.send(item);
		});
	});
}

exports.getAll = function(req, res) {
	res.set('Cache-Control', 'no-cache');
	var person = req.params.person;
	db.collection(person, function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}

exports.getTypeData = function(req, res) {
    res.set('Cache-Control', 'no-cache');
    var person = req.params.person;
    var type = req.params.type;
    db.collection(person, function(err, collection) {
        collection.find({ 'type': type }).toArray(function(error, items) {
            res.send(items);
        });
    });
};

exports.getDistinctTypes = function(req, res) {
    res.set('Cache-Control', 'no-cache');
    var person = req.params.person;
    db.collection(person, function(err, collection) {
        collection.distinct('type', { }, function(err, items) {
            var types = [];
            // console.log("getDistinctTypes(), typeof items: " + typeof items);
            // console.log("getDistinctTypes(), items: " + items);
            // console.log("getDistinctTypes(), getting " + items.length + " items");
            var sendResult = _.after(items.length, function(t) {
                // console.log("getDistinctTypes(), sending...");
                res.send(t);
            });
            _.map(items, function(element, index, list) {
                collection.findOne({ 'typeMeta': items[index] }, function(err, item) {
                    if (err) {
                        types.push({ type: items[index], typeMeta: 'undefined', prettyName: items[index]  });
                    } else if (item) {
                        types.push( item );
                    } else {
                        types.push({ type: items[index], typeMeta: 'undefined', prettyName: items[index]  });
                    }
                    // console.log("getDistinctTypes(), item: " + items[index]);
                    sendResult(types);
                });
            });
            //res.send(items);
        });
    });
};

exports.add = function(req, res) {
    var person = req.params.person;
    db.collection(person, function(err, collection) {
        collection.insert(req.body, { safe: true }, function(error, result) {
            if (err) {
                res.send({ 'error': 'Error: ' });
            } else {
                console.log('Added: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.update = function(req, res) {
    var person = req.params.person;
    var id = req.params.id;
    var data = req.body;

    console.log("Updating: " + id);

    db.collection(person, function(err, collection) {
        collection.update({ '_id': new BSON.ObjectID(id) }, data, { safe: true }, function(err, result) {
            if (err) {
                console.log('Error updating ' + id + ': ' + err);
                res.send({ 'error': 'Error updating ' + id });
            } else {
                console.log('' + result + ' document(s) updated.');
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    var person = req.params.person;
    var id = req.params.id;
    console.log('Deleting: ' + id + ' from: ' + person);
    db.collection(person, function(err, collection) {
        collection.remove({ '_id': new BSON.ObjectID(id) }, { safe: true }, function(err, result) {
            if (err) {
                res.send({ 'error': 'Error: ' + err });
            } else {
                console.log('' + result + ' document(s) deleted.');
                res.send(req.body);
            }
        });
    });
};
