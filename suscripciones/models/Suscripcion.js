//Require Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuscripcionShema = new Schema({
    cliente_id: String,
    servicio_id: String,
    created_At: {type: Date, default: Date.now}
});

// Compile model from schema
module.exports = mongoose.model('Suscripcion', SuscripcionShema);