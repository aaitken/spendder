//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace and init
SPNDR.setupInit('view.signup'); //--------------------------------------------------------------------------------->


SPNDR.view.signup.config=function(){

	//Aliases
	var ctrlSignup=SPNDR.ctrl.signup;

	//PUBSUB============================================================================================================

	//make this a publisher (who can 'subscribe' listeners)
	SPNDR.scaffolding.pubSub.makePublisher(this);

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//init
		this.subscribe(ctrlSignup.pubSub2,'init');
	};

	//METHODS===========================================================================================================

	//handleReceive
	this.handleReceive=function(responseText){
		alert(responseText);
	};

	this.setup=function(){
		return;
	};
};