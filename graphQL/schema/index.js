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
    # Los endpoint
    type Query {
        # endpoint para 'Clientes'
        clientes: [Cliente]
        # endpoint para 'Servicios'
        servicios: [Servicio]
        # endpoint para 'Cliente' por 'ID'
        cliente(id: String!): Cliente
        # endpoint para 'Servicio' por 'ID'
        servicio(id: String!): Servicio
    }
`;

// seria asi, pero en este caso es redundante (por ecma 2015), queda..
// en 'typeDefs' se pasa un array con los schemas y las rootQuerys
// resolvers: resolvers
// ..asi
const schema = makeExecutableSchema({
    typeDefs: [rootQuery, Cliente, Servicio],
    resolvers
});

module.exports = schema;