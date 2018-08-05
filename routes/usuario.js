const express = require('express');
const app = express();

const Usuario = require('../models/usuario.model');


app.get('/usuario', (req, res, next) => {

	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);
	
	Usuario.find({}, {nombre:1, email:1, _id:0})
		.skip(desde)
		.limit(3)
		.exec((err, usuarios) => {
			if(err) {
				return res.status(400).json({
					ok: false,
					err
				})
			}

			Usuario.count({}, (err, conteo) => {

				res.json({
					ok:true,
					usuarios,
					total: conteo
				})

			})

			
		})

});


app.post('/usuario', (req, res, next) => {
	
	let body = req.body;

	let usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: body.password,
		rol: body.rol
	});

	usuario.save((err, usuarioPost) => {
		if(err) {
			return res.status(400).json({
				ok: false,
				err
			});
		} else {
			res.json({
				ok: true,
				usuario: usuarioPost
			})
		}
	});

	// if(body.nombre === undefined) {
	// 	res.status(400).json({
	// 		ok: false,
	// 		mensaje: 'El nombre es necesario'
	// 	});
	// } else {
	// 	res.json({
	// 		persona: body
	// 	})
	// }

});

app.put('/usuario/:id', (req, res, next) => {

	let id = req.params.id;
	let body = req.body;

	Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioPut) => {
		if(err) {
			return res.status(400).json({
				ok: false,
				err
			});
		} else {
			res.json({
				ok: true,
				usuario: usuarioPut
			});
		}
	});

});

app.delete('/usuario/:id', (req, res, next) => {
	
	let id = req.params.id;
	Usuario.findByIdAndRemove(id,(err, usuarioDelete) => {
		
		if(err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: usuarioDelete
		});

	});

});


module.exports = app;