/* goatstone/collection/collection.js : Jose Collas : 7.2015 */
var mongo = require('mongodb');
var Db = mongo.Db,
	BSON = mongo.BSONPure,
	mongoClient = mongo.MongoClient;
var config = require('./config');
var urlMLab = 'mongodb://goat:' + config.mongoLabPass + '@ds049548.mongolab.com:49548/goatstone_home';
function Collection(){}
Collection.prototype.get = function(callback){
	mongoClient.connect(urlMLab, function(e, db){
		db.collection('log', function(error, collection){
		var c = collection.find().limit(24).sort({timestamp:-1}).toArray(function(err, items){
				callback(items);
			});	
		});	
	});
};
Collection.prototype.add = function(obj){
	mongoClient.connect(urlMLab, function(e, db){
		db.collection('log', function(error, collection){
			collection.insert(obj);
		});
	});
};
module.exports = Collection;
