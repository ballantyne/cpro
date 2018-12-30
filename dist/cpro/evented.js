"use strict";
var EventEmitter = require('events');
module.exports = class Evented {
    constructor() {
        this.events = new EventEmitter();
        this.verbose = true;
    }
    on(name, handler) {
        this.events.on(name, handler);
    }
    emit(name, data) {
        this.logEvent(name, data);
        this.events.emit(name, data);
    }
    logEvent(name, report) {
        if (this.verbose) {
            if (report != undefined) {
                if (name.indexOf('transport') > -1) {
                    console.log([name, ":", report.name].join(''));
                    if (report.name == 'Error') {
                        console.log(report);
                    }
                    else {
                        console.log(report._fields);
                    }
                }
                else {
                    console.log(name);
                    console.log(report);
                }
            }
        }
    }
};
