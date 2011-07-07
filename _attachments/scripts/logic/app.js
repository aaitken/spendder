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
	app.handleReceive=function(obj){

		var jsonObj=JSON.parse(obj.response);

		if(jsonObj.error){
			switch(obj.page){
				case 'signup':
					if(jsonObj.reason==='Document update conflict.'){
						alert('Sorry but that user name is already taken. Please try another one.')
					}
					else{
						alert(jsonObj.reason);
					}
					break;
				default:
					alert(jsonObj.reason);
			}
		}
		else{
			alert('success');
			document.forms[0].reset();
		}

	};

	//INIT==============================================================================================================
	app.init=function(){};
}());