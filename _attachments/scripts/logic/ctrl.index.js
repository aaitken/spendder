//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace and init
SPNDR.setupInit('ctrl.index'); //---------------------------------------------------------------------------------->


SPNDR.ctrl.index.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app,
		that=this, //re-usable reference for inner function convention
		viewIndex=SPNDR.view.index,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================

	//make the namespace a publisher (who can 'subscribe' listeners)
	SPNDR.scaffolding.pubSub.makePublisher(this);

	this.pubSub1=function(){

		//namespace subscribes its listeners to... <--------------------------------------------controller listeners
		//init
		this.subscribe(this.setup,'init');
		this.subscribe(viewIndex.init,'init');
		//submit
		this.subscribe(this.handleSubmit,'submit');
	};

	this.pubSub2=function(){

		//namespace subscribes its listeners to... <--------------------------------------------------view listeners
		//receive
		this.subscribe(viewIndex.handleReceive,'receive');
	}.bind(this);

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