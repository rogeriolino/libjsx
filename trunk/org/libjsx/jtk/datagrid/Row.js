
var Row = function(datagrid, i) {

	var self = this;
	this.index = i;
	this.datagrid = datagrid;
	this.cols = new Array();
	this.title = false;
	
	this.row = document.createElement("tr");
	this.row.className = self.datagrid.ROW_CLASS;
	
	this.setIndex = function(i) {
		self.index = i;
	}
	
	this.getIndex = function() {
		return self.index;
	}
	
	this.isTitle = function() {
		return self.title;
	}
	
	this.setTitle = function(t) {
		self.title = t;
	}
	
	this.row.onclick = function() {
		if (!self.isTitle())
			self.datagrid.setCurrentRow(self);
	}		
	
	this.getSize = function() {
		return self.cols.length;
	}
	
	this.add = function(cell) {
		var col = new Column(self.datagrid, cell);
		self.cols[self.getSize()] = col;
		self.row.appendChild(col.getColumn());
	}
	
	this.get = function(i) {
		if (i >= 0 && i < self.getSize())
			return self.cols[i];
		return false;
	}
	
	this.last = function() {		
		return self.get(self.getSize()-1);
	}
	
	this.getColumns = function() {
		return self.cols;
	}
	
	this.getRow = function() {
		return self.row;
	}

}