function(newDoc,oldDoc,userCtx){

	var require=function(field,message){
			message=message||field+' is required.';
			if(!newDoc[field]){
				throw({forbidden:message});
			}
		};

	switch(newDoc.type){
		case 'transaction':
			require('amt');
			break;
		case 'user':
			require('fname');
			require('lname');
			require('_id');
			require('pword');
			break;
		default:
			break;
	};
};