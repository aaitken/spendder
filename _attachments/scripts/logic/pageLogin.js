(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.login');
	var pageLogin=SPNDR.page.login,
		that=pageLogin,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pageLogin.pubSub=function(){

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pageLogin);

		//SPNDR.page.signup subscribes its listeners
		this.subscribe(this.handleSubmit,'submit');
		this.subscribe(this.handleReceive,'receive');
	};

	//METHODS===========================================================================================================

	//handleReceive
	pageLogin.handleReceive=function(responseText){
		alert(responseText);
	}
	//handleSubmit
	pageLogin.handleSubmit=function(e){

		var req=new XMLHttpRequest(),
			query='http://127.0.0.1:5984/spendder/_design/spendder/_view/users-byPassword?key=\
				["'+$('input[name=_id]').val()+'","'+$('input[name=pword]').val()+'"]'; //key=["_id","pword"]

		e.preventDefault();
		req.open('GET',query,true,'acker','dadofmandg');
		req.onreadystatechange=function(){
			if(req.readyState===4){
				that.publish(req.responseText,'receive');
			}
		};
		req.send(null);
	};

	//INIT==============================================================================================================
	pageLogin.init=function(){

		//set up publisher and subscriptions
		this.pubSub();

		//add listener > publisher for transaction submits
		document.login.addEventListener('submit',function(e){
			that.publish(e,'submit');
		},false);
	}
}());