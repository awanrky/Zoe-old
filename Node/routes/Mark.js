// modified code from http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/

var mongo = require('mongodb'),
	configuration = require('../configuration');

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
		db.collection('Mark', {safe:true}, function(err, collection) {
			if (err) {
				console.log('Cannot open Mark');
			}
		});
	}
});

exports.getById = function(req, res) {
	var id = req.params.id;
	console.log('Retreiving: ' + id);
	db.collection('Mark', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {
			res.send(item);
		});
	});
}

exports.getAll = function(req, res) {
	db.collection('Mark', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}

exports.add = function(req, res) {
	console.log('In exports.add');
	db.collection('Mark', function(err, collection) {
		collection.insert(req.body, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error': 'Error: '});
			} else {
				console.log('Added: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.update = function(req, res) {
	var id = req.params.id;
	var data = req.body;

	console.log("Updating: " + id);

	db.collection('Mark', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, data, {safe:true}, function(err, result) {
			if(err) {
				console.log('Error updating ' + id + ': ' + err);
				res.send({'error':'Error updating ' + id});
			} else {
				console.log('' + result + ' document(s) updated.');
				res.send(data);
			}
		});
	});
}

exports.delete = function(req, res) {
	var id = req.params.id;
	console.log('Deleting: ' + id);
	db.collection('Mark', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if(err) {
				res.send({'error': 'Error: ' + err});
			} else {
				console.log('' + result + ' document(s) deleted.');
				res.send(req.body);
			}
		});
	});
}