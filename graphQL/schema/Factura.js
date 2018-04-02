module.exports = `
    # Este es el schema de 'Cliente'
    type Cliente {
        nombre_cliente: nombre_cliente
        costo_total: costo_total
        num_servicios: num_servicios
        servicios: [Servicio]
    }

    input NuevoCliente{
        nombre: String!
        telefono: String
        correo: String
    }

    input ClienteEditable{
        nombre: String
        telefono: String
        correo: String
    }
`;