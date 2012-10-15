dataSource = "SetupZoe.js";
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
	"source": dataSource
}

db.Mark.save(mark);

db.Mark.ensureIndex({collectionMeta: 1}, {unique: true, sparse: true});
db.Mark.ensureIndex({type: 1});
db.Mark.ensureIndex({createdOn: 1})

metaData = [{
	"prettyName": "Meta",
	"type": "meta",
	"typeMeta": "meta",
	"createdOn": new Date(),
	"source": dataSource
},{
	"prettyName": "Gasoline Purchase",
	"type": "gasolinePurchase",
	"typeMeta": "gasolinePurchase",
	"createdOn": new Date(),
	"source": dataSource
},{
	"prettyName": "Body Weight",
	"type": "bodyWeight",
	"typeMeta": "bodyWeight",
	"tags": [
		"health",
		"nutrition"
	],
	"createdOn": new Date(),
	"source": dataSource
}];

db.Mark.save(metaData);

db.Mark.ensureIndex({typeMeta: 1}, {unique: true, sparse: true});