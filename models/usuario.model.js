const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario']
	},
	password: {
		type: String,
		requried: true
	},
	img: {
		type: String,
		required: false
	},
	role: {
		type: String,
		required: false,
		default: 'user',
		enum: ['user', 'admin']
	},
	estado: {
		type: Boolean,
		default: true
	}
});

usuarioSchema.plugin(uniqueValidator, {mensaje: '{PATH} debe de ser único'});

module.exports = mongoose.model('Usuario', usuarioSchema);








