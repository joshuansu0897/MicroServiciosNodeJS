module.exports = `
    # Este es el schema de 'Suscripcion'
    type Suscripcion {
        id: ID!
        cliente_id: String!
        servicio_id: String!
        created_At: String
    }

    input NuevoSuscripcion{
        cliente_id: String!
        servicio_id: String!
    }

    input SuscripcionEditable{
        cliente_id: String
        servicio_id: String
    }
`;