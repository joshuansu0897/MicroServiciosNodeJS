const {
    makeExecutableSchema
} = require("graphql-tools");

// importando los resolvers
const resolvers = require("../resolvers/resolvers");

// importando los schemas
const Cliente = require("./Cliente");
const Factura = require("./Factura");
const Servicio = require("./Servicio");
const Suscripcion = require("./Suscripcion");

// este es el verdado 'schema'...
const rootQuery = `
    # Los endpoint
    type Query {
        # muestra todos los clientes
        clientes: [Cliente]
        # regresa la informacion especifica de un cliente
        cliente(id: String!): Cliente

        # crea(no guarda solo muestra) una 'Factura' basado en los servicios del cliente
        factura(idCliente: String!): Factura

        # regresa todos los servicios
        servicios: [Servicio]
        # regresa la informacion especifica de un servicio
        servicio(id: String!): Servicio

        # regresa todas las suscripciones de los cliente a los servicio
        suscripcion: [Suscripcion]
        # regresa una suscripcion de un cliente a un servicio
        suscripciones(id: String!): Suscripcion
    }

    type Mutation {
        # esta es una forma pero es muy molesta y rebuscada
        #clienteAdd(nombre: String!, telefono: String, correo: String): Cliente

        # crea un Cliente con los parametros de 'NuevoCliente'
        clienteAdd(cliente: NuevoCliente): Cliente
        # recive un 'ID' que es el Cliente que se modificara y en 'ClienteEditable' los campos a modificar
        clienteEdit(id: String!, cliente: ClienteEditable): Cliente
        # elimina un Cliente basado en su 'ID'
        clienteDelete(id: String!): Cliente
    }
`;

// seria asi, pero en este caso es redundante (por ecma 2015), queda..
// en 'typeDefs' se pasa un array con los schemas y las rootQuerys
// resolvers: resolvers
// ..asi
const schema = makeExecutableSchema({
    typeDefs: [rootQuery, Cliente, Factura, Servicio, Suscripcion],
    resolvers
});

module.exports = schema;