var fs = require('fs');
var tls = require('tls');
module.exports = class Connection {
  constructor(params:any) {
    var options:any = undefined;
    if (process.env.CERT != undefined) {
      options = {ca: fs.readFileSync(process.env.CERT)};
    } else {
      options = {};
    }

    var connection = tls.connect(params, options, function(err:Error) {
      console.log(err);
    });
    return connection;
  }
}

