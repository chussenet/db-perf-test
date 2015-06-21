var _ = require("underscore");

var documents = {};

module.exports = {

	name : function(){
		return "Stub";
	},
	open : function(params,success, error) {
		success();
	},

	insert : function(docs, success, error) {
		_.each(docs, function(doc) {
			documents[doc.id]=doc;
		});
		success({ok:0});
	},
	close : function(sucess, error) {
	}
}; 