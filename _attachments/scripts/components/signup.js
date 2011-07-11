//1st set of script requests
require([

	//Modules (these come first)
	'utils/mod-formToJson',
	'scaffolding/mod-pubSub',
	'utils/mod-augmentJson',

	//Non-modularized architectural Components
	'../scripts/components/scaffolding/namespace.js', //non-clobbering namespace function - includes SPNDR
	'../scripts/components/scaffolding/zepto.js',
	'../scripts/components/utils/sha1.js'

],function(formToJson,pubSub,augmentJson){

	//Namespaces
	SPNDR.namespace('utils');
	SPNDR.namespace('scaffolding');

	//Assignments
	SPNDR.utils.formToJson=formToJson;
	SPNDR.utils.augmentJson=augmentJson;
	SPNDR.scaffolding.pubSub=pubSub;

	//2nd set of script requests
	require([
		//App and Page
		'../scripts/logic/app.js', //======================================================duped up unitl here==========
		'../scripts/logic/pageSignup.js'
	],function(){
		//DOMready
		require.ready(function(){
			SPNDR.page.signup.init();
		});
	});
});