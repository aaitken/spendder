//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace and init
SPNDR.setupInit('view.info'); //----------------------------------------------------------------------------------->


SPNDR.view.info.config=function(){

	//Aliases
	var ctrlInfo=SPNDR.ctrl.info;

	//PUBSUB============================================================================================================

	//make this a publisher (who can 'subscribe' listeners)
	SPNDR.scaffolding.pubSub.makePublisher(this);

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//init
		this.subscribe(ctrlInfo.pubSub2,'init');
	};

	this.setup=function(){
		return;
	};
};