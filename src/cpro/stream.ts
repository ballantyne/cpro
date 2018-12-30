var fix                = require('fixjs');

module.exports = class Stream {
  constructor(key:string, stream:any) {
    var client    = fix.createClient(stream);
    var server = client.session(key, 'Coinbase');
    return server;
  }
}
