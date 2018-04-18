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
        # recive el 'ID' del Cliente que se modificara y 'ClienteEditable' son los campos a modificar
        clienteEdit(id: String!, cliente: ClienteEditable): Cliente
        # elimina un Cliente basado en su 'ID'
        clienteDelete(id: String!): Cliente

        # crea un Servicio con los parametros de 'NuevoServicio'
        servicioAdd(servicio: NuevoServicio): Servicio
        # recive el 'ID' del Servicio que se modificara y 'ServicioEditable' son los campos a modificar
        servicioEdit(id: String!, servicio: ServicioEditable): Servicio
        # elimina un Servicio basado en su 'ID'
        servicioDelete(id: String!): Servicio

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