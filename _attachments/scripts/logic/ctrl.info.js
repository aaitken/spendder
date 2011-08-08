//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace and init
SPNDR.setupInit('ctrl.info'); //----------------------------------------------------------------------------------->


SPNDR.ctrl.info.config=function(){

	//Aliases
	var viewInfo=SPNDR.view.info;

	//PUBSUB============================================================================================================

	//make this a publisher (who can 'subscribe' listeners)
	SPNDR.scaffolding.pubSub.makePublisher(this);

	//subscribe ctrl methods
	this.pubSub1=function(){

		//SPNDR.ctrl subscribes its listeners to... <------------------------------------------------------listeners
		//init
		this.subscribe(viewInfo.init,'init')
	};

	//subscribe view methods
	this.pubSub2=function(){
		return;
	};

	//METHODS===========================================================================================================

	this.setup=function(){
		return;
	};
};