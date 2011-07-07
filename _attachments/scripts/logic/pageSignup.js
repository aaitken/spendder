(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.signup');
	var pageSignup=SPNDR.page.signup,
		that=pageSignup,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pageSignup.pubSub=function(){;

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pageSignup);

		//SPNDR.page.signup subscribes its listeners
		pageSignup.subscribe(pageSignup.handleSubmit,'submit');
		pageSignup.subscribe(SPNDR.app.handleReceive,'receive');
	};

	//METHODS===========================================================================================================

	//handleSubmit
	pageSignup.handleSubmit=function(e){

		var req=new XMLHttpRequest(),
			dat=utils.augmentJson(utils.formToJson(e),'\
					"type":"user",\
					"cohorts":"",\
					"date":"'+(new Date()).toJSON()+'"\
				');

		e.preventDefault();
		req.open('POST','http://127.0.0.1:5984/spendder',true,'acker','dadofmandg');
		req.setRequestHeader('Content-Type','application/json');
		req.onreadystatechange=function(){
			if(req.readyState===4){
				that.publish({page:'signup',response:req.responseText},'receive')
			}
		};
		req.send(dat);
	};

	//INIT==============================================================================================================
	pageSignup.init=function(){

		//set up publisher and subscriptions
		this.pubSub();

		//add listener > publisher for transaction submits
		document.signup.addEventListener('submit',function(e){
			that.publish(e,'submit');
		},false);
	}
}());