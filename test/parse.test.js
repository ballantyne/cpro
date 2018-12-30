const path        = require('path');
const mocha       = require('mocha');
const Fix         = require(path.join(__dirname, '..', 'dist', 'cpro', 'index'));
const fs          = require('fs');
const assert      = require('assert');

var Report   = require(path.join(__dirname, '..', 'dist', 'cpro', 'fix', 'accepted'));
var Rejected = require(path.join(__dirname, '..', 'dist', 'cpro', 'fix', 'rejected'));

const load        = function(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', file+'.json')));
}

describe("Coinbase Fix Parser", function() {
  describe("open", function() {
    it("parses correctly", function() {
      var fix = new Fix();

      var data = load('open');
      fix.on('open', function(report) {
        assert.equal(report.id, data.open.id);
        assert.equal(report.timestamp, data.open.timestamp);
        assert.equal(report.product_id, data.open.product_id);
        assert.equal(report.side, data.open.side);
        assert.equal(report.size, data.open.size);
        assert.equal(report.price, data.open.price);
        assert.equal(report.status, data.open.status);
        assert.equal(report.uuid, data.open.uuid);
      });
      var report = new Report({_fields: data.fix});
      fix.emit('open', report);
 
    });
  });

  describe("cancelled", function() {
     it("parses correctly", function() {
      var fix = new Fix();

      var data = load('cancelled');
      fix.on('cancelled', function(report) {
        assert.equal(report.id, data.cancelled.id);
        assert.equal(report.timestamp, data.cancelled.timestamp);
        assert.equal(report.product_id, data.cancelled.product_id);
        assert.equal(report.side, data.cancelled.side);
        assert.equal(report.size, data.cancelled.size);
        assert.equal(report.filled, data.cancelled.filled);
        assert.equal(report.price, data.cancelled.price);
        assert.equal(report.status, data.cancelled.status);
        assert.equal(report.uuid, data.cancelled.uuid);
      });
      var report = new Report({_fields: data.fix});
      fix.emit('cancelled', report);
     }); 
  });

  describe("filled", function() {
    it("parses correctly", function() {
      var fix = new Fix();

      var data = load('filled');
      fix.on('filled', function(report) {
        assert.equal(report.id, data.filled.id);
        assert.equal(report.timestamp, data.filled.timestamp);
        assert.equal(report.product_id, data.filled.product_id);
        assert.equal(report.side, data.filled.side);
        assert.equal(report.filled, data.filled.filled);
        assert.equal(report.price, data.filled.price);
        assert.equal(report.status, data.filled.status);
        assert.equal(report.uuid, data.filled.uuid);
      });
      var report = new Report({_fields: data.fix});
      fix.emit('filled', report);
    });  
  });

  describe("done", function() {
    it("parses correctly", function() {
      var fix = new Fix();

      var data = load('done');
      fix.on('done', function(report) {
        assert.equal(report.id, data.done.id);
        assert.equal(report.timestamp, data.done.timestamp);
        assert.equal(report.product_id, data.done.product_id);
        assert.equal(report.side, data.done.side);
        assert.equal(report.filled, data.done.filled);
        assert.equal(report.price, data.done.price);
        assert.equal(report.status, data.done.status);
        assert.equal(report.uuid, data.done.uuid);
      });
      var report = new Report({_fields: data.fix});
      fix.emit('done', report);
    });  
  });

  describe("stopped", function() {
  
  });

  describe("rejected", function() {
    describe("insufficient funds", function() {
      it("parses correctly", function() {
        var fix = new Fix();

        var data = load('rejected_insufficient_funds');
        fix.on('rejected', function(report) {
          assert.equal(report.id, data.rejected.id);
          assert.equal(report.timestamp, data.rejected.timestamp);
          assert.equal(report.product_id, data.rejected.product_id);
          assert.equal(report.side, data.rejected.side);
          assert.equal(report.filled, data.rejected.filled);
          assert.equal(report.price, data.rejected.price);
          assert.equal(report.status, data.rejected.status);
          assert.equal(report.reason, data.rejected.reason);
          assert.equal(report.uuid, data.rejected.uuid);
        })
        var report = new Report({_fields: data.fix});  
        fix.emit('rejected', report);
      });
    });
    describe("side missing", function() {
      it("parses correctly", function() {
        var fix = new Fix();


        var data = load('rejected_no_side');
        var report = new Rejected({_fields: data.fix});
        assert.equal(report.time.getTime(), new Date(data.rejected.time).getTime());
        assert.equal(report.timestamp, data.rejected.timestamp);
        assert.equal(report.reason.value, data.rejected.reason.value);
        assert.equal(report.field, data.rejected.field);
        assert.equal(report.reason_code, data.rejected.reason_code);       
        assert.equal(report.sequence, data.rejected.sequence);       
      });
    });
    
    describe("amount missing", function() {
      it("parses correctly", function() {
        var fix = new Fix();


        var data = load('rejected_no_amount');
        var report = new Rejected({_fields: data.fix});
        assert.equal(report.time.getTime(), new Date(data.rejected.time).getTime());
        assert.equal(report.timestamp, data.rejected.timestamp);
        assert.equal(report.reason.value, data.rejected.reason.value);
        assert.equal(report.field, data.rejected.field);
        assert.equal(report.reason_code, data.rejected.reason_code);       
        assert.equal(report.sequence, data.rejected.sequence);       
      });
    });

    describe("symbol missing", function() {
      it("parses correctly", function() {
        var fix = new Fix();


        var data = load('rejected_no_symbol');
        var report = new Rejected({_fields: data.fix});
        assert.equal(report.time.getTime(), new Date(data.rejected.time).getTime());
        assert.equal(report.timestamp, data.rejected.timestamp);
        assert.equal(report.reason.value, data.rejected.reason.value);
        assert.equal(report.field, data.rejected.field);
        assert.equal(report.reason_code, data.rejected.reason_code);       
        assert.equal(report.sequence, data.rejected.sequence);       
      });
    });

    describe("price missing", function() {
      it("parses correctly", function() {
        var fix = new Fix();


        var data = load('rejected_no_price');
        var report = new Rejected({_fields: data.fix});
        assert.equal(report.time.getTime(), new Date(data.rejected.time).getTime());
        assert.equal(report.timestamp, data.rejected.timestamp);
        assert.equal(report.reason.value, data.rejected.reason.value);
        assert.equal(report.field, data.rejected.field);
        assert.equal(report.reason_code, data.rejected.reason_code);       
        assert.equal(report.sequence, data.rejected.sequence);       
      });
    });

  });

  describe("changed", function() {
  
  });

  describe("order_status", function() {
    var fix = new Fix();

    var data = load('orderStatus');
    it("parses correctly", function() {
      
      var index = 0;
      var report = new Report({_fields: data[index].fix});
      assert.equal(report.time.getTime(), new Date(data[index].status.time).getTime());
      assert.equal(report.timestamp, data[index].status.timestamp);
      assert.equal(report.product_id, data[index].status.product_id);
      assert.equal(report.side, data[index].status.side);
      assert.equal(report.size, data[index].status.size);
      assert.equal(report.price, data[index].status.price);
      assert.equal(report.status, data[index].status.status);
    }); 

    it("parses correctly", function() {
      var index = 1;
      var report = new Report({_fields: data[index].fix});
      assert.equal(report.time.getTime(), new Date(data[index].status.time).getTime());
      assert.equal(report.timestamp, data[index].status.timestamp);
      assert.equal(report.product_id, data[index].status.product_id);
      assert.equal(report.side, data[index].status.side);
      assert.equal(report.size, data[index].status.size);
      assert.equal(report.price, data[index].status.price);
      assert.equal(report.status, data[index].status.status);
    }); 

    it("parses correctly", function() {
      var index = 2;
      var report = new Report({_fields: data[index].fix});
      assert.equal(report.time.getTime(), new Date(data[index].status.time).getTime());
      
      assert.equal(report.timestamp, data[index].status.timestamp);
      assert.equal(report.product_id, data[index].status.product_id);
      assert.equal(report.side, data[index].status.side);
      assert.equal(report.size, data[index].status.size);
      assert.equal(report.price, data[index].status.price);
      assert.equal(report.status, data[index].status.status);
    }); 

  });
});
