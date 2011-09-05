SPNDR.init('view.spend'); //Namespace
SPNDR.view.spend.config=function(){

	//Aliases
	var ctrlSpend=SPNDR.ctrl.spend,
		ctrlApp=SPNDR.ctrl.app,
		that=this;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//submit
		this.subscribe(ctrlSpend.handleSubmit,'submit');
		//cancel
		this.subscribe(ctrlApp.back,'cancel');
	};

	//METHODS===========================================================================================================

	this.showStatus=function(){
		alert('success');
	};

	this.setup=function(){

		//add listener > publisher for transaction submits
		$('form[name=spend]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});

		//Cancel button
		$($('button')[1]).bind('click',function(){
			that.publish(null,'cancel'); //------------------------------------------------------------------------->
		});
	};
};