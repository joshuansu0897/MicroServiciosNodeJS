module.exports = `
    # Este es el schema de 'Servicio'
    type Servicio {
        _id: ID!
        nombre: String!
        codigo: String!
        descripcion: String
        tarifa: String @deprecated(reason: "esto es una prueba de un campo 'deprecated'")
    }

    input NuevoServicio{
        nombre: String!
        codigo: String!
        descripcion: String!
        tarifa: String
    }

    input ServicioEditable{
        nombre: String
        codigo: String
        descripcion: String
        tarifa: String
    }
`;