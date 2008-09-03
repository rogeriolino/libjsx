
var Row = function() {

	var self = this;
	this.cols = new Array();
	this.row = document.createElement("tr");
	
	this.getSize = function() {
		return self.cols.length;
	}
	
	this.add = function(cell) {
		var col = new Column(cell);
		self.cols[self.getSize()] = col;
		self.row.appendChild(col.getColumn());
	}
	
	this.get = function(i) {
		if (i >= 0 && i < self.getSize())
			return self.cols[i];
		return false;
	}
	
	this.getColumns = function() {
		return self.cols;
	}
	
	this.getRow = function() {
		return self.row;
	}	

}