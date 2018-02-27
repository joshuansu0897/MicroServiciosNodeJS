// DB setup
const mongoose = require('mongoose');
const url = process.env.URL_MONGO
const portMongo = process.env.PORT_MONGO

mongoose.connect(`mongodb://${url}:${portMongo}/clientes`);
// Handle para la coneccion con la BDMongo
const db = mongoose.connection;

module.exports = db;