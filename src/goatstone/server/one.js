/* goatstone/server/one.js : Jose Collas 7.2015 */
var express = require('express');
var Collection = require('/home/goat/projects/node_mongo_goat/src/goatstone/collection/collection');
var Display = require('/home/goat/projects/node_mongo_goat/src/goatstone/ui/Display');
var app = express();
var collection = new Collection();
var display = new Display();
var server;
//collection.get(function(items){ display.list(items)});
app.get('/', function (req, res) {
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
    var message = 'default message';
  	var vals = b.split('=');
    message = (vals[0] && vals[1])? vals[1] : message ;
    collection.add({ "message": message, "timestamp": new Date()});
    res.send('POST\n' );
   }); 
});
server = app.listen(3000, '192.168.1.9', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(' goatstone.server.one  listening at http://%s:%s', host, port);
});
