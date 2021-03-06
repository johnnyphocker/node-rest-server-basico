require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
	if(err) throw err;
	console.log('Base de datos lista');
});

app.listen(process.env.PORT, () => {
	console.log('Conectado al servidor')
});
