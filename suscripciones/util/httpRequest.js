const http = require("http");
const https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function (options, onResult) {
    console.log("rest::getJSON");

    let port = options.port == 443 ? https : http;
    console.log(options)
    let req = port.request(options, function (res) {
        let output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            let obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    }).on('error', function (err) {
        console.log(err)
    });

    req.end();
};