var fix                = require('fixjs');
var uuid               = require('uuid');
var Message            = fix.Msgs;

module.exports = class TestRequest {
  constructor(message:any) {
    var testMessage       = new Message.TestRequest();
    testMessage.set(112, message);
    return testMessage;
  }
}
