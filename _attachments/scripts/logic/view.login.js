SPNDR.init('view.login'); //Namespace with init function, which publishes when ctrl and view files are down ------->
SPNDR.view.login.config=function(){

	//Aliases
	var ctrlApp=SPNDR.ctrl.app,
		props=SPNDR.props,
		that=this, //re-usable reference for inner function convention
		ctrlLogin=SPNDR.ctrl.login,
		utils=SPNDR.utils;

	//PUBSUB============================================================================================================

	this.pubSub=function(){

		//namespace subscribes its listeners to... <-------------------------------------------------------listeners
		//submit
		this.subscribe(ctrlLogin.handleSubmit,'submit');

	};

	//METHODS===========================================================================================================

	//receipt of authorization cookie request
	this.handleReceive=function(){
		$('body')[0].className='logged-in';
		$('nav h1').html(props.jsCache.navHdrHtml); //replace 'Info' with 'Menu'
	};

	this.setup=function(){

		//if we're not logged in change body class to 'logged-out'
		if(!utils.cookies.getCookie('AuthSession')){
			$('body')[0].className='logged-out';
		}

		//adjust nav based on user's logged-in status
		if($('body').hasClass('logged-out')){
			var $navHdr=$('nav h1'); //'Menu' per html
			props.jsCache.navHdrHtml=$navHdr.html(); //store off default logged-in html for re-insertion
			$navHdr.html($('#info').html()); //replace 'Menu' with 'Info'
			$navHdr.removeClass('display-no'); //show
		}

		//add listener > publisher for transaction submits
		$('form[name=login]').bind('submit',function(e){
			that.publish(e,'submit'); //--------------------------------------------------------------------------->
		});
	};
};