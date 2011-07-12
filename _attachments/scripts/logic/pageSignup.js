(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.signup');
	var pageSignup=SPNDR.page.signup,
		that=pageSignup, //inner function reference mechanism for convention
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pageSignup.pubSub=function(){

		//make SPNDR.page.transaction a PUBLISHer (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pageSignup);

		//SPNDR.page.signup SUBSCRIBEs its listeners to...
		//receive (form response)
		this.subscribe(this.handleReceive,'receive');
		//submit (form submission)
		this.subscribe(this.handleSubmit,'submit');

	};

	//METHODS===========================================================================================================

	//handleReceive
	pageSignup.handleReceive=function(responseText){
		alert(responseText);
	};

	//handleSubmit
	pageSignup.handleSubmit=function(e){

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

	//INIT==============================================================================================================
	pageSignup.init=function(){

		//set up publisher and subscriptions
		this.pubSub();

		//add listener > publisher for transaction submits
		document.signup.addEventListener('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		},false);
	}
}());