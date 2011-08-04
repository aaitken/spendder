//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace
SPNDR.namespace('ctrl.index'); //on load

//Init (fire this only after app, utils, ctrl[page], and view[page] have been received)
SPNDR.ctrl.index.init=function(){
	this.config(); //define methods/props using aliases
	this.pubSub(); //set up publisher and subscriptions
	this.publish(null,'init'); //---------------------------------------------------------------------------------->
};


SPNDR.ctrl.index.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app,
		that=this, //re-usable reference for inner function convention
		viewIndex=SPNDR.view.index,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//make the namespace a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(this);

		//namespace subscribes its listeners to... <-------------------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
		//receive
		this.subscribe(viewIndex.handleReceive,'receive');
		//submit
		this.subscribe(this.handleSubmit,'submit');

	};

	//METHODS===========================================================================================================

	//handleSubmit: two-part authorization request
	this.handleSubmit=function(e){
		e.preventDefault();
		$.ajax({
			type:'POST',
			data:'name='+$('input[name=name]').val()+'&password='+$('input[name=password]').val(), //NOT json
			url:'http://127.0.0.1:5984/_session',
			success:function(body){
				that.publish(body,'receive'); //------------------------------------------------------------------->
			},
			error:function(xhr,error){
				if(error==='error'){alert(xhr.responseText)}
				else{alert(error)}
			}
		});
	};

	//setup: Dom setup
	this.setup=function(){

		//add listener > publisher for transaction submits
		$('form[name=login]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});
	};
};