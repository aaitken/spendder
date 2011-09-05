SPNDR.init('view.spend'); //Namespace
SPNDR.view.spend.config=function(){

	//Aliases
	var ctrlSpend=SPNDR.ctrl.spend;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
	};

	//METHODS===========================================================================================================

	this.setup=function(){

		//Cancel button
		$($('button')[1]).bind('click',function(){
			history.back();
		});
	};
};