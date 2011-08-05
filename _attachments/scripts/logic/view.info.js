//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace
SPNDR.namespace('view.info');

//Init (fire this only after app, utils, ctrl[page], and view[page] have been received)
SPNDR.view.info.init=function(){
	this.config(); //define methods/props using aliases (now ready)
	this.pubSub(); //set up publisher and subscriptions
	//this.publish(null,'init'); //---------------------------------------------------------------------------------->
};


SPNDR.view.info.config=function(){

	//Aliases
	//

	this.pubSub=function(){

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		//SPNDR.scaffolding.pubSub.makePublisher(this);

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
	};

	this.setup=function(){

	};
};