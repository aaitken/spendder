define([],function(){
	var augmentJson=function(jsonStr,augmentation){
		jsonStr=jsonStr.slice(0,jsonStr.lastIndexOf('}'))+',';
		jsonStr+=augmentation+'}';
		return jsonStr;
	};
	return augmentJson;
});