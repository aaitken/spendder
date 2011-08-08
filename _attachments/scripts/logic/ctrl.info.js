SPNDR.init('ctrl.info'); //Namespace with init function, which publishes when ctrl and view files are down -------->
SPNDR.ctrl.info.config=function(){

	//Aliases
	var viewInfo=SPNDR.view.info;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.ctrl subscribes its listeners to... <------------------------------------------------------listeners
	}.bind(this);

	//METHODS===========================================================================================================

	this.setup=function(){
		return;
	};
};