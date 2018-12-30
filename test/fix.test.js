const path        = require('path');
const mocha       = require('mocha');
const Fix         = require(path.join(__dirname, '..', 'dist', 'cpro', 'index'));
const fs          = require('fs');
const assert      = require('assert');

var Order              = require(path.join(__dirname, '..', 'dist', 'cpro', 'fix', 'order'));
var CancelOrder        = require(path.join(__dirname, '..', 'dist', 'cpro', 'fix', 'cancel_order'));
var OrderStatus        = require(path.join(__dirname, '..', 'dist', 'cpro', 'fix', 'order_status'));
var TestRequest        = require(path.join(__dirname, '..', 'dist', 'cpro', 'fix', 'test_request'));

const load        = function(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', file+'.json')));
}

describe("Coinbase Fix Messages", function() {
  describe("Order", function() {
    it("forms correct message", function() {
      var order = new Order({symbol: 'BCH-BTC', side: 'buy', price: '0.03758', order_qty: '2.7'});
      assert.notEqual(order._fields['11'], undefined);   
      assert.equal(order._fields['21'], 1);     
      assert.equal(order._fields['35'], 'D');      
      assert.equal(order._fields['38'], '2.7');
      assert.equal(order._fields['40'], 2);
      assert.equal(order._fields['44'], '0.03758');
      assert.equal(order._fields['54'], 'buy');
      assert.equal(order._fields['55'], 'BCH-BTC');
      assert.equal(order._fields['59'], '1');
      assert.notEqual(order._fields['60'], undefined);
      assert.equal(order._fields['7928'], 'D');
      assert.equal(order.name, 'NewOrderSingle');
    });
  });

  describe("Cancel Order", function() {
    it("forms correct message", function() {
      var order = new CancelOrder({symbol: 'BCH-BTC', uuid: 'uuid', order_id: 'order_id'});
      assert.equal(order._fields['37'], 'order_id');     
      assert.equal(order._fields['35'], 'F');      
      assert.equal(order._fields['41'], 'uuid');
      assert.equal(order._fields['55'], 'BCH-BTC');
      assert.equal(order.name, 'OrderCancelRequest');
    });
  });

  describe("Order Status", function() {
    it("forms correct message", function() {
      var order = new OrderStatus();
      assert.equal(order._fields['37'], '*');     
      assert.equal(order._fields['35'], 'H');      
      assert.equal(order.name, 'OrderStatusRequest');
    });
  });

  describe("Test Request", function() {
    it("forms correct message", function() {
      var order = new TestRequest('test message');
      assert.equal(order._fields['35'], '1');     
      assert.equal(order._fields['112'], 'test message');     
      assert.equal(order.name, 'TestRequest');
    });
  });
});
