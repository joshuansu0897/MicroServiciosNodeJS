const fetch = require('node-fetch')

const ipCliente = process.env.IP_CLIENTES_SERVICES || 'localhost'
const portCliente = process.env.PORT_CLIENTES_SERVICES || 3000
const ipServicios = process.env.IP_SERVICIOS_SERVICES || 'localhost'
const portServicios = process.env.PORT_SERVICIOS_SERVICES || 3333

const resolvers = {
    Query: {
        clientes: () => {
            return fetch(`${ipCliente}:${portCliente}/clientes`).then(res => res.json())
        },
        user: (parent, args) => {
            const { id } = args
            return fetch(`${ipCliente}:${portCliente}/clientes/${id}`).then(res => res.json())
        },
        servicios: () => {
            return fetch(`${ipServicios}:${portServicios}/servicios`).then(res => res.json())
        },
        post: (parent, args) => {
            const { id } = args
            return fetch(`${ipServicios}:${portServicios}/servicios/${id}`).then(res => res.json())
        },
    },
}

module.exports = resolvers;