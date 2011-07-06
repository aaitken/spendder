require([

	//Modules (these come first)
	'utils/mod-formToJson',
	'scaffolding/mod-pubSub',

	//Non-modularized architectural Components
	'../scripts/scaffolding/namespace.js', //non-clobbering namespace function
	'../scripts/scaffolding/zepto.js',

	//Page
	'../scripts/logic/transaction.js'

],function(formToJson,pubSub){

	//Namespaces
	SPNDR.namespace('utils');
	SPNDR.namespace('scaffolding');

	//Assignments
	SPNDR.utils.formToJson=formToJson;
	SPNDR.scaffolding.pubSub=pubSub;

	//DOMready
	require.ready(function(){
		SPNDR.page.transaction.init();
	})
});