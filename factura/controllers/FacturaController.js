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

    // regresa todos los facturas (GET http://localhost:${PORT}/api/facturas)
    .get(function (req, res) {
        Factura.find(function (err, factura) {
            if (err)
                res.send(err);

            res.json(factura);
        });
    });

module.exports = router