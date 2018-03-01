const express = require('express');
const rpUtil = require('../util/util');

// tomando los ip y puertos
const ipCliente = process.env.IP_CLIENTES_SERVICES
const portCliente = process.env.PORT_CLIENTES_SERVICES
const ipServicios = process.env.IP_SERVICIOS_SERVICES
const portServicios = process.env.PORT_SERVICIOS_SERVICES

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

// ruta /suscripciones incluye getAll suscripciones y para crear nuevos suscripciones
router.route('/suscripciones')

    // crea una suscripcion (POST http://localhost:${PORT}/api/suscripciones)
    .post(function (req, res) {

        let suscripcion = new Suscripcion();

        requestToSaveSub(suscripcion, res, req)

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

            if (req.body.cliente_id == '' || req.body.cliente_id == undefined) {
                req.body.cliente_id = suscripcion.cliente_id
            }

            if (req.body.servicio_id == '' || req.body.servicio_id == undefined) {
                req.body.servicio_id = suscripcion.servicio_id
            }

            requestToSaveSub(suscripcion, res, req)

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

function saveSub(suscripcion, res) {
    if (suscripcion.servicio_id == undefined || suscripcion.cliente_id == undefined) {
        res.json({ message: 'No se pudo guardar la Suscripcion' });
        return;
    }

    suscripcion.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Se guardo la Suscripcion' });
    });
}

function requestToSaveSub(suscripcion, res, req) {

    let options = {
        host: ipCliente,
        port: portCliente,
        path: `/api/clientes/${req.body.cliente_id}`,
        method: 'GET'
    };

    rpUtil.getJSON(options, function (statusCode, result) {
        suscripcion.cliente_id = result._id
        options = {
            host: ipServicios,
            port: portServicios,
            path: `/api/servicios/${req.body.servicio_id}`,
            method: 'GET'
        };
        rpUtil.getJSON(options, function (statusCode, result) {
            suscripcion.servicio_id = result._id
            saveSub(suscripcion, res)
        });
    });
}
module.exports = router