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

		//SPNDR.app subscribes its listeners to... <-------------------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
		//showReceipt
		this.subscribe(this.manageHistory,'showReceipt');
		this.subscribe(this.renderShow,'showReceipt');
		//showRequest
		this.subscribe(this.hitShow,'showRequest');
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
	}.bind(app);
	//browser url and history management
	app.manageHistory=function(obj){
		window.history.pushState(null,'',obj.show);
	};
	//display the couchdb's response to our show request - todo: combine with hitShow if nothing else depends on response
	app.renderShow=function(obj){
		$('#content').html(obj.response);
	};

	//setup
	app.setup=function(){

		//listener setup for clicks on els with data-show, publish the attribute's value
		$('a[data-show]').live('click',function(e){
			that.publish($(e.target).attr('data-show'),'showRequest'); //------------------------------------------>
		});

		//browser back and forward buttons - by the time this fires, location has been changed
		this.manageHistory({show:'index'});
		(function(){
			var i=0;
			window.onpopstate=function(e){
				i++;
				if(i>1){ //because chrome is firing this on initial page load, which we don't want
					var loc=window.location.href.split('/').pop().split('.')[0];
					that.publish(loc,'showRequest'); //------------------------------------------------------------>
				}
			};
		}());

	}.bind(app);

	//INIT==============================================================================================================
	app.init=function(){
		this.pubSub();
		this.publish(null,'init'); //------------------------------------------------------------------------------>
	};
}());