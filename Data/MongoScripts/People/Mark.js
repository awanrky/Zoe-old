datasource = "Mark.js";

mark = {
    "name": {
        "first": "Mark",
        "middle": "Gilbert",
        "last": "Ott",
    },
    "birthday": ISODate("1967-03-13T01:30-06"),
    "createdOn": new Date(),
    "source": datasource
};

db.Person.save(mark);
