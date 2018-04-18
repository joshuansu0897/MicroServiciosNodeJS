module.exports = `
    # Este es el schema de 'Factura'
    type Factura {
        nombre_cliente: String
        costo_total: String
        num_servicios: String
        servicios: [DetallesFacturaServicio]
    }

    type DetallesFacturaServicio {
        created_At: String
        tarifa: String
        nombre: String
        _id: ID
    }
`;