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

mongoose.connect(`mongodb://${url}:${portMongo}/servicios`);
// Handle para la coneccion con la BDMongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de coneccion:'));

db.once('open', function () {
    console.log("Tienes Coneccion a la BD");
});

// Servicio Modelo
const Servicio = require('./models/Servicio');

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
            res.json({ message: 'Servicio creado' });
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
                res.json({ message: 'Servicio Actualizado' });
            });

        });
    })

    // delete servicio
    .delete(function (req, res) {
        Servicio.remove({
            _id: req.params.servicio_id
        }, function (err, servicio) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Servicio borrado' });
        });
    });

// REGISTRANDO Las RUTAS -------------------------------
app.use('/api', router);

// INICIANDO EL SERVER
// =============================================================================
app.listen(PORT);
console.log(`Corriendo en el servidor http://localhost:${PORT}`);