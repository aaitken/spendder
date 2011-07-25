(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.signup');
	var pgSignup=SPNDR.page.signup,
		that=pgSignup, //inner function reference mechanism for convention
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pgSignup.pubSub=function(){

		//make SPNDR.page.transaction a PUBLISHer (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pgSignup);

		//SPNDR.page.signup SUBSCRIBEs its listeners to...
		//init
		this.subscribe(this.setup,'init');
		//receive (form response)
		this.subscribe(this.handleReceive,'receive');
		//submit (form submission)
		this.subscribe(this.handleSubmit,'submit');

	};

	//METHODS===========================================================================================================

	//handleReceive
	pgSignup.handleReceive=function(responseText){
		alert(responseText);
	};

	//handleSubmit
	pgSignup.handleSubmit=function(e){

		var req=new XMLHttpRequest(),
			//salt is added on to password - end hash includes both
			salt=(function(){
					var uuid=null;
					req.open('GET','http://127.0.0.1:5984/_uuids',false); //synchronous request to couch uuid generator
					req.onreadystatechange=function(){
						if(req.readyState===4){
							uuid=JSON.parse(req.responseText).uuids[0];
						}
					};
					req.send();
					return uuid;
				}()),
			//data to be sent to _users api
			dat=utils.augmentJson(utils.formToJson(e),'\
					"_id":"org.couchdb.user:'+$('input[name=name]').val()+'",\
					"type":"user",\
					"roles":[],\
					"password_sha":"'+hex_sha1($('input[name=password]').val()+salt)+'",\
					"partners":[],\
					"salt":"'+salt+'"\
				');
		
		e.preventDefault(); //kill default form submit
		req.open('POST','http://127.0.0.1:5984/_users',true); //no username/password needed?
		req.setRequestHeader('Content-Type','application/json');
		req.onreadystatechange=function(){
			if(req.readyState===4){
				that.publish(req.responseText,'receive'); //------------------------------------------------------->
			}
		};
		req.send(dat);
	};

	//setup: Dom setup
	pgSignup.setup=function(){
		//add listener > publisher for signup submits
		$('form[name=signup]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});
	};

	//INIT==============================================================================================================
	//init: fires for first script load
	pgSignup.init=function(){
		this.pubSub(); //set up publisher and subscriptions
		this.publish(null,'init');
	}.bind(pgSignup);
}());