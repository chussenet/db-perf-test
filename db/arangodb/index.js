var Database = require('arangojs');
var util = require('util');
var async = require('async');
var _ = require("underscore");

var collection;

module.exports = {
	name : function() {
		return "Arangodb";
	},
	open : function(params, success, error) {
		db = new Database('http://127.0.0.1:8529');
		db.database(params.db, function(err, newdb) {
			if (err) {
				console.log('Failed to create database: %j', err);
			}

			newdb.collection(params.table, function(err, newCollection) {
				if (err)
					throw err
				else
					collection = newCollection;
				success();
			});

		});

	},

	insert : function(docs, success, error) {

		async.each(docs, function(doc, callback) {
			collection.save(doc, function(err, ret) {
				if (err)
					throw err;
				success({
					ok : 0
				});
				callback();
			});
		});

	},
	get : function(search, success, error) {
		success(documents[search.id]);
	},
	close : function(sucess, error) {
		//console.log(Date.now());
	}
};
