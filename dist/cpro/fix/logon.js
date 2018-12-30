"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fix = require('fixjs');
var uuid = require('uuid');
var Message = fix.Msgs;
//var crypto:Crypto      = require('crypto');
const crypto_1 = require("crypto");
module.exports = class Logon {
    constructor(options, connection) {
        var message = new Message.Logon();
        message.SendingTime = new Date();
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
        var what = params.join('\x01');
        message.set(96, this.signature(what, options.secret));
        return message;
    }
    signature(params, secret) {
        var key = Buffer.from(secret, 'base64');
        var hmac = crypto_1.createHmac('sha256', key);
        var signature = hmac.update(params).digest('base64');
        return signature;
    }
};
