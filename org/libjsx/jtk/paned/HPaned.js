
var HPaned = function(w) {
	
	this.width = w;
	
	this.setWidth = function(w) {
		self.width = w;
	}
	
	this.getWidth = function(w) {
		return self.width;
	}
	
}

var Pane = function(w) {
	
	var self = this;
	this.div = document.createElement("div");
	this.width = w;
	
	this.setWidth = function(w) {
		self.width = w;
	}
	
	this.getWidth = function(w) {
		return self.width;
	}
	
}

var Separator = function() {
	
	var self = this;
	this.div = document.createElement("div");
	
	

}