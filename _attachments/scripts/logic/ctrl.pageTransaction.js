(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.transaction');
	var pageTransaction=SPNDR.page.transaction,
		that=pageTransaction,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pageTransaction.pubSub=function(){;

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pageTransaction);

		//SPNDR.page.transaction subscribes its listeners
		pageTransaction.subscribe(pageTransaction.handleSubmit,'submit');
		pageTransaction.subscribe(SPNDR.app.handleReceive,'receive');
	};

	//METHODS===========================================================================================================

	//handleSubmit
	pageTransaction.handleSubmit=function(e){

		var req=new XMLHttpRequest(),
			dat=utils.augmentJson(utils.formToJson(e),'\
					"type":"transaction",\
					"user":"",\
					"team":"",\
					"date":"'+(new Date()).toJSON()+'",\
					"geo":""\
				');

		e.preventDefault();
		req.open('POST','http://127.0.0.1:5984/spendder',true,'acker','dadofmandg');
		req.setRequestHeader('Content-Type','application/json');
		req.onreadystatechange=function(){
			if(req.readyState===4){
				that.publish({page:'transaction',response:req.responseText},'receive')
			}
		};
		req.send(dat);
	};

	//INIT==============================================================================================================
	pageTransaction.init=function(){

		//set up publisher and subscriptions
		this.pubSub();

		//add listener > publisher for transaction submits
		document.transaction.addEventListener('submit',function(e){
			that.publish(e,'submit');
		},false);
	}
}());

