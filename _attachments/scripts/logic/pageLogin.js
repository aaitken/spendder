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

		var getAuthCookie=function(){
				$.ajax({
					type:'GET',
					url:'http://127.0.0.1:5984/_session',
					success:function(responseText){
						that.publish(responseText,'receive'); //----------------------------------------------->
					}
				});
			};

		e.preventDefault();
		$.ajax({
			type:'POST',
			data:'name='+$('input[name=name]').val()+'&password='+$('input[name=password]').val(),
			url:'http://127.0.0.1:5984/_session',
			success:getAuthCookie,
			error:function(xhr,error){
				if(error==='error'){alert(xhr.responseText)}
				else{alert(error)}
			}
		});
	};

	//INIT==============================================================================================================
	pageLogin.init=function(){

		app.init();

		//set up publisher and subscriptions
		this.pubSub();

		//add listener > publisher for transaction submits
		$('form[name=login]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});
	};
}());