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

mongoose.connect(`mongodb://${url}:${portMongo}/suscripciones`);
// Handle para la coneccion con la BDMongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de coneccion:'));

db.once('open', function () {
    console.log("Tienes Coneccion a la BD");
});

// Suscripcion Modelo
const Suscripcion = require('./models/Suscripcion');

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

    // crea un cliente (POST http://localhost:${PORT}/api/suscripciones)
    .post(function (req, res) {

        var suscripcion = new Suscripcion();
        suscripcion.cliente_id = req.body.cliente_id;
        suscripcion.servicio_id = req.body.servicio_id;

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

// REGISTRANDO Las RUTAS -------------------------------
app.use('/api', router);

// INICIANDO EL SERVER
// =============================================================================
app.listen(PORT);
console.log(`Corriendo en el servidor http://localhost:${PORT}`);