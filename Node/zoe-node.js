var express = require('express'),
	configuration = require('./zoe-configuration'),
	person = require('./routes/person'),
    bodyWeight = require('./routes/person/bodyWeight.js')
    ;

var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/person/get-distinct-types/:person', person.getDistinctTypes);
app.get('/person/get-type-data/:person/:type/:orderBy/:order', person.getTypeData);
app.get('/person/get-meta/:person', person.getMeta);
//app.get('/person/:person', person.getAll);
//app.get('/person/:person/:id', person.getById);
//app.post('/person/:person', person.add);
//app.put('/person/:person/:id', person.update);
//app.delete('/person/:person/:id', person.delete);

var settings = {
    app: app,
    baseRoute: '/person/:id',
    configuration: configuration,
    logger: console
};

bodyWeight(settings);


app.listen(configuration.nodePort);
console.log(
	'zoe-node started on port: ' +
	configuration.nodePort +
	" (" +
	configuration.environmentName +
	" environment)"
);