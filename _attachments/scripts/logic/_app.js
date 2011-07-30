(function(){ //for alias scope

	//NAMESPACE + ALIAS=================================================================================================
	SPNDR.namespace('app');
	var app=SPNDR.app,
		that=app;

	//PROPERTIES========================================================================================================
	app.host='http://127.0.0.1:5984/';
	app.pathShow='spendder/_design/spendder/_show/';
	app.waitOnRequirements=false; //for require dependencies within page-specific files
	app.jsCache={};


	//PUBSUB============================================================================================================
	app.pubSub=function(){

		//make SPNDR.app a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(app);

		//SPNDR.app subscribes its listeners to... <-------------------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
		//showReceipt
		this.subscribe(this.renderShow,'showReceipt');
		this.subscribe(this.updateHistory,'showReceipt');
		//showRequest
		this.subscribe(this.hitShow,'showRequest');
	};

	//METHODS===========================================================================================================

	//request couchdb show
	app.hitShow=function(obj){

		var namespace=obj.show.split('.')[0], //root part of show name, minus the .html
			requireArray=['text!/spendder/_design/spendder/_show/'+obj.show],
			callback=null; //page init function to fire depending on if code has already been loaded

		if(!SPNDR.page[namespace]){ //if we haven't already loaded this file
			requireArray=requireArray.concat(['scripts/logic/'+namespace+'.js']);
			callback='init';
		}
		else{
			callback='setup';
		}

		require(requireArray,function(html){

			var publish=function(){
					that.publish({
						show:obj.show,
						history:obj.history,
						response:html,
						callback:SPNDR.page[namespace][callback]
					},'showReceipt'); //--------------------------------------------------------------------------->
				},
				poll; //polling interval for requires within page-specific files

			//Branching below accounts for cases in which supporting JS file itself includes a require call - in these
			//cases nested require is set to true on file download, and false again at bottom of require's callback
			if(!app.waitOnRequirements){publish()}
			else{
				poll=setInterval(function(){
					if(!app.waitOnRequirements){
						publish();
						clearInterval(poll);
					}
				},100);
			}

		});
	}.bind(app);

	//browser url and history management
	app.updateHistory=function(obj){
		if(obj.history){window.history.pushState(null,'',obj.show)}
	};

	//display the couchdb's response to our show request - todo: combine with hitShow if nothing else depends on response
	app.renderShow=function(obj){
		$('#content').html(obj.response);
		obj.callback(); //init or setup
	};

	//setup
	app.setup=function(){

		//listener setup for clicks on els with data-show, publish the attribute's value
		$('a[data-show]').live('click',function(e){
			that.publish({
				show:$(e.target).attr('data-show'),
				history:true
			},'showRequest'); //----------------------------------------------------------------------------------->
		});

		//history management - init param = function to fire on popstate
		SPNDR.scaffolding.history.init(function(){
			that.publish({
				show:window.location.href.split('/').pop(),
				history:false
			},'showRequest'); //----------------------------------------------------------------------------------->
		});

		//
		#('logout').bind('click')

	}.bind(app);

	//INIT==============================================================================================================
	app.init=function(){
		this.pubSub();
		this.publish(null,'init'); //------------------------------------------------------------------------------>
	};
}());