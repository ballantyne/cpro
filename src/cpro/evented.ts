var EventEmitter       = require('events');

type EventCallback = (data:any) => any;

module.exports = class Evented {
  this:any;
  verbose:boolean;
  events:any;

  constructor() {
    this.events = new EventEmitter();
    this.verbose = true;
  }

  on(name:string, handler:EventCallback) {
    this.events.on(name, handler);
  }

  emit(name:string, data:any) {
    this.logEvent(name, data);
    this.events.emit(name, data);
  }

  logEvent(name:string, report:any) {
    if (this.verbose) {
      if (report != undefined) {
        if (name.indexOf('transport') > -1) {
          console.log([name,":",report.name].join(''));
          if (report.name == 'Error') {
            console.log(report);
          } else {
            console.log(report._fields);
          }
        } else {
          console.log(name);
          console.log(report)
        }
      }
    }
  }

}
