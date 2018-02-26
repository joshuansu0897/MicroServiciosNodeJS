const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB setup
const mongoose = require('mongoose');
const url= process.env.URL_MONGO
const portMongo= process.env.PORT_MONGO

mongoose.connect(`mongodb://${url}:${portMongo}/clientes`);
// Handle para la coneccion con la BDMongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de coneccion:'));

db.once('open', function () {
    console.log("Tienes Coneccion a la BD");
});

// Cliente Modelo
const Cliente = require('./models/Cliente');

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
            res.json({ message: 'Cliente creado' });
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

            cliente.nombre = req.body.nombre;
            cliente.telefono = req.body.telefono;
            cliente.correo = req.body.correo;

            cliente.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Cliente Actualizado' });
            });

        });
    })

    // delete cliente
    .delete(function (req, res) {
        Cliente.remove({
            _id: req.params.cliente_id
        }, function (err, cliente) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Cliente borrado' });
        });
    });

// REGISTRANDO Las RUTAS -------------------------------
app.use('/api', router);

// INICIANDO EL SERVER
// =============================================================================
app.listen(PORT);
console.log(`Corriendo en el servidor http://localhost:${PORT}`);