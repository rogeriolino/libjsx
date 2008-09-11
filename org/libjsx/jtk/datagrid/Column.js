
var Column = function(datagrid, cell) {

	var self = this;
	this.cell = cell;
	this.title = false;
	this.datagrid = datagrid;
	this.col = document.createElement("td");
	this.col.appendChild(cell.getInput());
	this.col.appendChild(cell.getDiv());
	this.col.className = self.datagrid.COLUMN_CLASS;
	
	this.col.onclick = function() {
		if (!self.isTitle()) {
			self.datagrid.setCurrentColumn(self);
			self.datagrid.setCurrentCell(self.getCell());
		}		
	}
	
	this.isTitle = function() {
		return self.title;
	}
	
	this.setTitle = function(t) {
		self.title = t;
	}
	
	this.getCell = function() {
		return self.cell;
	}
	
	this.getColumn = function() {
		return self.col;
	}
	
	
}