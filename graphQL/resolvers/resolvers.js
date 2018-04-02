const fetch = require('node-fetch')

const ipCliente = process.env.IP_CLIENTES_SERVICES || 'localhost'
const portCliente = process.env.PORT_CLIENTES_SERVICES || 3000
const ipServicios = process.env.IP_SERVICIOS_SERVICES || 'localhost'
const portServicios = process.env.PORT_SERVICIOS_SERVICES || 3333

const resolvers = {
    Query: {
        clientes: () => {
            return fetch(`http://${ipCliente}:${portCliente}/api/clientes`).then(res => res.json())
        },
        cliente: (parent, args) => {
            const { id } = args
            return fetch(`http://${ipCliente}:${portCliente}/api/clientes/${id}`).then(res => res.json())
        },
        servicios: () => {
            return fetch(`http://${ipServicios}:${portServicios}/api/servicios`).then(res => res.json())
        },
        servicio: (parent, args) => {
            const { id } = args
            return fetch(`http://${ipServicios}:${portServicios}/api/servicios/${id}`).then(res => res.json())
        },
    },
}

module.exports = resolvers;