//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace
SPNDR.namespace('view.info');

//Init (fire this only after app, utils, ctrl[page], and view[page] have been received)
SPNDR.view.info.init=function(){
	this.config(); //define methods/props using aliases (now ready)
	this.pubSub(); //set up publisher and subscriptions
	this.publish(null,'init'); //---------------------------------------------------------------------------------->
}.bind(SPNDR.view.info);


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