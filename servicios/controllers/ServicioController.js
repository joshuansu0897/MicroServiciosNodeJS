const express = require('express');

// Servicio Modelo
const Servicio = require('../models/Servicio');

// Inicio para la Creacion de las rutas
const router = express.Router();

// middleware para todos los request
router.use(function (req, res, next) {
    console.log('algo se anda procesando.');
    next();
});

// la ruta esta corriendo en (GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Estas en la API del microservicio de Servicios' });
});

// ruta /servicios incluye getAll Servicios y para crear nuevos Servicios
router.route('/servicios')

    // crea un cliente (POST http://localhost:${PORT}/api/servicios)
    .post(function (req, res) {

        var servicio = new Servicio();
        servicio.nombre = req.body.nombre;
        servicio.codigo = req.body.codigo;
        servicio.tarifa = req.body.tarifa;
        servicio.descripcion = req.body.descripcion;

        servicio.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(servicio);
        });


    })

    // regresa todos los Servicios (GET http://localhost:${PORT}/api/servicios)
    .get(function (req, res) {
        Servicio.find(function (err, servicio) {
            if (err)
                res.send(err);

            res.json(servicio);
        });
    });

// definiendo para /servicios/:servicio_id
// ----------------------------------------------------
router.route('/servicios/:servicio_id')

    // get servicio por id
    .get(function (req, res) {
        Servicio.findById(req.params.servicio_id, function (err, servicio) {
            if (err) {
                res.send(err);
            }
            res.json(servicio);
        });
    })

    // update servicio con el id
    .put(function (req, res) {
        Servicio.findById(req.params.servicio_id, function (err, servicio) {

            if (err) {
                res.send(err);
            }

            servicio.nombre = req.body.nombre;
            servicio.codigo = req.body.codigo;
            servicio.tarifa = req.body.tarifa;
            servicio.descripcion = req.body.descripcion;

            servicio.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json(servicio);
            });

        });
    })

    // delete servicio
    .delete(function (req, res) {

        let SERVICIO
        Servicio.findById(req.params.servicio_id, function (err, servicio) {
            SERVICIO = servicio;
        });

        Servicio.remove({
            _id: req.params.servicio_id
        }, function (err, servicio) {
            if (err) {
                res.send(err);
            }

            res.json(SERVICIO);
        });
    });

module.exports = router