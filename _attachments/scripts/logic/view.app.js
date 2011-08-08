SPNDR.init('view.app'); //Namespace
SPNDR.view.app.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//Obj subscribes its listeners to... <-------------------------------------------------------------listeners
	};

	//METHODS===========================================================================================================

	//display the couchdb's response to our show request
	this.renderShow=function(obj){
		$('#content').html(obj.response);
		obj.callback(); //init or setup
	};
};