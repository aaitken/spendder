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
			auth=(function(){
					var token=null,
						dat='name='+$('input[name=name]').val()+'&password='+$('input[name=password]').val();
					req.open('POST','http://127.0.0.1:5984/_session',false); //synchronous request for auth token
					req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
					req.onreadystatechange=function(){
						if(req.readyState===4){ //todo - check for error
							console.log(req.responseText);
						}
					};
					req.send(dat);
					return SPNDR.utils.cookies.getCookie('AuthSession');
				}());
console.log(auth);
		e.preventDefault();
		/*req.open('GET',query,true,'acker','dadofmandg');
		req.onreadystatechange=function(){
			if(req.readyState===4){
				that.publish(req.responseText,'receive');
			}
		};
		req.send(null);*/
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