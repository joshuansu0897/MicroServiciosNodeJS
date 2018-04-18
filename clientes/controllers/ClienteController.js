const express = require('express');

// Cliente Modelo
const Cliente = require('../models/Cliente');

// Inicio para la Creacion de las rutas
const router = express.Router();

// middleware para todos los request
router.use(function (req, res, next) {
    console.log('algo se anda procesando.');
    next();
});

// la ruta esta corriendo en (GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Estas en la API del microservicio de Clientes' });
});

// ruta /clientes incluye getAll Clientes y para crear nuevos Clientes
router.route('/clientes')

    // crea un cliente (POST http://localhost:${PORT}/api/clientes)
    .post(function (req, res) {

        var cliente = new Cliente();
        cliente.nombre = req.body.nombre;
        cliente.telefono = req.body.telefono;
        cliente.correo = req.body.correo;

        cliente.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(cliente);
        });


    })

    // regresa todos los clientes (GET http://localhost:${PORT}/api/clientes)
    .get(function (req, res) {
        Cliente.find(function (err, clientes) {
            if (err)
                res.send(err);

            res.json(clientes);
        });
    });

// definiendo para /clientes/:cliente_id
// ----------------------------------------------------
router.route('/clientes/:cliente_id')

    // get cliente por id
    .get(function (req, res) {
        Cliente.findById(req.params.cliente_id, function (err, cliente) {
            if (err) {
                res.send(err);
            }
            res.json(cliente);
        });
    })

    // update cliente con el id
    .put(function (req, res) {
        Cliente.findById(req.params.cliente_id, function (err, cliente) {

            if (err) {
                res.send(err);
            }

            console.log(req.params)

            console.log(req.body)
            cliente.nombre = req.body.nombre;
            cliente.telefono = req.body.telefono;
            cliente.correo = req.body.correo;

            cliente.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json(cliente);
            });

        });
    })

    // delete cliente
    .delete(function (req, res) {

        let CLIENTE
        // se busca el cleinte que se va a borrar y se guarda en una variable
        Cliente.findById(req.params.cliente_id, function (err, cliente) {
            CLIENTE = cliente;
        });

        // se elimina el cliente y se regresa la info del cliente eliminado
        Cliente.remove({
            _id: req.params.cliente_id
        }, function (err, cliente) {
            if (err) {
                res.send(err);
            }
            res.json(CLIENTE);
        });
    });

module.exports = router;