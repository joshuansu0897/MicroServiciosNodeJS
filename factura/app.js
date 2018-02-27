const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// importando nuestro setup de mongo
const DB = require("./MongoSetup")

// verificando la coneccion con la base de datos
DB.on('error', console.error.bind(console, 'error de coneccion:'));

DB.once('open', function () {
    console.log("Tienes Coneccion a la BD");
});

// importando nuestras rutas
const ROUTER = require('./controllers/FacturaController')

// REGISTRANDO Las RUTAS -------------------------------
app.use('/api', ROUTER);

// INICIANDO EL SERVER
// =============================================================================
app.listen(PORT);
console.log(`Corriendo en el servidor http://localhost:${PORT}`);