SPNDR.init('view.signup'); //Namespace
SPNDR.view.signup.config=function(){

	//Aliases
	var ctrlSignup=SPNDR.ctrl.signup,
		that=this;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//namespace subscribes its listeners to... <-------------------------------------------------------listeners
		//submit (form submission)
		this.subscribe(ctrlSignup.handleSubmit,'submit');
	};

	//METHODS===========================================================================================================

	//handleReceive
	this.handleReceive=function(responseText){
		alert(responseText);
	};

	//DOM stuff
	this.setup=function(){ //todo - why is this getting fired multiple times?
		//add listener > publisher for signup submits
		$('form[name=signup]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});
	};
};