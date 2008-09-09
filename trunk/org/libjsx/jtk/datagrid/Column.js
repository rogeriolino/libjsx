
var Column = function(datagrid, cell) {

	var self = this;
	this.cell = cell;
	this.datagrid = datagrid;
	this.col = document.createElement("td");
	this.col.appendChild(cell.getInput());
	this.col.appendChild(cell.getDiv());	
	
	this.getCell = function() {
		return self.cell;
	}
	
	this.getColumn = function() {
		return self.col;
	}
	
	
}