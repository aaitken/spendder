SPNDR.init('ctrl.home'); //Namespace
SPNDR.ctrl.home.config=function(){

	//Aliases
	var viewHome=SPNDR.view.home;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		this.subscribe(viewHome.setup,'init');
	};

	//METHODS===========================================================================================================

};