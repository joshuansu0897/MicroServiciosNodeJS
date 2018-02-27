const express = require('express');

// Factura Modelo
const Factura = require('../models/Factura');

// Inicio para la Creacion de las rutas
const router = express.Router();

// middleware para todos los request
router.use(function (req, res, next) {
    console.log('algo se anda procesando.');
    next();
});

// la ruta esta corriendo en (GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Estas en la API del microservicio de Facturas' });
});

// ruta /facturas incluye getAll facturas y para crear nuevos facturas
router.route('/facturas')

    // crea un cliente (POST http://localhost:${PORT}/api/facturas)
    .post(function (req, res) {

        var factura = new Factura();
        factura.cliente_id = req.body.cliente_id
        factura.num_servicios = req.body.num_servicios
        factura.costo_total = req.body.costo_total

        factura.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Factura creada' });
        });


    })

    // regresa todos los facturas (GET http://localhost:${PORT}/api/facturas)
    .get(function (req, res) {
        Factura.find(function (err, factura) {
            if (err)
                res.send(err);

            res.json(factura);
        });
    });

// definiendo para /facturas/:factura_id
// ----------------------------------------------------
router.route('/facturas/:factura_id')

    // get servicio por id
    .get(function (req, res) {
        Factura.findById(req.params.factura_id, function (err, factura) {
            if (err) {
                res.send(err);
            }
            res.json(factura);
        });
    })

    // update factura con el id
    .put(function (req, res) {
        Factura.findById(req.params.factura_id, function (err, factura) {

            if (err) {
                res.send(err);
            }

            factura.cliente_id = req.body.cliente_id
            factura.num_servicios = req.body.num_servicios
            factura.costo_total = req.body.costo_total

            factura.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Factura Actualizada' });
            });

        });
    })

    // delete factura
    .delete(function (req, res) {
        Factura.remove({
            _id: req.params.factura_id
        }, function (err, servicio) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Factura borrada' });
        });
    });

module.exports = router