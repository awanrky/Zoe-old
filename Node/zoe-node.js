var express = require('express'),
	configuration = require('./configuration'),
	person = require('./routes/person');

var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.get('/person/get-distinct-types/:person', person.getDistinctTypes);
app.get('/person/:person', person.getAll);
app.get('/person/:person/:id', person.getById);
app.post('/person/:person', person.add);
app.put('/person/:person/:id', person.update);
app.delete('/person/:person/:id', person.delete);

app.listen(configuration.nodePort);
console.log(
	'zoe-node started on port: ' +
	configuration.nodePort +
	" (" +
	configuration.environmentName +
	" environment)"
);