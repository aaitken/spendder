(function(){ //for alias scope

	//NAMESPACE + ALIAS=====================================================================================================
	SPNDR.namespace('page.transaction');
	var pageTransaction=SPNDR.page.transaction;

	//PUBSUB================================================================================================================
	pageTransaction.pubSub=function(){;

		//Publisher
		SPNDR.scaffolding.pubSub.makePublisher(pageTransaction);

		//Subscribers
		pageTransaction.subscribe(pageTransaction.handleSubmit,'submit');
	};

	//METHODS===============================================================================================================

	//handleSubmit
	pageTransaction.handleSubmit=function(e){alert(e.target);

		var req=new XMLHttpRequest(),
			dat=SPNDR.utils.formToJson(e);

		e.preventDefault();
		req.open('POST','http://127.0.0.1:5984/minimal',true,'acker','dadofmandg');
		req.setRequestHeader('Content-Type','application/json');
		req.send(dat);
	};

	//INIT==================================================================================================================
	pageTransaction.init=function(){

		var that=this; //SPNDR.page.transaction

		//set up publisher and subscriptions
		this.pubSub();

		//publish transaction submits
		document.transaction.addEventListener('submit',function(e){
			that.publish(e,'submit');
		},false);
	}
}());

