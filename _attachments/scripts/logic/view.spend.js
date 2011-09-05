SPNDR.init('view.spend'); //Namespace
SPNDR.view.spend.config=function(){

	//Aliases
	var ctrlSpend=SPNDR.ctrl.spend,
		ctrlApp=SPNDR.ctrl.app,
		that=this;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//cancel
		this.subscribe(ctrlApp.back,'cancel');
	};

	//METHODS===========================================================================================================

	this.setup=function(){

		//Cancel button
		$($('button')[1]).bind('click',function(){
			that.publish(null,'cancel'); //------------------------------------------------------------------------->
		});
	};
};