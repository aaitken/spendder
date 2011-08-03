(function(){ //for alias scope
	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('ctrl.info');
	var app=SPNDR.app,
		ctrlInfo=SPNDR.ctrl.info,
		that=ctrlInfo;

	//PUBSUB============================================================================================================
	ctrlInfo.pubSub=function(){

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(ctrlInfo);

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
	};

	//METHODS===========================================================================================================
	ctrlInfo.setup=function(){

	};


	//INIT==============================================================================================================
	//init: fires for first script load
	ctrlInfo.init=function(){
		this.pubSub(); //set up publisher and subscriptions
		this.publish(null,'init'); //------------------------------------------------------------------------------>
	}.bind(ctrlInfo);
}());