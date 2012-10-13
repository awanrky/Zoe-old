var express = require('express'),
	Mark = require('./routes/Mark');

var app = express();

app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});


app.get('/Mark', Mark.getAll);
app.get('/Mark/:id', Mark.getById);
app.post('/Mark', Mark.add);
app.put('/Mark/:id', Mark.update);
app.delete('/Mark/:id', Mark.delete);

app.listen(1967);
console.log('zoe-node started.');