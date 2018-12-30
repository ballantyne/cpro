var fix                = require('fixjs');
var uuid               = require('uuid');
var Message            = fix.Msgs;
//var crypto:Crypto      = require('crypto');
import { createHmac } from "crypto";

module.exports = class Logon {
  constructor(options:any, connection:any) {
    var message = new Message.Logon();
    message.SendingTime   = new Date();
    message.set(108, 30);
    message.set(98, 0);
    message.set(554, options.passphrase);

    var params = [
      message.SendingTime,
      message.MsgType,
      connection.outgoing_seq_num,
      connection.sender_comp_id,
      connection.target_comp_id,
      options.passphrase
    ];

    var what              = params.join('\x01');
    message.set(96, this.signature(what, options.secret));
    return message;
  }

  signature(params:any, secret:any) {
    var key       = Buffer.from(secret, 'base64');
    var hmac      = createHmac('sha256', key);
    var signature = hmac.update(params).digest('base64');
    return signature;
  }
}
