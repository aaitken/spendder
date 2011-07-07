(function(){ //for alias scope

	//NAMESPACE + ALIAS=================================================================================================
	SPNDR.namespace('app');
	var app=SPNDR.app,
		that=app;

	//PUBSUB============================================================================================================
	app.pubSub=function(){

		//make SPNDR.app a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(app);

		//SPNDR.app subscribes its listeners
		//app.subscribe(pageTransaction.handleSubmit,'submit');
	};

	//METHODS===========================================================================================================
	app.handleReceive=function(responseText){

		var jsonObj=JSON.parse(responseText);

		if(jsonObj.error){
			alert(jsonObj.reason);
		}
		else{
			alert('success');
			document.forms[0].reset();
		}

	};

	//INIT==============================================================================================================
	app.init=function(){};
}());