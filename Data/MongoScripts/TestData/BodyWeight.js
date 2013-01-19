
db.Person.find().forEach(function(person) {
    for (var i = 0; i < 10000; i++) {
        db.Data.save({
            'person': person._id,
            'name': 'body-weight',
            'date': new Date(Date.now() - (i * 86400000)),
            'value': Math.random() * (250 - 180) + 180
        });
    }

});