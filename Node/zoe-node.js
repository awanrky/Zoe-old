var express = require('express'),
	configuration = require('./configuration'),
	person = require('./routes/person');
	// Mark = require('./routes/Mark');

var app = express();

//app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
//});

app.get('/person/:person', person.getAll);
app.get('/person/:person/:id', person.getById);
app.post('/person/:person', person.add);
app.put('/person/:person/:id', person.update);
app.delete('/person/:person/:id', person.delete);

// app.get('/Mark', Mark.getAll);
// app.get('/Mark/:id', Mark.getById);
// app.post('/Mark', Mark.add);
// app.put('/Mark/:id', Mark.update);
// app.delete('/Mark/:id', Mark.delete);

app.listen(configuration.nodePort);
console.log(
	'zoe-node started on port: ' +
	configuration.nodePort +
	" (" +
	configuration.environmentName +
	" environment)"
);