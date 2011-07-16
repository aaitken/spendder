(function(){ //for alias scope

	//NAMESPACE + ALIAS=================================================================================================
	SPNDR.namespace('app');
	var app=SPNDR.app,
		that=app;

	//PROPERTIES========================================================================================================
	app.host='http://127.0.0.1:5984/';
	app.pathShow='spendder/_design/spendder/_show/';


	//PUBSUB============================================================================================================
	app.pubSub=function(){

		//make SPNDR.app a publisher (who can 'subscribe' listeners)
		SPNDR.scaffolding.pubSub.makePublisher(app);

		//SPNDR.app subscribes its listeners <-------------------------------------------------------------listeners
		// 'show'
		app.subscribe(app.hitShow,'show');
	};

	//METHODS===========================================================================================================
	app.hitShow=function(show){

		var req=new XMLHttpRequest();

		console.log(this);
		req.open('GET',this.host+this.pathShow+show,true);
		req.onreadystatechange=function(){
			if(req.readyState===4){
				alert(req.responseText);
			}
		};
		req.send(null);
	}.bind(app); //bound here to init b/c this actually gets fired under a different context

	//INIT==============================================================================================================
	app.init=function(){

		this.pubSub();

		$('a[data-show]').each(function(){ //this within the zepto function = raw dom el
			this.addEventListener('click',function(e){
				that.publish(this.getAttribute('data-show'),'show') //--------------------------------------------->
			},false);
		});
	};
}());