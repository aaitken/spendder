require([
	'scripts/components/utils/sha1.js'
],function(){

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('ctrl.signup');

	SPNDR.ctrl.signup.init=function(){
		this.config();
		this.pubSub1();
		this.publish(null,'init'); //------------------------------------------------------------------------------>
	}.bind(SPNDR.ctrl.signup);


	SPNDR.ctrl.signup.config=function(){

		//Aliases
		var that=this,
			viewSignup=SPNDR.view.signup,
			utils=SPNDR.utils;

		//PUBSUB========================================================================================================

		//make SPNDR.page.transaction a PUBLISHer (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(this);

		this.pubSub1=function(){

			//SPNDR.page.signup SUBSCRIBEs its listeners to...
			//init
			this.subscribe(this.setup,'init');
			this.subscribe(viewSignup.init,'init');
			//submit (form submission)
			this.subscribe(this.handleSubmit,'submit');
		};

		this.pubSub2=function(){

			//receive (form response)
			this.subscribe(viewSignup.handleReceive,'receive');
		}.bind(this);

		//METHODS=======================================================================================================

		//handleSubmit
		this.handleSubmit=function(e){

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
		this.setup=function(){
			//add listener > publisher for signup submits
			$('form[name=signup]').bind('submit',function(e){
				that.publish(e,'submit'); //----------------------------------------------------------------------->
			});
		};
	};

	SPNDR.props.waitOnRequirements=false; //all required scripts have been loaded.
});
SPNDR.props.waitOnRequirements=true; //this indicates to core app logic that we are still waiting for a required script...