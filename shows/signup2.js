function(){
	//!code lib/mustache.js
	var view={
			title:"Joe",
			calc:function() {
				return 2+4;
			}
		},
		template=this.templates.hello; //this = design doc

	return Mustache.to_html(template, view);

}