
var Button = function(label) {

	var self = this;
	this.label = label;
	
	this.input = GenericInput.createInput("button", this.label);
	
	this.setLabel = function(label) {
		self.label = label;
	}
	
	this.getLabel = function() {
		return self.label;
	}
	
	this.onClick = function(f) {
		self.input.onclick = f;
	}
	
	this.onDoubleClick = function(f) {
		self.input.ondblclick = f;
	}

}