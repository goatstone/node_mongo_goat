/* goatstone/server/one.js : Jose Collas 7.2015 */
var express = require('express');
var Collection = require('/home/goat/projects/node_mongo_goat/src/goatstone/collection/collection');
var Display = require('/home/goat/projects/node_mongo_goat/src/goatstone/ui/Display');

var app = express();
var collection = new Collection();
var display = new Display();

collection.get(function(items){ display.list(items)});

app.get('/', function (req, res) {
  req.on('end', function(){
  	//console.log('end data..', req.query);
  }) ; 
  collection.get(function(items){ 
    display.list(items, res); 
  });
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
var server = app.listen(3000, '192.168.1.9', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
