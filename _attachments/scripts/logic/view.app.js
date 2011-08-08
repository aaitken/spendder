//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace and init
SPNDR.setupInit('view.app'); //------------------------------------------------------------------------------------>


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