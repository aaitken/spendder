//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace
SPNDR.namespace('view.signup');

//Init (fire this only after app, utils, ctrl[page], and view[page] have been received)
SPNDR.view.signup.init=function(){
	this.config(); //define methods/props using aliases (now ready)
	this.pubSub(); //set up publisher and subscriptions
	this.publish(null,'init'); //---------------------------------------------------------------------------------->
}.bind(SPNDR.view.signup);


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