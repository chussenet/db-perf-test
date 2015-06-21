var mongoClient = require('mongodb').MongoClient;
var _ = require("underscore");

var collection;
var mongoclient;

module.exports = {

	name : function() {
		return "Mongodb";
	},
	open : function(params, success, error) {
		var uri = "mongodb://localhost:27017/"+params.db;
		mongoClient.connect(uri, function(err, db) {
		    if (err)throw err;
		    mongoclient=db;
		    collection = db.collection(params.table);
		    success();
		});
	},

	insert : function(docs, success, error) {
			collection.insertMany(docs, function(err, result) {
			if (err) throw err;
			success({ok:0});
		});
	},
	get : function(search, success, error) {
		success(documents[search.id]);
	},
	close : function(sucess, error) {
	
		mongoclient.close();
	}
};
 