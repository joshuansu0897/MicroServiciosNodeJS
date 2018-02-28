const request = require('request');
const rp = require('request-promise')

module.exports = class Util {
    static getClientes(str) {
        return new Promise((resolve, reject) => {
            console.log(str)
            request
                .get(str)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err)
                })
        })
    }

    static async getData(options) {
        let data = await rp(options)
            .then(function (res) {
                console.log(res)
                return res._id
            })
            .catch(function (err) {
                return undefined;
            });
        console.log(data)
        return data
    }
}