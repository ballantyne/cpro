"use strict";
var path = require('path');
var Evented = require(path.join(__dirname, 'evented'));
var Logon = require(path.join(__dirname, 'fix', 'logon'));
var Order = require(path.join(__dirname, 'fix', 'order'));
var CancelOrder = require(path.join(__dirname, 'fix', 'cancel_order'));
var OrderStatus = require(path.join(__dirname, 'fix', 'order_status'));
var TestRequest = require(path.join(__dirname, 'fix', 'test_request'));
var Report = require(path.join(__dirname, 'fix', 'accepted'));
var RejectedReport = require(path.join(__dirname, 'fix', 'rejected'));
var Connection = require(path.join(__dirname, 'connection'));
var Stream = require(path.join(__dirname, 'stream'));
module.exports = class FixClient extends Evented {
    constructor(options = { verbose: false }) {
        super();
        this.options = options;
        if (options.verbose != undefined) {
            this.verbose = options.verbose;
        }
        this.attachEvents();
    }
    attachEvents() {
        var self = this;
        this.on('stream:reject', function (message) {
            var report = new RejectedReport(message, {});
            if (self.verbose) {
                console.log(report);
            }
            self.emit('reject', report);
        });
        this.on('stream:execution_report', function (message) {
            var report = new Report(message);
            if (self.verbose) {
                console.log(message);
                console.log(report);
            }
            self.emit('report', report);
            self.emit(report.status, report);
        });
    }
    connect() {
        var self = this;
        this.connection = new Connection({
            host: this.options.host,
            port: this.options.port
        });
        this.connection.on('error', function (err) {
            self.emit('stream:err', err);
        });
        this.connection.on('end', function () {
            self.emit('stream:end', true);
        });
        this.stream = new Stream(this.options.key, this.connection);
        this.stream.on('logon', function (message) {
            console.log(message);
            self.emit('stream:login', message);
        });
        this.stream.on('TestRequest', function (message, next) {
            self.emit('stream:test', message._fields);
            next();
        });
        this.stream.on('ExecutionReport', function (message, next) {
            self.emit('stream:execution_report', message);
            next();
        });
        this.stream.on('Heartbeat', function (message, next) {
            self.emit('stream:heartbeat', message);
            next();
        });
        this.stream.on('OrderCancelReject', function (message, next) {
            self.emit('stream:order_cancel_rejected', message);
            next();
        });
        this.stream.on('Reject', function (message, next) {
            self.emit('stream:reject', message);
            next();
        });
        this.stream.on('send', function (message) {
            self.emit('stream:send', message);
        });
        this.stream.on('error', function (err) {
            self.emit('stream:error', err);
        });
        this.stream.on('logout', function () {
            self.emit('stream:logout', true);
        });
        this.stream.on('end', function () {
            self.emit('stream:end', true);
        });
        this.logon();
    }
    send(message) {
        this.stream.send(message);
    }
    logout() {
        this.stream.logout();
    }
    logon() {
        var logon = new Logon(this.options, this.stream);
        this.stream.send(logon, true);
    }
    sendOrder(options) {
        var orderRequest = new Order(options);
        this.send(orderRequest);
        return orderRequest;
    }
    cancelOrder(options) {
        var cancelOrderRequest = new CancelOrder(options);
        this.send(cancelOrderRequest);
        return cancelOrderRequest;
    }
    orderStatus() {
        var orderStatusRequest = new OrderStatus();
        this.send(orderStatusRequest);
        return orderStatusRequest;
    }
    test(message) {
        var testRequest = new TestRequest(message);
        this.send(testRequest);
        return testRequest;
    }
};
