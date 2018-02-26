//Require Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicioShema = new Schema({
    nombre: String,
    codigo: String,
    tarifa: String,
    descripcion: String
});

// Compile model from schema
module.exports = mongoose.model('Servicio', ServicioShema);