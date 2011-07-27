//1st set of script requests
require([

	//Modules (these come first)
	'utils/mod-formToJson',
	'scaffolding/mod-pubSub',
	'utils/mod-augmentJson',
	'scaffolding/mod-history',

	//css
	//'text!/spendder/_design/spendder/styles/_app.css',

	//Non-modularized architectural Components
	'scripts/components/scaffolding/namespace.js', //non-clobbering namespace function - includes SPNDR
	'scripts/components/scaffolding/zepto.js'


],
//callback
function(formToJson,pubSub,augmentJson,history/*,css*/){

	//Namespaces
	SPNDR.namespace('utils');
	SPNDR.namespace('scaffolding');

	//Assignments
	SPNDR.utils.formToJson=formToJson;
	SPNDR.utils.augmentJson=augmentJson;
	SPNDR.scaffolding.history=history;
	SPNDR.scaffolding.pubSub=pubSub;

	//2nd 'set' of script requests
	require([
		'scripts/logic/_app.js'
	],
	//callback - 3rd 'set' of script requests
	function(){
		require([
			'scripts/logic/index.js'
		],
		function(){
			//callback - domready
			require.ready(function(){
				SPNDR.app.init();
				SPNDR.page.index.init();
			});
		});
	});
});