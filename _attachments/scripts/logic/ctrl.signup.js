require([
	'scripts/components/utils/sha1.js'
],function(){
	SPNDR.init('ctrl.signup'); //Namespace with init func, which publishes when ctrl and view files are down ------>
	SPNDR.ctrl.signup.config=function(){

		//Aliases
		var that=this,
			viewSignup=SPNDR.view.signup,
			utils=SPNDR.utils;

		//PUBSUB========================================================================================================

		this.pubSub=function(){

			//SPNDR.page.signup SUBSCRIBEs its listeners to...
			//init
			this.subscribe(viewSignup.setup,'init');
			//receive (form response)
			this.subscribe(viewSignup.handleReceive,'receive');
		};

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
	};

	SPNDR.props.waitOnRequirements=false; //all required scripts have been loaded.
});
SPNDR.props.waitOnRequirements=true; //this indicates to core app logic that we are still waiting for a required script...