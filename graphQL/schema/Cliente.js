module.exports = `
    # Este es el schema de 'Cliente'
    type Cliente {
        _id: ID!
        nombre: String!
        telefono: String
        correo: String
    }

    input NuevoCliente {
        nombre: String!
        telefono: String
        correo: String
    }

    input ClienteEditable {
        nombre: String
        telefono: String
        correo: String
    }
`;