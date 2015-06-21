var cp = require('child_process');
var _ = require('underscore');
var sizeof = require('object-sizeof');
var argv = require('optimist')
    .default('dbpackage', "stub")
    .default('documentpackage', "document")
    .default('stringfield', 1)
    .default('integerfield', 1)
    .default('istsfield', true)
    .default('nb', 1000)
    .default('threads', 1)
    .default('batchinsert', 200)
    .default('db', 'test')
    .default('table', 'perfTest')
    .argv
;
var db = require("./db/"+argv.dbpackage);
var docFactory = require("./"+argv.documentpackage);

var t0=Date.now();
var perfSummary=[];
for (var i=0;i<argv.threads;i++)
{
var process = cp.fork('oneInsert.js',[JSON.stringify(argv)]);

process.on('message', function(m) {
  perfSummary.push(m);
  if (perfSummary.length==argv.threads)
  {
  	var result = _.reduce(perfSummary,function(mem,res){
  				return {inserted:mem.inserted+res.inserted,time:mem.time+res.time};
  	},{inserted:0,time:0});
	var t1=Date.now();
  	console.log("Document size:"+sizeof(docFactory.createDocument(0,argv))+" bytes.");
  	console.log(db.name()+":"+result.inserted+" inserts in "+(t1-t0)+" (ms)");
  	console.log(db.name()+":"+Math.round(1000*result.inserted/(t1-t0))+" (inserts/s)");
   
  }
});

}

