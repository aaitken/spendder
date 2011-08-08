

SPNDR.setupInit=function(ns){ //ns = two-part namespace: 'ctrl||view.page'
	var nsSliced=ns.split('.');
	this.namespace(ns);
	SPNDR[nsSliced[0]][nsSliced[1]].init=function(){ //ex: SPNDR.view.index.init=...
		this.config();
		ns.split('.')[0]==='ctrl'?
			this.pubSub1(): //if we're working with the ctrl object, fire pubSub1 (cuz 2 subscribes view mthds not-yet available)
			this.pubSub(); //view has just the one pubSub func
		this.publish(null,'init'); //we're done - broadcast the init
	}.bind(SPNDR[nsSliced[0]][nsSliced[1]]); //bound because called from within pubsub
};

SPNDR.props={
	host:'http://127.0.0.1:5984/',
	path:'spendder/_design/spendder/',
	waitOnRequirements:false, //for require dependencies within page-specific files
	jsCache:{}
}