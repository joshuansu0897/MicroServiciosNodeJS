const fetch = require('node-fetch')

const ipCliente = process.env.IP_CLIENTES_SERVICES || 'localhost'
const portCliente = process.env.PORT_CLIENTES_SERVICES || 3000

const ipServicios = process.env.IP_SERVICIOS_SERVICES || 'localhost'
const portServicios = process.env.PORT_SERVICIOS_SERVICES || 3333

const ipFactura = process.env.IP_FACTURA_SERVICES || 'localhost'
const portFactura = process.env.PORT_FACTURA_SERVICES || 5678

const ipSuscripcion = process.env.IP_SUSCRIPCION_SERVICES || 'localhost'
const portSuscripcion = process.env.PORT_SUSCRIPCION_SERVICES || 4567

const resolvers = {
    Query: {
        // query clientes
        clientes: () => {
            trabajo()
            return fetch(`http://${ipCliente}:${portCliente}/api/clientes`).then(res => res.json())
        },
        cliente: (parent, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipCliente}:${portCliente}/api/clientes/${id}`).then(res => res.json())
        },
        // query servicios
        servicios: () => {
            trabajo()
            return fetch(`http://${ipServicios}:${portServicios}/api/servicios`).then(res => res.json())
        },
        servicio: (parent, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipServicios}:${portServicios}/api/servicios/${id}`).then(res => res.json())
        },
        // query suscripciones
        suscripciones: () => {
            trabajo()
            return fetch(`http://${ipSuscripcion}:${portSuscripcion}/api/suscripciones`).then(res => res.json())
        },
        suscripcion: (parent, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipSuscripcion}:${portSuscripcion}/api/suscripciones/${id}`).then(res => res.json())
        },
        // query factura
        factura: (parent, args) => {
            trabajo()
            return fetch(`http://${ipFactura}:${portFactura}/api/facturas/${args.idCliente}`).then(res => res.json())
        }
    },
    // el guion bajo es una convencion para los argumenos que no usamos ahi va "rootValue", args si los usamos
    Mutation: {
        // mutation clientes
        clienteAdd: (_, args) => {
            trabajo()
            return fetch(`http://${ipCliente}:${portCliente}/api/clientes`, {
                method: 'POST',
                body: JSON.stringify(args.cliente),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
        },
        clienteEdit: (_, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipCliente}:${portCliente}/api/clientes/${id}`, {
                method: 'PUT',
                body: JSON.stringify(args.cliente),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
        },
        clienteDelete: (_, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipCliente}:${portCliente}/api/clientes/${id}`, {
                method: 'DELETE'
            }).then(res => res.json())
        },
        // mutation servicios
        servicioAdd: (_, args) => {
            trabajo()
            return fetch(`http://${ipServicios}:${portServicios}/api/servicios`, {
                method: 'POST',
                body: JSON.stringify(args.servicio),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
        },
        servicioEdit: (_, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipServicios}:${portServicios}/api/servicios/${id}`, {
                method: 'PUT',
                body: JSON.stringify(args.servicio),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
        },
        servicioDelete: (_, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipServicios}:${portServicios}/api/servicios/${id}`, {
                method: 'DELETE'
            }).then(res => res.json())
        },
        // mutation suscripciones
        suscripcionAdd: (_, args) => {
            trabajo()
            return fetch(`http://${ipSuscripcion}:${portSuscripcion}/api/suscripciones`, {
                method: 'POST',
                body: JSON.stringify(args.suscripcion),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
        },
        suscripcionEdit: (_, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipSuscripcion}:${portSuscripcion}/api/suscripciones/${id}`, {
                method: 'PUT',
                body: JSON.stringify(args.suscripcion),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
        },
        servicioDelete: (_, args) => {
            trabajo()
            const { id } = args
            return fetch(`http://${ipSuscripcion}:${portSuscripcion}/api/suscripciones/${id}`, {
                method: 'DELETE'
            }).then(res => res.json())
        }
    }
}

function trabajo() {
    console.log('algo se anda procesando.')
}

module.exports = resolvers;