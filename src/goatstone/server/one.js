/* goatstone/server/one.js : Jose Collas 7.2015 */
var fileRoot = '/home/goat/projects/node_mongo_goat';
var express = require('express');
var Collection = require('/home/goat/projects/node_mongo_goat/src/goatstone/collection/collection');
var Display = require('/home/goat/projects/node_mongo_goat/src/goatstone/ui/Display');
var app = express();
var collection = new Collection();
var display = new Display();
var server;
app.use(express.static('node_modules'));
app.get('/', function (req, res) {
  res.sendFile( fileRoot + '/src/goatstone/ui/html/main.html');
});
app.get('/contact', function (req, res) {
  res.sendFile( fileRoot + '/src/goatstone/ui/html/contact.html');
});
app.get('/log', function (req, res) {
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
    var vals = b.split('&').reduce(function(p, c, i, arr){
      var kv = c.split("=");
      p[kv[0]] = kv[1];
      return p ; 
    }, {timestamp:new Date()})
    collection.add(vals);
    res.send('<h1 style="text-align:center;">Thank You For Your Message.</h1>' );
   }); 
});
server = app.listen(3000, '192.168.1.9', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(' goatstone.server.one  listening at http://%s:%s', host, port);
});
