(function(){ //for alias scope

	//NAMESPACE + ALIASES===============================================================================================
	SPNDR.namespace('page.index');
	var app=SPNDR.app,
		pgIndex=SPNDR.page.index,
		that=pgIndex,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================
	pgIndex.pubSub=function(){

		//make SPNDR.page.transaction a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(pgIndex);

		//SPNDR.page.signup subscribes its listeners to... <-----------------------------------------------listeners
		//init
		this.subscribe(this.setup,'init');
		//receive
		this.subscribe(this.handleReceive,'receive');
		//submit
		this.subscribe(this.handleSubmit,'submit');

	};

	//METHODS===========================================================================================================
	//handleReceive: receipt of authorization cookie request
	pgIndex.handleReceive=function(responseText){
		$('body')[0].className='logged-in';
		$('nav h1').html(app.jsCache.navHdrHtml);
	}
	//handleSubmit: two-part authorization request
	pgIndex.handleSubmit=function(e){

		e.preventDefault();
		$.ajax({
			type:'POST',
			data:'name='+$('input[name=name]').val()+'&password='+$('input[name=password]').val(), //NOT json
			url:'http://127.0.0.1:5984/_session',
			success:function(body){
				that.publish(body,'receive'); //------------------------------------------------------------------->
			},
			error:function(xhr,error){
				if(error==='error'){alert(xhr.responseText)}
				else{alert(error)}
			}
		});
	};

	//setup: Dom setup
	pgIndex.setup=function(){

		//if we're not logged in change body class to 'logged-out'
		if(!utils.cookies.getCookie('AuthSession')){
			$('body')[0].className='logged-out';
		}

		//add listener > publisher for transaction submits
		$('form[name=login]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});

		//adjust nav based on user's logged-in status
		if($('body').hasClass('logged-out')){
			var $navHdr=$('nav h1');
			app.jsCache.navHdrHtml=$navHdr.html(); //store off default logged-in html for re-insertion
			$navHdr.html($('#info').html());
			$navHdr.removeClass('display-no');
		}
		//else
	};

	//INIT==============================================================================================================
	//init: fires for first script load
	pgIndex.init=function(){
		this.pubSub(); //set up publisher and subscriptions
		this.publish(null,'init'); //------------------------------------------------------------------------------>
	};
}());