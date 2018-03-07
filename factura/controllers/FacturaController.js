const express = require('express');
const rp = require('request-promise')

// tomando los ip y puertos
const ipSuscripciones = process.env.IP_SUSCRIPCIONES_SERVICES
const portSuscripciones = process.env.PORT_SUSCRIPCIONES_SERVICES

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
router.route('/facturas/:cliente_id')

    // regresa todos los facturas (GET http://localhost:${PORT}/api/facturas)
    .get(function (req, res) {
        crearFacturaCliente(req, res)        
    });

async function crearFacturaCliente(req, res){
    const jsonRes = await getDataSuscripciones(req.params.cliente_id)
    console.log(jsonRes)
    res.json(jsonRes)
}

async function getDataSuscripciones(cliente_id) {

    let options = {
        uri: `http://${ipSuscripciones}:${portSuscripciones}/api/${cliente_id}`,
        json: true
    };

    return await rp(options)
}

module.exports = router