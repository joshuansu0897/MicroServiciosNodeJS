const express = require('express');
const rpUtil = require('../util/util');

// Suscripcion Modelo
const Suscripcion = require('../models/Suscripcion');

// Inicio para la Creacion de las rutas
const router = express.Router();

// middleware para todos los request
router.use(function (req, res, next) {
    console.log('algo se anda procesando.');
    next();
});

// la ruta esta corriendo en (GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Estas en la API del microservicio de Suscripciones' });
});

let options = {}

// ruta /suscripciones incluye getAll suscripciones y para crear nuevos suscripciones
router.route('/suscripciones')

    // crea una suscripcion (POST http://localhost:${PORT}/api/suscripciones)
    .post(function (req, res) {

        let suscripcion = new Suscripcion();

        options = {
            uri: `http://172.20.0.3:3000/api/clientes/${req.body.cliente_id}`,
            json: true
        };

        suscripcion.cliente_id = rpUtil.getData(options)

        options = {
            uri: `http://172.20.0.7:3333/api/servicios/${req.body.servicio_id}`,
            json: true
        };

        suscripcion.servicio_id = rpUtil.getData(options)

        if (suscripcion.servicio_id == undefined || suscripcion.cliente_id == undefined) {
            res.json({ message: 'No se pudo crear la suscripcion' });
            console.log(suscripcion.cliente_id)
            console.log(suscripcion.servicio_id)
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