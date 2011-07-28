(function(){ //for alias scope
	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.info');
	var app=SPNDR.app,
		pgInfo=SPNDR.page.info,
		that=pgInfo;

	//PUBSUB============================================================================================================
	pgInfo.pubSub=function(){

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pgInfo);

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
	};

	//METHODS===========================================================================================================
	pgInfo.setup=function(){

	};


	//INIT==============================================================================================================
	//init: fires for first script load
	pgInfo.init=function(){
		this.pubSub(); //set up publisher and subscriptions
		this.publish(null,'init'); //------------------------------------------------------------------------------>
	}.bind(pgInfo);
}());