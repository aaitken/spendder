SPNDR.init('ctrl.spend'); //Namespace
SPNDR.ctrl.spend.config=function(){

	//Aliases
	var viewSpend=SPNDR.view.spend,
		props=SPNDR.props,
		that=this,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//init
		this.subscribe(viewSpend.setup,'init');
		//receive
		this.subscribe(viewSpend.showStatus,'receive');
	};

	//METHODS===========================================================================================================

	//handleSubmit: two-part authorization request
	this.handleSubmit=function(e){
		e.preventDefault();
		$.ajax({
			type:'POST',
			contentType:'application/json',
			url:props.host+props.app, //http://127.0.0.1:5984/spendder
			data:utils.augmentJson(utils.formToJson(e), //amount (amt), category (cat), note (note)
				 	//augmentation
					'\
					"user":"'+props.user+'",\
					"type":"spend",\
					"date":"'+(new Date()).toJSON()+'",\
					"geo":""\
				'),
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