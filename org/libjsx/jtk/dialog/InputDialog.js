

var InputDialog = function(callback) {

	var self = this;
	this.callback = callback;
	
	this.button = new Button("Ok");
	this.button.onClick(callback);

}
