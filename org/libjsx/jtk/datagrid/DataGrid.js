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
	this.name = "datagrid";	
	this.rows = new Array(lin);
	
	this.font = "Sans-serif";
	this.fontSize = "12";
	this.fontColor = "#000000";
	this.textAlign = "left";
	this.cellWidth;	
	this.cellHeight;	
	this.cellOverflow = "hidden";
	this.cellBorder = "1";
	this.cellBorderColor = "#CCCCCC";
	this.cellBorderStyle = "solid";
	this.currentRow = null;
	this.selectedRowBg = "#F1F1F1";
	this.defaultRowBg = "#FFFFFF";
	
	this.currentCell = null;
	this.currentColumn = null;
	this.currentColumnBorderColor = "#FF0000";
	
	this.datagrid = document.createElement("table");
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
		
	this.setFont = function(font) {
		self.font = font;
	}
	
	this.getFont = function() {
		return self.font;
	}
	
	this.setFontSize = function(size) {
		self.fontSize = size;
	}
	
	this.getFontSize = function() {
		return self.fontSize;
	}
	
	this.setFontColor = function(color) {
		self.fontColor = "#000000";
	}
	
	this.getFontColor = function() {
		return self.fontColor;
	}
	
	this.setTextAlign = function(align) {
		self.textAlign = align;
	}
	
	this.getTextAlign = function() {
		return self.textAlign;
	}
	
	this.setCell = function(lin, col, content) {
		var cell = self.getCell(lin, col);
		var input = cel.getInput();
		var div = cel.getDiv();
		input.value = content;
		div.innerHTML = content;
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
	
	this.setCellOverflow = function(is) {
		if (is)
			self.cellOverflow = "hidden";
		else
			self.cellOverflow = "none";
	}
	
	this.getCellOverflow = function() {
		return self.cellOverflow;
	}
	
	this.setCellBorder = function(px, color) {
		self.setCellBorder(px);
		self.setCellBorderColor(color);
	}
	
	this.setCellBorderPx = function(px) {
		self.cellBorder = px;
	}
	
	this.setCellBorderColor = function(color) {
		self.cellBorderColor = color;
	}
	
	this.getCellBorder = function() {
		return self.cellBorder;
	}
	
	this.getCellBorderColor = function() {
		return self.cellBorderColor;
	}
	
	this.getCellBorderStyle = function() {
		return self.cellBorderStyle;
	}
	
	this.setCurrentCell = function(cell) {		
		self.currentCell = cell;		
	}
	
	this.getCurrentCell = function() {
		return self.currentCell;
	}
	
	this.setCurrentColumn = function(col) {				
		self.currentColumn = col;
	}
	
	this.getCurrentColumn = function() {
		return self.currentColumn;
	}
	
	this.setCellHighLightColor = function(color) {
		self.currentCellBorderColor = color;
	}
	
	this.getCellHighLightColor = function() {
		return self.currentCellBorderColor;
	}
	
	this.highlightCell = function() {
		var cell = self.getCurrentCell();
		if (cell != null)
			cell.removeInput();
		var col = self.getCurrentColumn();
		if (col != null)
			col.getRow().style.borderColor = self.getCellBorderColor();
	}
	
	this.setCurrentRow = function(row) {
		var anterior = self.getCurrentRow();
		if (anterior != null)
			anterior.style.background = self.getRowBg();
		self.currentRow = row;
	}
	
	this.getCurrentRow = function() {
		return this.currentRow;
	}
	
	this.onRowChange = function() {
		var linhas = self.getRows();
		for (var i=0; i<linhas.length; i++) {
			linhas[i].getRow().onmousedown = function() {
				self.setCurrentRow(this);
				this.style.background = self.getRowSelectedBg();
			}
		}
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
	
	this.getCell = function(row, col) {
		var colunas = self.getColumns(row);
		return colunas[col];
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
	
	this.mount = function() {
		var linha;
		var coluna;
		var input;
		var div;
		var thead = document.createElement("thead");
		if (document.all) {
			thead.appendChild(document.createElement("<input type='hidden' id='"+self.getName()+"_rows' name='"+self.getName()+"_rows' value='"+lin+"' />"));
			thead.appendChild(document.createElement("<input type='hidden' id='"+self.getName()+"_cols' name='"+self.getName()+"_cols' value='"+col+"' />"));
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
			
			thead.appendChild(n_linhas);			
			thead.appendChild(n_colunas);
		}
		self.datagrid.appendChild(thead);
		var tbody = document.createElement("tbody");		
		
		for (var i=0; i<self.rows.length; i++) {		
			linha = new Row(self);
			linha.getRow().style.background = self.getRowBg();
			self.rows[i] = linha;
			
			for (var j=0; j<col; j++) {			
				var cell = new Cell(this, self.getName()+"_"+i+"_"+j);				
				linha.add(cell);				
				with (cell.getDiv().style) {
					//width = self.getWidth()+"px";
					width = "100px";
					font = self.getFontSize()+"px "+self.getFont();
					color = self.getFontColor();
					textAlign = self.getTextAlign();
					// the IE dont like of overflow
					if (!document.all) overflow = self.getCellOverflow();
				}				
				with (linha.get(j).getColumn().style) {
					width = self.getCellWidth()+"px";
					height = self.getCellHeight()+"px";
					border = self.getCellBorder()+"px "+self.getCellBorderStyle()+" "+self.getCellBorderColor();
				}								
				
			}
			tbody.appendChild(linha.getRow());
		}
		self.datagrid.appendChild(tbody);
	}
	
	this.pack = function(target) {
		self.mount();
		self.onRowChange();
		document.getElementById(target).appendChild(self.datagrid);	
	}
	
	this.onChange = function() {}
	
}
