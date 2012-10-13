
db.dropDatabase();

mark = {
	"name": "The Creator",
	"firstName": "Mark",
	"middleName": "Gilbert",
	"lastName": "Ott",
	"type": "meta",
	"createdOn": new Date(),
	"source": "SetupZoe.js script"
}

db.Mark.save(mark);

db.Mark.ensureIndex({type: 1}, {sparse: true});
db.Mark.ensureIndex({createdOn: 1})