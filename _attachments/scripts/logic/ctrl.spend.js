SPNDR.init('ctrl.spend'); //Namespace
SPNDR.ctrl.spend.config=function(){

	//Aliases
	var viewSpend=SPNDR.view.spend;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		this.subscribe(viewSpend.setup,'init');
	};

	//METHODS===========================================================================================================

};