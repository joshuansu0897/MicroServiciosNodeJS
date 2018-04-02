const {
    makeExecutableSchema
} = require("graphql-tools");

// importando los resolvers
const resolvers = require("../resolvers/resolvers");

// importando los schemas
const Cliente = require("./Cliente");
const Servicio = require("./Servicio");

// este es el verdado 'schema'...
const rootQuery = `
    # estamos declarando un tipo que a lo que sea que le apliquemos a este tipo
    # va a regresar un Servicio o un Cliente
    union ResultadoBusqueda = Servicio | Cliente

    # Los endpoint
    type Query {
        # endpoint para 'Clientes'
        clientes: [Cliente]
        # endpoint para 'Servicios'
        servicios: [Servicio]
        # endpoint para 'Cliente' por 'ID'
        cliente(id: Int): Cliente
        # endpoint para 'Servicio' por 'ID'
        servicio(id: Int): Servicio
        # este endpoint regresa una lista de "ResultadoBusqueda" que puede ser Servicio o Cliente
        buscar(query: String!): [ResultadoBusqueda]
    }
`;

// seria asi, pero en este caso es redundante (por ecma 2015), queda..
// en 'typeDefs' se pasa un array con los schemas y las rootQuerys
// resolvers: resolvers
// ..asi
const schema = makeExecutableSchema({
    typeDefs: [rootQuery, Profesor, Curso],
    resolvers
});

module.exports = schema;