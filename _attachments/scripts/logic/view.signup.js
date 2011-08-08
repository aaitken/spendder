SPNDR.init('view.signup'); //Namespace
SPNDR.view.signup.config=function(){

	//Aliases
	var ctrlSignup=SPNDR.ctrl.signup;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
	}.bind(this);

	//METHODS===========================================================================================================

	//handleReceive
	this.handleReceive=function(responseText){
		alert(responseText);
	};

	this.setup=function(){
		return;
	};
};