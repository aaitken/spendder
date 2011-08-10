SPNDR.init('ctrl.app'); //Namespace with init function, which publishes when ctrl and view files are down --------->
SPNDR.ctrl.app.config=function(){

	//Aliases
	var that=this,
		props=SPNDR.props,
		viewApp=SPNDR.view.app;

	//PUBSUB============================================================================================================

	//subscribe ctrl methods and immediately-available view.init
	this.pubSub=function(){

		//SPNDR.app subscribes listeners to... <---------------------------------------------------------- listeners
		//init
		this.subscribe(viewApp.setup,'init');
		//showReceipt
		this.subscribe(viewApp.updateHistory,'showReceipt');
		this.subscribe(viewApp.renderShow,'showReceipt');
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
				callback=null;

			//if we haven't already loaded this show file
			if(!SPNDR.ctrl[namespace]){
				requireArray=requireArray.concat([
					'scripts/logic/ctrl.'+namespace+'.js',
					'scripts/logic/view.'+namespace+'.js'
				]);

				//set up namespaces subscriptions and publish 'init' from controller
				callback='ctrl-init';
			}
			else{
				//attach DOM behaviors/listeners only
				callback='view-setup';
			}

			require(requireArray,function(html){

				var publish=function(){
						that.publish({
							url:obj.url,
							history:obj.history,
							response:html,
							callback:SPNDR[callback.split('-')[0]][namespace][callback.split('-')[1]]
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
	};
};