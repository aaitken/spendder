//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace
SPNDR.namespace('view.app'); //on load

//Init (fire this only after app, utils, ctrl[page], and view[page] have been received)
SPNDR.view.app.init=function(){
	this.config(); //define methods/props using aliases
	this.pubSub(); //set up publisher and subscriptions
	this.publish(null,'init'); //---------------------------------------------------------------------------------->
}.bind(SPNDR.view.app); //b/c fired through pubSub


SPNDR.view.app.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app;

	//PUBSUB============================================================================================================

	//make SPNDR.app a publisher (who can 'subscribe' listeners)
	SPNDR.scaffolding.pubSub.makePublisher(this);

	this.pubSub=function(){

		//SPNDR.app subscribes its listeners to... <-------------------------------------------------------listeners
		this.subscribe(ctrlApp.pubSub2,'init'); //make methods available to controller
	};

	//METHODS===========================================================================================================

	//display the couchdb's response to our show request
	this.renderShow=function(obj){
		$('#content').html(obj.response);
		obj.callback(); //init or setup
	};
};