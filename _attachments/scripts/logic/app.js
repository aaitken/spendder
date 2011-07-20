(function(){ //for alias scope

	//NAMESPACE + ALIAS=================================================================================================
	SPNDR.namespace('app');
	var app=SPNDR.app,
		that=app;

	//PROPERTIES========================================================================================================
	app.host='http://127.0.0.1:5984/';
	app.pathShow='spendder/_design/spendder/_show/';


	//PUBSUB============================================================================================================
	app.pubSub=function(){

		//make SPNDR.app a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(app);

		//SPNDR.app subscribes its listeners <-------------------------------------------------------------listeners
		//showReceipt
		app.subscribe(app.manageHistory,'showReceipt');
		app.subscribe(app.renderShow,'showReceipt');
		//showRequest
		app.subscribe(app.hitShow,'showRequest');
	};

	//METHODS===========================================================================================================

	//request couchdb show
	app.hitShow=function(show){
		$.ajax({
			type:'GET',
			url:this.host+this.pathShow+show,
			success:function(responseText){
				that.publish({
					show:show,
					response:responseText
				},'showReceipt'); //------------------------------------------------------------------------------->
			}
		});
	}.bind(app); //fired from pubSub context

	//browser url and history management
	app.manageHistory=function(obj){
		history.pushState({},'Spendder Signup',obj.show);
	};

	//display the couchdb's response to our show request - todo: combine with hitShow if nothing else depends on response
	app.renderShow=function(obj){
		$('#content').html(obj.response);
	};

	//INIT==============================================================================================================
	app.init=function(){

		this.pubSub();

		//listener setup for clicks on els with data-show, publish the attribute's value
		$('a[data-show]').live('click',function(e){
			that.publish($(e.target).attr('data-show'),'showRequest'); //------------------------------------------>
		});
	};
}());