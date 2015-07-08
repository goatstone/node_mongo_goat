/* init.js : Jose Collas 6.2015 */
var express = require('express');
var Collection = require('./src/goatstone/collection/collection');

var app = express();
var collection = new Collection();
collection.get();

app.get('/', function (req, res) {
  req.on('end', function(){
  	console.log('end data..', req.query);
  }) ; 
   res.send('Welcome...');
});
app.post('/log', function (req, res) {
  var b = '';
  req.on('data', function(d){
  	b += d;
  });
  req.on('end', function(){
  	var vals = b.split('=');
  	console.log('end post data..', req.query, vals);
   }); 
  res.send('POST to pepple...\n' );
});
var server = app.listen(3000, '192.168.1.7', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
