SPNDR.init('ctrl.login'); //Namespace with init function, which publishes when ctrl and view files are down ------->
SPNDR.ctrl.login.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app,
		that=this, //re-usable reference for inner function convention
		viewLogin=SPNDR.view.login,
		utils=SPNDR.utils,
		props=SPNDR.props;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//namespace subscribes its listeners to... <--------------------------------------------controller listeners
		//init - fired from app controller
		this.subscribe(viewLogin.setup,'init');
		//receive
		this.subscribe(viewLogin.handleReceive,'receive');
		//urlRequest
		this.subscribe(ctrlApp.hitUrl,'urlRequest');
	}.bind(this);

	//METHODS===========================================================================================================

	//handleSubmit: two-part authorization request
	this.handleSubmit=function(e){
		e.preventDefault();
		$.ajax({
			type:'POST',
			data:'name='+$('input[name=name]').val()+'&password='+$('input[name=password]').val(), //NOT json
			url:props.host+'_session',
			success:function(body){
				that.publish(body,'receive'); //------------------------------------------------------------------->
				that.publish({
					url:'home.html',
					api:'show',
					history:true
				},'urlRequest'); //-------------------------------------------------------------------------------->
			},
			error:function(xhr,error){
				if(error==='error'){alert(xhr.responseText)}
				else{alert(error)}
			}
		});
	};
};