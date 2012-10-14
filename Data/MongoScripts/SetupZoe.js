
db.dropDatabase();

mark = {
	"name": {
		"first": "Mark",
		"middle": "Gilbert",
		"last": "Ott",
	},
	"birthday": ISODate("1967-03-13T01:30-06"),
	"type": "meta",
	"collectionMeta": "collectionMeta",
	"createdOn": new Date(),
	"source": "SetupZoe.js"
}

db.Mark.save(mark);

db.Mark.ensureIndex({collectionMeta: 1}, {unique: true, sparse: true});
db.Mark.ensureIndex({type: 1});
db.Mark.ensureIndex({createdOn: 1})

bulkInsert = [{
	"type": "test",
	"createdOn": new Date()
},{
	"type": "test",
	"createdOn": new Date()
}];

db.Mark.save(bulkInsert);