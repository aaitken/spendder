SPNDR.init('ctrl.index'); //Namespace with init function, which publishes when ctrl and view files are down ------->
SPNDR.ctrl.index.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app,
		that=this, //re-usable reference for inner function convention
		viewIndex=SPNDR.view.index,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//namespace subscribes its listeners to... <--------------------------------------------controller listeners
		//init - fired from app controller
		this.subscribe(viewIndex.setup,'init');
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
};