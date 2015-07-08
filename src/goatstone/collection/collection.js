/* goatstone/collection/collection.js : Jose Collas : 7.2015 */
var mongo = require('mongodb');

function collection(){
	this.db;
}
collection.prototype.get = function(){
	console.log('get..');
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