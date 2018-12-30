var fix                = require('fixjs');
var uuid               = require('uuid');
var Message            = fix.Msgs;

module.exports = class CancelOrder {
  constructor(options:any) {
    var cancel     = new Message.OrderCancelRequest();
    cancel.set(55, options.symbol);

    if (options.uuid != undefined) {
      cancel.set(41, options.uuid);
    }

    if (options.order_id != undefined) {
      cancel.set(37, options.order_id);
    }

    return cancel;
  }
}

