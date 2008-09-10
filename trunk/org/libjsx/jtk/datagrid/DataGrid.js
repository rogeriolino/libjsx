/**
 *
 * DataGrid v 0.1
 *
 *
 * @author Rogério Alencar Lino Filho
 *
 * http://rogeriolino.wordpress.com/
 *
 */

var DataGrid = function(lin, col) {

	var self = this;
	this.name = "libjsx-datagrid";
	this.titles = new Array(col);	
	this.rows = new Array(lin);
	
	this.cellWidth = 100;	
	this.cellHeight = 30;
	
	this.currentRow = null;	
	this.currentCell = null;
	this.currentColumn = null;
	
	this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	this.TITLE_CLASS = "libjsx-datagrid-title";	
	this.ROW_CLASS = "libjsx-datagrid-row";
	this.ROW_ACTIVED_CLASS = "libjsx-datagrid-row-actived";
	this.COLUMN_CLASS = "libjsx-datagrid-column";
	this.COLUMN_ACTIVED_CLASS = "libjsx-datagrid-column-actived";
	this.CELL_CLASS = "libjsx-datagrid-cell";
	this.CELL_ACTIVED_CLASS = "libjsx-datagrid-cell-actived";
	
	this.datagrid = document.createElement("table");
	this.datagrid.className = this.name;
	with (this.datagrid) {
		style.border = "1px solid #000000";
		style.cursor = "default";
		cellSpacing = "0";
	}	
	
	this.setName = function(name) {
		self.name = name;
	}
	
	this.getName = function() {
		return self.name;
	}
	
	this.setCell = function(lin, col, content) {
		var cell = self.getCell(lin, col);
		cell.setValue(content);
	}
	
	this.getCell = function(row, col) {
		var colunas = self.getColumns(row);
		return colunas[col].getCell();
	}
	
	this.getRows = function() {
		return self.rows;
	}
	
	this.getRow = function(row) {
		var linhas = self.getRows();
		return linhas[row];
	}
	
	this.getColumns = function(row) {
		var linha = self.getRow(row);
		return linha.getColumns();
	}
		
	this.setCellSize = function(w, h) {
		self.setCellWidth(w);
		self.setCellHeight(h);
	}
	
	this.setCellWidth = function(w) {
		self.cellWidth = w;
	}
	
	this.getCellWidth = function() {
		return self.cellWidth;
	}
	
	this.setCellHeight = function(h) {
		self.cellHeight = h;
	}
	
	this.getCellHeight = function() {
		return self.cellHeight;
	}
	
	this.setCurrentCell = function(cell) {
		var anterior = self.getCurrentCell();	
		if (anterior !== cell) {
			if (anterior != null)
				anterior.getDiv().className = self.CELL_CLASS;			
			self.currentCell = cell;
			self.currentCell.getDiv().className = self.CELL_ACTIVED_CLASS;			
		}
	}
	
	this.getCurrentCell = function() {
		return self.currentCell;
	}
	
	this.setCurrentColumn = function(col) {
		var anterior = self.getCurrentColumn();	
		if (anterior !== col) {			
			if (anterior != null)
				anterior.getColumn().className = self.COLUMN_CLASS;			
			self.currentColumn = col;
			self.currentColumn.getColumn().className = self.COLUMN_ACTIVED_CLASS;			
		}
	}
	
	this.getCurrentColumn = function() {
		return self.currentColumn;
	}
	
	this.setCurrentRow = function(row) {
		var anterior = self.getCurrentRow();
		if (anterior !== row) {		
			if (anterior != null)
				anterior.getRow().className = self.ROW_CLASS;
			self.currentRow = row;
			self.currentRow.getRow().className = self.ROW_ACTIVED_CLASS;
		}
	}
	
	this.getCurrentRow = function() {
		return this.currentRow;
	}
	
	this.closeLastCell = function() {
		var cell = self.getCurrentCell();
		if (cell != null)
			cell.hideInput();		
	}	
	
	this.setRowBg = function(color) {
		self.defaultRowBg = color;
	}
	
	this.getRowBg = function() {
		return self.defaultRowBg;
	}
	
	this.setRowSelectedBg = function(color) {
		self.selectedRowBg = color;
	}
	
	this.getRowSelectedBg = function() {
		return self.selectedRowBg;
	}
	
	this.getTitleValue = function(l, k) {
		if (l == -1)
			return self.chars.charAt(k);
		else
			return self.chars.charAt(k) + self.chars.charAt(l);
	}
	
	this.mount = function() {
		var linha;
		var coluna;
		var input;
		var div;
		var thead = document.createElement("thead");
		// header (titles)
		linha = new Row(self);
		linha.getRow().className = self.TITLE_CLASS;
		linha.setTitle(true);
		var k = -1
		var l = 0;
		for (var i=0; i<self.titles.length; i++) {			
			var cell = new Cell(this, self.getName()+"_title_"+i);
			cell.setEditable(false);			
			if (l >= self.chars.length) { k++; l = 0; }
			if (k >= self.chars.length) k = 0;
			cell.setValue(self.getTitleValue(l, k));
			l++;
			linha.add(cell);
			self.titles[i] = cell;			
		}
		thead.appendChild(linha.getRow());
		self.datagrid.appendChild(thead);
		var tbody = document.createElement("tbody");
		// body
		for (var i=0; i<self.rows.length; i++) {
			linha = new Row(self);
			self.rows[i] = linha;
			for (var j=0; j<col; j++) {
				var cell = new Cell(this, self.getName()+"_"+i+"_"+j);
				linha.add(cell);
			}
			tbody.appendChild(linha.getRow());
		}
		self.datagrid.appendChild(tbody);
		// footer
		var tfooter = document.createElement("tfooter");
		if (document.all) { // IE
			tfooter.appendChild(document.createElement("<input type='hidden' id='"+self.getName()+"_rows' name='"+self.getName()+"_rows' value='"+lin+"' />"));
			tfooter.appendChild(document.createElement("<input type='hidden' id='"+self.getName()+"_cols' name='"+self.getName()+"_cols' value='"+col+"' />"));
		} else {
			var n_linhas = document.createElement("input");
			n_linhas.setAttribute("type", "hidden");
			n_linhas.setAttribute("id", self.getName()+"_rows");
			n_linhas.setAttribute("name", self.getName()+"_rows");
			n_linhas.setAttribute("value", lin);
			
			var n_colunas = document.createElement("input");
			n_colunas.setAttribute("type", "hidden");
			n_colunas.setAttribute("id", self.getName()+"_cols");
			n_colunas.setAttribute("name", self.getName()+"_cols");
			n_colunas.setAttribute("value", col);
			
			tfooter.appendChild(n_linhas);
			tfooter.appendChild(n_colunas);
		}
		self.datagrid.appendChild(tfooter);
	}
	
	this.pack = function(target) {
		self.mount();
		document.getElementById(target).appendChild(self.datagrid);
	}
	
	// events
	this.onChangeRow = function() {}
	this.onChangeCell = function() {}
	
}
