var argv = JSON.parse(process.argv.slice(2)[0]);

var db = require("./db/"+argv.dbpackage);
var async = require("async");
var docFactory = require("./"+argv.documentpackage);

db.open({db:argv.db,table:argv.table},function() {
	var count = 0;
	var nb = argv.nb;
	var nbDocs = argv.batchinsert;

	var t0=Date.now();
	async.whilst(function() {
		return count < nb;
	}, function(callback) {
		var docs = [];
		var toInsert=Math.min(nb-count,nbDocs);
		for (var i = 0; i < toInsert; i++)
			docs.push(docFactory.createDocument(i+count,argv));
		count+=toInsert;
		db.insert(docs, function(data) {
			callback();
		}, function(error) {
			console.log(error);
			callback();
		});
	}, function(err) {
	 
			var diff = Date.now()-t0;
			var msg={module:db.name(),
			         inserted:nb,
			         time:diff,
			         perf:Math.round(nb/diff),
			         pid:process.pid
			         };
 			process.send(msg);
			db.close();
			
	});

}); 