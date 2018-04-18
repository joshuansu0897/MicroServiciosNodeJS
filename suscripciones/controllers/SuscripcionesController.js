const express = require('express');
const rpUtil = require('../util/util');
const rp = require('request-promise')

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

        let SUSCRIPCION
        Suscripcion.findById(req.params.suscripciones_id, function (err, suscripcion) {
            SUSCRIPCION = suscripcion;
        });

        Suscripcion.remove({
            _id: req.params.suscripciones_id
        }, function (err, servicio) {
            if (err) {
                res.send(err);
            }

            res.json(SUSCRIPCION);
        });
    });

// definiendo las rutas para el /:cliente_id
router.route('/:cliente_id')

    // get Suscripcion por id
    .get(function (req, res) {
        Suscripcion.find({ 'cliente_id': req.params.cliente_id }, function (err, suscripcion) {
            if (err) {
                res.send(err);
            }
            detallesDeSuscripcion(suscripcion, res, req.params.cliente_id)
        });
    })

async function detallesDeSuscripcion(suscripcion, res, cliente_id) {
    let obj = {}
    let total = 0
    let ser = []
    await rpUtil.asyncForEach(suscripcion, async (i) => {
        const res = await getDataServicios(i.servicio_id);
        ser.push({
            created_At: i.created_At,
            tarifa: res.tarifa,
            nombre: res.nombre,
            _id: res._id
        })
        total += Number(res.tarifa)
    });

    const cliente = await getDataClientes(cliente_id)

    obj.nombre_cliente = cliente.nombre
    obj.costo_total = total
    obj.num_servicios = suscripcion.length
    obj.servicios = ser
    res.json(obj);
}

async function getDataServicios(servicio_id) {

    let options = {
        uri: `http://${ipServicios}:${portServicios}/api/servicios/${servicio_id}`,
        json: true
    };

    return await rp(options)
}

async function getDataClientes(cliente_id) {

    let options = {
        uri: `http://${ipCliente}:${portCliente}/api/clientes/${cliente_id}`,
        json: true
    };

    return await rp(options)
}

async function requestToSaveSub(suscripcion, res, req) {
    const cliente = await getDataClientes(req.body.cliente_id)
    const servicio = await getDataServicios(req.body.servicio_id)
    suscripcion.cliente_id = cliente._id
    suscripcion.servicio_id = servicio._id
    saveSub(suscripcion, res)
}

function saveSub(suscripcion, res) {
    if (suscripcion.servicio_id == undefined || suscripcion.cliente_id == undefined) {
        res.json({ message: 'No se pudo guardar la Suscripcion' });
        return;
    }

    suscripcion.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json(suscripcion);
    });
}
module.exports = router