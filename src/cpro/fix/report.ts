var fix                = require('fixjs');
var uuid               = require('uuid');
var Message            = fix.Msgs;

module.exports = class FixReport {
  hasField(message:any, field:number) {
    return message._fields[field.toString()] != undefined;
  }

  field(message:any, number:number) {
    return message._fields[number.toString()];
  }

  formatErrorMessage(message:any) {
    if (message.indexOf(':') > -1) {
      var parsed = message.match("Invalid (.+)\: (.+)");
      if (parsed && parsed[2] != undefined) {
        return { value: parsed[2] };
      } else {
        return message;
      }
    } else {
      return message.split(' ').join('_').toLowerCase();
    }
  }

  parseExecType(field:string) {

    switch(field) {
      case '0':
        return 'open';
      case '1':
        return 'filled';
      case '3':
        return 'done';
      case '4':
        return 'cancelled';
      case '7':
        return 'stopped';
      case '8':
        return 'rejected';
      case 'D':
        return 'changed';
      case 'I':
        return 'order_status';
    }
  }

  parseTime(field:string) {
    return new Date(field.substring(0,4)+"-"+
                    field.substring(4,6)+'-'+
                    field.substring(6,8)+'T'+
                    field.substring(9,21)+"Z");
  }

  parseOrderType(field:string) {
    switch(field) {
      case '1':
        return 'market';
      case '2':
        return 'limit';
      case '3':
        return 'stop';
    }
  }

  parseSide(field:string) {
    switch(field) {
      case 'sell':
        return 'sell';
      case 'buy':
        return 'buy';
      case '1':
        return 'buy';
      case '2':
        return 'sell';
    }
  }

  parseReason(field:string) {
    switch(field) {
      case '5':
        return 'value_incorrect';
      case '1':
        return 'missing';
      case '11':
        return 'type';
      case '6':
        return 'format';
    }
  }

  parseIncorrectField(field:string) {
    switch(field) {
      case '38':
        return 'amount';
      case '55':
        return 'symbol';
      case '54':
        return 'side';
      case '44':
        return 'price';
    }
  }
}
