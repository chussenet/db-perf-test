module.exports = {
	createDocument : function(idoc,docFields) {
		var d = {docid:idoc};
		for (var i=0;i<docFields.stringfield;i++){
			d["keyString_"+i]="value_"+idoc+"_"+i;
		};
		for (var i=0;i<docFields.integerfield;i++){
			d["keyInteger_"+i]=Math.round(Math.random()*100);
		};		
		if (docFields.istsfield=="true")
		d["ts"]=Date.now();
		return d;
	}
}; 