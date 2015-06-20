/* init.js : Jose Collas 6.2015 */
var express = require('express');
var mongo = require('mongodb');
var app = express();
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;
var server = new Server('localhost','27017',{auto_reconnect:true});
var db = new Db('pepple_edison', server);
var url = 'mongodb://localhost:27017/test';
/* http server */
app.get('/', function (req, res) {
  var c = getLatest(
	function(err, collection){
		if(err){throw 'db error';}
		var c = collection.find().limit(12).sort({timestamp:-1}).toArray(function(err, items){
			var s = items.map(function(e, i){
				return '<p>' + e.log.log + ' : ' + e.timestamp + '</p>';
			});
			// send the data to the client
			res.send(s.join(" "));
			db.close();
		});	
	});
});
app.get('/pepple', function (req, res) {
  addLog({log:'get'});
  res.send('GET to pepple...');
});
app.post('/pepple', function (req, res) {
  addLog({log:'post'});
  res.send('POST to pepple...');
});
var server = app.listen(3000, '192.168.1.7', function () {
  // var host = server.address().address;
  // var port = server.address().port;
  //console.log('Example app listening at http://%s:%s', host, port);
});
/* addLog() */
function addLog(log){
	if(!log){
		throw 'Error : log arg needed.';
	}
	db.open(function(err, db){
		if(err){throw 'db error';}
		db.collection('log', function(err, collection){
			if(err){throw 'db error';}
			collection.insert({"name":'X', "log":log, "timestamp":new Date()});
			db.close();
		});	
	});	
}
/* getLatest() : query latest  */
function getLatest(cb){
	db.open(function(err, db){
		if(err){throw 'db error';}
		db.collection('log', cb);	
	});
}