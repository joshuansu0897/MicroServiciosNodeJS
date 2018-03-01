const rp = require('request-promise')
const http = require("http")
const https = require("https")

module.exports = class Util {


    /**
     * getJSON:  REST get request returning JSON object(s)
     * @param options: http options object
     * @param callback: callback to pass the results JSON object(s) back
     */
    static getJSON(options, onResult) {

        let port = options.port == 443 ? https : http;
        let req = port.request(options, function (res) {
            let output = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function () {
                let obj = JSON.parse(output);
                onResult(res.statusCode, obj);
            });

            req.on('error', function (err) {
                res.send('error: ' + err.message);
            });
        })

        req.end();
    };

    static async getData(options) {
        return await rp(options)
            .then(function (res) {
                console.log(res._id)
                return res._id
            })
            .catch(function (err) {
                return undefined;
            });
    }
}