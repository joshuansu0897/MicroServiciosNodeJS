//Require Mongoose
const mongoose = require('mongoose');

const FacturaSchema = new mongoose.Schema({
    cliente_id: String,
    num_servicios: String,
    costo_total: String,
    created_At: {type: Date, default: Date.now}
});

// Compile model from schema
module.exports = mongoose.model('Factura', FacturaSchema);