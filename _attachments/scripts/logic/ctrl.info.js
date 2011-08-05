//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace
SPNDR.namespace('ctrl.info');

//Init (fire this only after app, utils, ctrl[page], and view[page] have been received)
SPNDR.ctrl.info.init=function(){
	this.config(); //define methods/props using aliases (now ready)
	this.pubSub1(); //set up publisher and subscriptions
	this.publish(null,'init'); //---------------------------------------------------------------------------------->
}.bind(SPNDR.ctrl.info);


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