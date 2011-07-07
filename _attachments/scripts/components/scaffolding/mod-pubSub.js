define([],function(){
	var pubSub={
		publisher:{
			subscribers:{
				any:[]//default catcher
			},
			subscribe:function(fn,type){
				type=type||'any';
				if(typeof this.subscribers[type]==='undefined'){
					this.subscribers[type]=[];//if subscription passes a type we don't have, make new array for this
				}
				this.subscribers[type].push(fn);//push subscriber function to default 'any' or explicitly-provided type array
			},
			unsubscribe:function(fn,type){
				this.visitSubscribers('unsubscribe',fn,type);
			},
			publish:function(publication,type){//publication is what we're putting out, type defines who we put it out to (based on consumer's subscription)
				this.visitSubscribers('publish',publication,type);
			},
			visitSubscribers:function(action,arg,type){//communicate the published event to subscribers - arg is parameter of client function for 'publish,' client function itself for 'unsubscribe'

				var pubtype=type||'any',
					subscribers=this.subscribers[pubtype],
					i,
					max=subscribers.length;

				for(i=0;i<max;i++){
					if(action==='publish'){
						subscribers[i](arg);//fire that bad boy with its argument
					}
					else{//action==='unsubscribe'
						if(subscribers[i]===arg){
							subscribers.splice(i,1);//remove from subscribers array
						}
					}
				}
			}
		},
		//function for turning an object into a publisher through mix-in of generic publisher's methods
		makePublisher:function(o){
			var i;
			for(i in this.publisher){
				if(this.publisher.hasOwnProperty(i)&&typeof this.publisher[i]==='function'){
					o[i]=this.publisher[i];
				}
			}
			o.subscribers={
				any:[]
			};
		}
	};
	return pubSub;
});