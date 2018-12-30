"use strict";
var fix = require('fixjs');
var uuid = require('uuid');
var Message = fix.Msgs;
module.exports = class NewOrderSingle {
    constructor(options) {
        if (options.type == undefined) {
            options.type = 2;
        }
        if (options.uuid == undefined) {
            options.uuid = uuid();
        }
        if (options.time_in_force == undefined) {
            options.time_in_force = '1';
        }
        if (options.self_trade_prevention == undefined) {
            options.self_trade_prevention = 'D';
        }
        if (options.side == undefined) {
            throw new Error('Option side must be specified to create a valid order.  More details can be found at https://docs.pro.coinbase.com/#new-order-single-d');
        }
        if (options.order_qty == undefined) {
            throw new Error('Option order_qty must be specified to create a valid order.  More details can be found at https://docs.pro.coinbase.com/#new-order-single-d');
        }
        var order = new Message.NewOrderSingle();
        if (options.cash_order_quantity != undefined) {
            if (options.type == 1) {
                order.set(152, options.cash_order_quantity);
            }
            else {
                throw new Error('Option cash_order_quantity is only available for market orders.  More details can be found at https://docs.pro.coinbase.com/#new-order-single-d');
            }
        }
        if (options.stop_px) {
            order.set(99, options.stop_px);
        }
        order.set(55, options.symbol);
        order.set(11, options.uuid);
        order.set(54, options.side);
        order.set(21, 1);
        order.set(60, new Date());
        order.set(40, options.type);
        order.set(38, options.order_qty);
        order.set(44, options.price);
        order.set(59, options.time_in_force);
        order.set(7928, options.self_trade_prevention);
        return order;
    }
};
