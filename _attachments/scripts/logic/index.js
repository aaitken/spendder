(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.index');
	var app=SPNDR.app,
		pgIndex=SPNDR.page.index,
		that=pgIndex,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pgIndex.pubSub=function(){

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pgIndex);

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
		//receive
		this.subscribe(this.handleReceive,'receive');
		//submit
		this.subscribe(this.handleSubmit,'submit');

	};

	//METHODS===========================================================================================================
	//handleReceive: receipt of authorization cookie request
	pgIndex.handleReceive=function(responseText){
		alert(responseText);
	}
	//handleSubmit: two-part authorization request
	pgIndex.handleSubmit=function(e){

		var getAuthCookie=function(){
				$.ajax({
					type:'GET',
					url:'http://127.0.0.1:5984/_session',
					success:function(responseText){
						that.publish(responseText,'receive'); //--------------------------------------------------->
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

	//setup: Dom setup
	pgIndex.setup=function(){
		//add listener > publisher for transaction submits
		$('form[name=login]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});
	};

	//INIT==============================================================================================================
	//init: fires for first script load
	pgIndex.init=function(){
		this.pubSub(); //set up publisher and subscriptions
		this.publish(null,'init'); //------------------------------------------------------------------------------>
	};
}());