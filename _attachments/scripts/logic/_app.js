//FIRST-LOAD INITIALIZATION CODE========================================================================================

//Namespace
SPNDR.namespace('ctrl.app');

//Init
SPNDR.ctrl.app.init=function(){
	this.config();
	this.pubSub();
	this.publish(null,'init'); //---------------------------------------------------------------------------------->
};


SPNDR.ctrl.app.config=function(){

	//Aliases
	var that=this,
		props=SPNDR.props;

	//PUBSUB============================================================================================================
	this.pubSub=function(){

		//make SPNDR.app a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(this);

		//SPNDR.app subscribes its listeners to... <-------------------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
		//showReceipt
		this.subscribe(this.renderShow,'showReceipt');
		this.subscribe(this.updateHistory,'showReceipt');
		//urlRequest
		this.subscribe(this.hitUrl,'urlRequest');
	};

	//METHODS===========================================================================================================

	/*
	* hit a couchdb api url
	* obj keys: url, mthd, history
	*/
	this.hitUrl=function(obj){

		//private functions for hitting the couchdb apis of same name
		var show,
			session;

		show=function(obj){

			var namespace=obj.url.split('.')[0], //root part of show name, minus the .html
				requireArray=['text!/spendder/_design/spendder/_show/'+obj.url],
				callback=null; //page init function to fire depending on if code has already been loaded

			if(!SPNDR.ctrl[namespace]){ //if we haven't already loaded this file
				requireArray.push('scripts/logic/ctrl.'+namespace+'.js');
				callback='init';
			}
			else{
				callback='setup';
			}

			require(requireArray,function(html){

				var publish=function(){
						that.publish({
							url:obj.url,
							history:obj.history,
							response:html,
							callback:SPNDR.ctrl[namespace][callback]
						},'showReceipt'); //----------------------------------------------------------------------->
					},
					poll; //polling interval for requires within page-specific files

				//Branching below accounts for cases in which supporting JS file itself includes a require call - in these
				//cases nested require is set to true on file download, and false again at bottom of require's callback
				if(!props.waitOnRequirements){publish()}
				else{
					poll=setInterval(function(){
						if(!props.waitOnRequirements){
							publish();
							clearInterval(poll);
						}
					},100);
				}

			});
		};
		session=function(obj){
			$.ajax({
				type:obj.mthd,
				url:props.host+'_session',
				success:function(){
					that.publish({
						url:'index.html', //session api, for example, only has a single url
						api:'show',
						history:true
					},'urlRequest'); //---------------------------------------------------------------------------->
				},
				error:function(xhr,error){}
			});
		};

		switch(obj.api){
			case 'show':show(obj);break;
			case 'session':session(obj);break;
			default: return;
		}

	}.bind(this);

	//browser url and history management
	this.updateHistory=function(obj){
		if(obj.history){window.history.pushState(null,'',obj.url)}
	};

	//display the couchdb's response to our show request - todo: combine with hitShow if nothing else depends on response
	this.renderShow=function(obj){
		$('#content').html(obj.response);
		obj.callback(); //init or setup
	};

	//setup
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

	}.bind(this);

};