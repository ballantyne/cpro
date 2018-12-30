var path = require('path');

var FixReport = require(path.join(__dirname, 'report'));

interface FixMessage {
  _fields: any;
  _define_fields: any;
  name: any;
}

module.exports = class Rejected extends FixReport {
  constructor(message:FixMessage, report:any) {
    super();
    if (report == undefined) {
      report = {};
    }
    
    if (this.hasField(message, 52)) {
      report.sending_time = this.parseTime(this.field(message, 52));;
      if (report.time == undefined) {
        report.time = report.sending_time;
      }
      report.timestamp = report.time.getTime();
    }
    if (this.hasField(message, 45)) {
      report.sequence = parseInt(this.field(message, 45));
    }
    if (this.hasField(message, 58)) {
      report.reason = this.formatErrorMessage(this.field(message, 58));
    }
    if (this.hasField(message, 371)) {
      report.field = this.parseIncorrectField(this.field(message, 371));
    }
    if (this.hasField(message, 373)) {
      report.reason_code = this.parseReason(this.field(message, 373));
    }

    return report;
  }
}
