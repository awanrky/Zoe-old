datasource = "Lacy.js";

lacy = {
    "name": {
        "first": "Lacy",
        "last": "Rand",
    },
    "birthday": ISODate("2010-01-22T01:30-06"),
    "type": "meta",
    "collectionMeta": "collectionMeta",
    "createdOn": new Date(),
    "source": datasource
};

db.Lacy.save(lacy);

db.Lacy.ensureIndex({ collectionMeta: 1 }, { unique: true, sparse: true });
db.Lacy.ensureIndex({ type: 1 });
db.Lacy.ensureIndex({ createdOn: 1 });

metaData = [{
    "prettyName": "Meta",
    "type": "meta",
    "typeMeta": "meta",
    "createdOn": new Date(),
    "source": datasource
}];


db.Lacy.save(metaData);

db.Lacy.ensureIndex({ typeMeta: 1 }, { unique: true, sparse: true });