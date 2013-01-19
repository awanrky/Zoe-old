datasource = "Lacy.js";

lacy = {
    "name": {
        "first": "Lacy",
        "middle": "",
        "last": "Rand",
    },
    "birthday": ISODate("2010-01-22T01:30-06"),
    "createdOn": new Date(),
    "source": datasource
};

db.Person.save(lacy);

