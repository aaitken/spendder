SPNDR.init=function(ns){ //ns = two-part namespace: 'ctrl||view.page'
	var ns=ns.split('.'),
		page=ns[1];

	//no matter what comes in first, we're going to have to create both these -
	//convention (vs configuration)
	this.namespace('view.'+page);
	this.namespace('ctrl.'+page);

	//make object a publisher (who can 'subscribe' listeners)
	this.scaffolding.pubSub.makePublisher(this[ns[0]][page]);

	if(!SPNDR.ctrl[page].init){ //setup controller init function 2b fired when files are down
		SPNDR.ctrl[page].init=function(){ //ex: SPNDR.view.index.init=... called from external when both files are down
			this.config(); //this is controller for ns
			SPNDR.view[page].config();
			this.pubSub();
			SPNDR.view[page].pubSub();
			this.publish(null,'init'); //we're done - broadcast the init------------------------------------------->
		}.bind(SPNDR.ctrl[page]); //bound because called from within pubsub
	}
};

SPNDR.props={
	host:'http://127.0.0.1:5984/',
	path:'spendder/_design/spendder/',
	waitOnRequirements:false, //for require dependencies within page-specific files
	jsCache:{}
}