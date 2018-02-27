const express = require('express');

// Suscripcion Modelo
const Suscripcion = require('../models/Suscripcion');

// Inicio para la Creacion de las rutas
const router = express.Router();

// importando nuestro httpRequest
const rest = require('../util/httpRequest')

// middleware para todos los request
router.use(function (req, res, next) {
    console.log('algo se anda procesando.');
    next();
});

// la ruta esta corriendo en (GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Estas en la API del microservicio de Suscripciones' });
});

let options = {};

// ruta /suscripciones incluye getAll suscripciones y para crear nuevos suscripciones
router.route('/suscripciones')

    // crea una suscripcion (POST http://localhost:${PORT}/api/suscripciones)
    .post(function (req, res) {


        let suscripcion = new Suscripcion();

        options = {
            host: 'localhost',
            port: 3000,
            path: `/api/clientes/${req.body.cliente_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        rest.getJSON(options, function (statusCode, result) {
            console.log(statusCode)
            if (statusCode) {
                suscripcion.cliente_id = req.body.cliente_id;
            }
        });

        options = {
            hostname: 'http://localhost',
            port: 3333,
            path: `/api/servicios/${req.body.servicio_id}`,
            method: 'GET'
        };

        rest.getJSON(options, function (statusCode, result) {
            console.log(statusCode)
            if (statusCode) {
                suscripcion.servicio_id = req.body.servicio_id;
            }
        });

        if (suscripcion.servicio_id == undefined || suscripcion.cliente_id == undefined) {
            res.json({ message: 'No se pudo crear la suscripcion' });
            return;
        }

        suscripcion.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'suscripcion creada' });
        });


    })

    // regresa todos los Suscripcion (GET http://localhost:${PORT}/api/suscripciones)
    .get(function (req, res) {
        Suscripcion.find(function (err, suscripcion) {
            if (err)
                res.send(err);

            res.json(suscripcion);
        });
    });

// definiendo para /suscripciones/:suscripciones_id
// ----------------------------------------------------
router.route('/suscripciones/:suscripciones_id')

    // get Suscripcion por id
    .get(function (req, res) {
        Suscripcion.findById(req.params.suscripciones_id, function (err, suscripcion) {
            if (err) {
                res.send(err);
            }
            res.json(suscripcion);
        });
    })

    // update Suscripcion con el id
    .put(function (req, res) {
        Suscripcion.findById(req.params.suscripciones_id, function (err, suscripcion) {

            if (err) {
                res.send(err);
            }

            suscripcion.cliente_id = req.body.cliente_id;
            suscripcion.servicio_id = req.body.servicio_id;

            suscripcion.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'suscripcion Actualizada' });
            });

        });
    })

    // delete Suscripcion
    .delete(function (req, res) {
        Suscripcion.remove({
            _id: req.params.suscripciones_id
        }, function (err, servicio) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Suscripcion borrada' });
        });
    });
module.exports = router