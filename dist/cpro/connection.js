"use strict";
var fs = require('fs');
var tls = require('tls');
module.exports = class Connection {
    constructor(params) {
        var options = undefined;
        if (process.env.CERT != undefined) {
            options = { ca: fs.readFileSync(process.env.CERT) };
        }
        else {
            options = {};
        }
        var connection = tls.connect(params, options, function (err) {
            console.log(err);
        });
        return connection;
    }
};
