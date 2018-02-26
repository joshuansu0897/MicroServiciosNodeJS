//Require Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    nombre: String,
    telefono: String,
    correo: String,
});

// Compile model from schema
module.exports = mongoose.model('Cliente', ClienteSchema);