SPNDR.init('view.app'); //Namespace
SPNDR.view.app.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app,
		that=this;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//Obj subscribes its listeners to... <-------------------------------------------------------------listeners
		//urlRequest
		this.subscribe(ctrlApp.hitUrl,'urlRequest');
	};

	//METHODS===========================================================================================================

	//display the couchdb's response to our show request
	this.renderShow=function(obj){
		$('#content').html(obj.response);
		obj.callback(); //init or setup
	};

	//browser url and history management
	this.updateHistory=function(obj){
		if(window.location.href.split('/').pop()==='index.html'&&obj.url==='login.html'){obj.history=true} //for history(-1) that resolves to index.html/login page - complement to this logic is in ctrlApp.show
		if(obj.history){window.history.pushState(null,'',obj.url)}
	};

	this.setup=function(){

		//listener setup for clicks on els with data-url, publish the attribute's value
		$('a[data-api]').live('click',function(e){
			var $targ=$(e.target);
			that.publish({
				url:$targ.attr('data-url')||null, //session api, for example, only has a single url
				api:$targ.attr('data-api'),
				mthd:$targ.attr('data-mthd')||null, //will default to 'GET' in api
				history:true
			},'urlRequest'); //----------------------------------------------------------------------------------->
		});

		//history management - init param = function to fire on popstate
		SPNDR.scaffolding.history.init(function(){
			that.publish({
				url:window.location.href.split('/').pop(),
				api:'show',
				history:false
			},'urlRequest'); //----------------------------------------------------------------------------------->
		});
	};
};