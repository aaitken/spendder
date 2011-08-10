//1st set of script requests
require([

	//Modules (these come first)
	'utils/mod-formToJson',
	'scaffolding/mod-pubSub',
	'utils/mod-augmentJson',
	'scaffolding/mod-histMan',
	'utils/mod-cookies',

	//css
	//'text!/spendder/_design/spendder/styles/_app.css',

	//Non-modularized architectural Components
	'scripts/components/scaffolding/namespace.js', //non-clobbering namespace function - includes SPNDR
	'scripts/components/scaffolding/zepto.js'


],
//callback
function(formToJson,pubSub,augmentJson,histMan,cookies/*,css*/){

	//Namespaces
	SPNDR.namespace('utils');
	SPNDR.namespace('scaffolding');

	//Assignments
	SPNDR.utils.formToJson=formToJson;
	SPNDR.utils.augmentJson=augmentJson;
	SPNDR.utils.cookies=cookies;
	SPNDR.scaffolding.history=histMan;
	SPNDR.scaffolding.pubSub=pubSub;

	//2nd 'set' of script requests
	require([
		'scripts/components/scaffolding/SPNDR.js' //includes abstraction of ctrl-view setup
	],function(){
		require([
			'scripts/logic/ctrl.app.js',
			'scripts/logic/view.app.js'
		],
		//callback
		function(){
			//callback - domready
			require.ready(function(){
				SPNDR.ctrl.app.init(); //in turn fires view.app.init
			});
		});
	})
});