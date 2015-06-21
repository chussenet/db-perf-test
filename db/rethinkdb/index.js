var r = require('rethinkdb');
var _ = require("underscore");

var dbConnection;
var dbTable;
module.exports = {

	name : function() {
		return "RethinkDB";
	},
	open : function(params, success, error) {
		dbTable = params.table;
		r.connect({
			host : 'localhost',
			port : 28015
		}, function(err, conn) {
			if(err) throw err;
			dbConnection = conn;
			success();
		});
	},

	insert : function(docs, success, error) {
		
		r.table(dbTable).insert(docs,{durability: "soft"}).run(dbConnection, function(err, res) {
		 
			if (err)throw(err);
			
			else
				success({
					ok : 0
				});
		});
	},
	list : function(success, error) {
		success({
			docs : documents
		});
	},

	get : function(search, success, error) {
		success(documents[search.id]);
	},
	close : function(sucess, error) {
		dbConnection.close();
	}
};
