cpro
------------

Here is a FIX client for the Coinbase Pro api. More information is available at this website [https://docs.pro.coinbase.com/#fix-api](https://docs.pro.coinbase.com/#fix-api) 


Installation
------------
```bash
npm install cpro --save
```

Usage
------------

```javascript
var options = {
  "key": process.env.KEY,
  "secret": process.env.SECRET,
  "passphrase": process.env.PASSPHRASE,
  "host": 'fix-public.sandbox.pro.coinbase.com',
  "port": "4198"
}


var Fix = require('cpro');
var fix = new Fix(options);

fix.verbose = true;

fix.on('open', function(report) {
  console.log(report);
})

fix.on('cancelled', function(report) {
  console.log(report);
})

fix.on('done', function(report) {
  console.log(report);
})

fix.on('rejected', function(report) {
  console.log(report);
})

fix.connect();

setTimeout(function() {
  fix.sendOrder({symbol: 'ETH-BTC', side: 'sell', price: '0.03507', order_qty: '2.974'});
}, 1000);
```

To add Coinbase's ssl cert run this command and and the path as the CERT environment variable. (CERT=./cert.pem)
In the code it will do a fs.readFileSync('./cert.pem') so depending on what system you use make the path accordingly.  More information can be found [here](https://docs.pro.coinbase.com/#ssl-tunnels).
```bash
openssl s_client -showcerts -connect fix.pro.coinbase.com:4198 < /dev/null | openssl x509 -outform PEM > cert.pem
```

Tips
------------

Here are a few addresses where you can send me bitcoins.  If this library helps you and you are feeling especially generous, show me the money.


* BTC: 3HU2iL9HhiW2oxXuZjWS9RXRNzth3n1scG
* BCH: qr5uwh6j6y9qnluttwd98zgsmgwej3jh4qst7m8hgf
* ETH: 0x6B0bA9775BB5BBE3427795549D090ebC5Df9c529
* LTC: MKdn7fpfDV8G3CcBmLSe5ebbXWDeNu7V6n

Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your fix/feature has a high chance of being included, please read the following guidelines:

1. Post a [pull request](https://github.com/ballantyne/cpro/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/cpro/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/cpro/graphs/contributors)!


License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright
-------
© 2019 Scott Ballantyne. See LICENSE for details.
