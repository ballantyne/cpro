var fix                = require('fixjs');
var uuid               = require('uuid');
var Message            = fix.Msgs;

module.exports = class OrderStatus {
  constructor(options:any) {
    var orders     = new Message.OrderStatusRequest();
    orders.set(37,'*');
    return orders;
  }
}
