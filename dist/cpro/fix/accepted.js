"use strict";
var path = require('path');
var underscore = require('underscore');
var FixReport = require(path.join(__dirname, 'report'));
var Rejected = require(path.join(__dirname, 'rejected'));
module.exports = class Accepted extends FixReport {
    constructor(message) {
        super();
        var report = {};
        if (this.hasField(message, 37)) {
            report.id = this.field(message, 37);
        }
        if (this.hasField(message, 60)) {
            report.time = this.parseTime(this.field(message, 60));
        }
        if (this.hasField(message, 55)) {
            report.product_id = this.field(message, 55);
        }
        if (this.hasField(message, 40)) {
            report.type = this.parseOrderType(this.field(message, 40));
        }
        if (this.hasField(message, 54)) {
            report.side = this.parseSide(this.field(message, 54));
        }
        if (this.hasField(message, 44)) {
            report.price = parseFloat(this.field(message, 44));
        }
        if (this.hasField(message, 39)) {
            report.status = this.parseExecType(this.field(message, 39));
        }
        if (report.status == 'open') {
            report.size = parseFloat(this.field(message, 38));
            if (this.field(message, 1057) == 'N') {
                report.aggressor = false;
            }
            if (this.field(message, 1057) == 'Y') {
                report.aggressor = true;
            }
            if (this.hasField(message, 52)) {
                report.sending_time = this.parseTime(this.field(message, 52));
            }
        }
        if (report.status == 'rejected') {
            underscore.extend(report, new Rejected(message, report));
        }
        if (report.status == 'cancelled') {
            report.filled = (this.hasField(message, 32) ? parseFloat(this.field(message, 32)) : 0);
            report.size = parseFloat(this.field(message, 38));
        }
        if (report.status == 'filled') {
            report.filled = parseFloat(this.field(message, 32));
            report.size = report.filled;
            if (this.field(message, 1057) == 'N') {
                report.aggressor = false;
            }
            if (this.field(message, 1057) == 'Y') {
                report.aggressor = true;
            }
        }
        if (this.hasField(message, 11)) {
            report.uuid = this.field(message, 11);
        }
        if (this.hasField(message, 137)) {
            report.fee = parseFloat(this.field(message, 137));
        }
        if (this.hasField(message, 1003)) {
            report.trade_id = parseFloat(this.field(message, 1003));
        }
        if (report.time != undefined) {
            report.timestamp = report.time.getTime();
        }
        if (this.hasField(message, 150)) {
            if (this.field(message, 150) && report.id == '0') {
                report.status = 'order_status';
                report.orders = [];
            }
        }
        return report;
    }
};
