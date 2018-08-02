require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/usuario', (req, res, next) => {
	res.json('Usuario');
});

app.post('/usuario', (req, res, next) => {
	let body = req.body;

	res.json({persona: body});
});

app.put('/usuario/:id', (req, res, next) => {
	let id = req.params.id;
	res.json({id});
});

app.delete('/usuario/:id', (req, res, next) => {
	let id = req.params.id;
	res.json({
		id
	});
});


app.listen(process.env.PORT, () => {
	console.log('Conectado al servidor')
});
