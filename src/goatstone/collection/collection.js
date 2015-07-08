/* goatstone/collection/collection.js : Jose Collas : 7.2015 */
var mongo = require('mongodb');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

function collection(){
	var server = new Server('localhost','27017',{auto_reconnect:true});
	var db = new Db('goat', server);
	this.db = db;
}
collection.prototype.get = function(callback){
	this.db.open(function(err, db){
		if(err){throw 'db error';}
		db.collection('log', function(error, collection){
		var c = collection.find().limit(12).sort({timestamp:-1}).toArray(function(err, items){
				callback(items);
				db.close();
			});	
		});	
	});
};
collection.prototype.add = function(){

};
module.exports = collection;

/*
  var c = getLatest(
	function(err, collection){
		if(err){throw 'db error';}
		var c = collection.find().limit(12).sort({timestamp:-1}).toArray(function(err, items){
			var s = items.map(function(e, i){
				return '<p>' + e.log.log.temperature + ' : ' + e.timestamp + '</p>';
			});
			// send the data to the client
			res.send(s.join(" "));
			db.close();
		});	
	});
  // addLog({log:{metthod:'GET', temerature:99}});
    addLog({log:{temperature:vals[1]}});
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
 function getLatest(cb){
	db.open(function(err, db){
		if(err){throw 'db error';}
		db.collection('log', cb);	
	});
}
*/