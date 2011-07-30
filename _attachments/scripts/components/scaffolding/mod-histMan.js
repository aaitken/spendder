define([],function(){
	var histMan={

		//init normalizes x-browser variations in firing of popstate on first page load
		//logic lifted from pjax
		//fn = function to fire on firing of popstate event
		init:function(fn){
			var popped=('state' in window.history),
				initialURL = location.href;
			window.onpopstate=function(e) {
				var initialPop=!popped&&location.href==initialURL;
				popped = true;
				if(initialPop){return}
				else{fn()}
			};
		}
	};
	
	return histMan;
});