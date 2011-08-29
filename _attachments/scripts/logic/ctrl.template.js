SPNDR.init('ctrl.ns'); //Namespace
SPNDR.ctrl.ns.config=function(){

	//Aliases
	var viewNs=SPNDR.view.ns;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//namespace subscribes its listeners to... <--------------------------------------------controller listeners
		//init - fired from app controller on first file load
		this.subscribe(viewNs.setup,'init');
	};

	//METHODS===========================================================================================================

};