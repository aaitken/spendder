require([
	'scripts/components/utils/sha1.js'
],function(){//provides alias scope

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

			var secondRequest=function(salt){

				var data;//data to be sent to _users api
					data=utils.augmentJson(utils.formToJson(e),'\
						"_id":"org.couchdb.user:'+$('input[name=name]').val()+'",\
						"type":"user",\
						"roles":[],\
						"password_sha":"'+hex_sha1($('input[name=password]').val()+salt)+'",\
						"partners":[],\
						"salt":"'+salt+'"\
					');

				$.ajax({
					type:'POST',
					data:data,
					contentType:'application/json',
					url:'http://127.0.0.1:5984/_users',
					success:function(body){
						that.publish(body,'receive'); //------------------------------------------------------->
					},
					error:function(xhr,error){
						if(error==='error'){alert(xhr.responseText)}
						else{alert(error)}
					}
				});
			};

			e.preventDefault();

			//get salt to add on to password hash
			$.ajax({
				url:'http://127.0.0.1:5984/_uuids',
				success:function(response){
					var uuid=JSON.parse(response).uuids[0];
					secondRequest(uuid);
				}
			});
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

	SPNDR.app.waitOnRequirements=false; //all required scripts have been loaded.
});
SPNDR.app.waitOnRequirements=true; //this indicates to core app logic that we are still waiting for a required script...