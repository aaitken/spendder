(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.login');
	var app=SPNDR.app,
		pageLogin=SPNDR.page.login,
		that=pageLogin,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pageLogin.pubSub=function(){

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pageLogin);

		//SPNDR.page.signup subscribes its listeners <-----------------------------------------------------listeners
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

		var req=new XMLHttpRequest();

		e.preventDefault

		//set auth cookie based on name/password
		(function(){

			var dat='name='+$('input[name=name]').val()+'&password='+$('input[name=password]').val();

			req.open('POST','http://127.0.0.1:5984/_session',false); //synchronous request for auth token
			req.setRequestHeader('Content-Type','application/x-www-form-urlencoded'); //simulate an html form request
			req.onreadystatechange=function(){
				if(req.readyState===4){ //todo - check for error
					//success
				}
			};
			req.send(dat);
		}());

		req.open('GET','http://127.0.0.1:5984/_session',true);
		req.onreadystatechange=function(){
			if(req.readyState===4){
				that.publish(req.responseText,'receive'); //------------------------------------------------------->
			}
		};
		req.send(null);
	};

	//INIT==============================================================================================================
	pageLogin.init=function(){

		app.init();

		//set up publisher and subscriptions
		this.pubSub();

		//add listener > publisher for transaction submits
		document.login.addEventListener('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		},false);
	}
}());