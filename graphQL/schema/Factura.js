module.exports = `
    # Este es el schema de 'Factura'
    type Factura {
        nombre_cliente: String
        costo_total: String
        num_servicios: Int
        servicios: [Servicio]
    }
`;