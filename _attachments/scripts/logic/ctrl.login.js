SPNDR.init('ctrl.login'); //Namespace with init function, which publishes when ctrl and view files are down ------->
SPNDR.ctrl.login.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app,
		viewApp=SPNDR.view.app,
		that=this, //re-usable reference for inner function convention
		viewLogin=SPNDR.view.login,
		utils=SPNDR.utils,
		props=SPNDR.props;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//namespace subscribes its listeners to... <--------------------------------------------controller listeners
		//error
		this.subscribe(viewApp.showError,'error');
		//init - fired from app controller
		this.subscribe(viewLogin.setup,'init');
		//receive
		this.subscribe(this.setUser,'receive');
		this.subscribe(viewLogin.handleReceive,'receive');
		//urlRequest
		this.subscribe(ctrlApp.hitUrl,'urlRequest');
	}.bind(this);

	//METHODS===========================================================================================================

	//handleSubmit: two-part authorization request
	this.setUser=function(){
		$.ajax({
			url:props.host+'_session',
			success:function(body){
				props.user=JSON.parse(body).userCtx.name;
			}
		})
	};

	this.handleSubmit=function(e){
		e.preventDefault();
		$.ajax({
			type:'POST',
			data:'name='+$('input[name=name]').val()+'&password='+$('input[name=password]').val(), //NOT json
			url:props.host+'_session',
			success:function(body){
					that.publish(body,'receive'); //--------------------------------------------------------------->
					that.publish({
						url:'home.html',
						api:'show',
						history:true
					},'urlRequest'); //---------------------------------------------------------------------------->
				},
			error:function(xhr,error){
					that.publish({xhr:xhr,error:error},'error'); //------------------------------------------------>
				}
		});
	};
};