/** 
 * 
 * DataGrid Javascript Component 1.2.0
 *
 * Copyright (C) 2008  Rogério Alencar Lino Filho
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *  
 */
var DataGrid = function(lin, col) {

	var self = this;
	this.name = "libjsx-datagrid";
	this.titles = new Array(col);	
	this.rows = new Array(lin);
	
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
	this.datagrid.cellSpacing = "0";
		
	this.setName = function(name) {
		self.name = name;
	}
	
	this.getName = function() {
		return self.name;
	}
	
	this.setTitle = function(i, content) {
		var cell = self.getTitle(i);
		cell.setValue(content);
	}
	
	this.getTitle = function(i) {
		if (i >=0 && i < self.titles.length)
			return self.titles[i];
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
			var cell = new Cell(this, self.getName()+"_title_"+i , i);
			cell.setEditable(false);
			if (l >= self.chars.length) { k++; l = 0; }
			if (k >= self.chars.length) k = 0;
			cell.setValue(self.getTitleValue(l, k));
			l++;
			linha.add(cell);
			linha.last().setTitle(true);
			self.titles[i] = cell;			
		}
		thead.appendChild(linha.getRow());
		self.datagrid.appendChild(thead);
		var tbody = document.createElement("tbody");
		// body
		for (var i=0; i<self.rows.length; i++) {
			linha = new Row(self, i);
			self.rows[i] = linha;
			for (var j=0; j<col; j++) {
				var cell = new Cell(this, self.getName()+"_"+i+"_"+j, j);
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
	
	this.onPress = function(e) {
		if (JSX.selectedElement === self) {
			var key = Keyboard.getKeyCode(e);
		    if (self.getCurrentCell() && self.getCurrentColumn() && self.getCurrentRow()) {		    
			    var ri = self.getCurrentRow().getIndex();
		    	var ci = self.getCurrentColumn().getCell().getIndex();
			    if (key == Keyboard.ENTER) {
			  		self.getCurrentCell().toggle();
			    } 
			    else if (!self.getCurrentCell().isOpened()) {
				    if (key == Keyboard.LEFT && ci > 0)
				    	ci--;		    	
				    if (key == Keyboard.UP && ri > 0)
	  				    ri--;
				    if (key == Keyboard.RIGHT && ci < self.getCurrentRow().getSize()-1)
				    	ci++;
				    if (key == Keyboard.DOWN && ri < self.getRows().length-1)
					    ri++;
				    self.setCurrentRow(self.getRow(ri));
				    self.setCurrentColumn(self.getRow(ri).get(ci));
				    self.setCurrentCell(self.getCurrentColumn().getCell());
			    }
		    }
	    }	
	}
	
	Event.addEvent(Mouse.ON_CLICK, this.datagrid, 
		function() { 
			JSX.selectedElement = self; 
		}
	);
	Event.addEvent(Keyboard.ON_PRESS, document, this.onPress);
	
	
	this.pack = function(target) {
		self.mount();    
	    Object.pack(target, self.datagrid);
	}
	
	// events
	this.onChangeRow = function() {}
	this.onChangeCell = function() {}	
	
}

/**
 * Row
 *
 */
var Row = function(datagrid, i) {

	var self = this;
	this.index = i;
	this.datagrid = datagrid;
	this.cols = new Array();
	this.title = false;
	
	this.row = document.createElement("tr");
	this.row.className = self.datagrid.ROW_CLASS;
	
	this.onClick = function() {
		if (!self.isTitle())
			self.datagrid.setCurrentRow(self);
	}
	
	Event.addEvent(Mouse.ON_CLICK, this.row, this.onClick);
	
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

/**
 * Column
 *
 */ 
var Column = function(datagrid, cell) {

	var self = this;
	this.cell = cell;
	this.title = false;
	this.datagrid = datagrid;
	this.col = document.createElement("td");
	this.col.appendChild(cell.getInput());
	this.col.appendChild(cell.getDiv());
	this.col.className = self.datagrid.COLUMN_CLASS;
	
	this.onClick = function() {
		if (!self.isTitle()) {
			self.datagrid.setCurrentColumn(self);
			self.datagrid.setCurrentCell(self.getCell());
		}		
	}
	
	Event.addEvent(Mouse.ON_CLICK, this.col, this.onClick);
	
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

/**
 * Cell
 *
 */ 
var Cell = function(datagrid, name, i) {

	var self = this;
	this.index = i;
	this.name = name;
	this.input;
	this.div;	
	this.datagrid = datagrid;
	this.editable = true;	
	
	this.setName = function(name) {
		self.name = name;
	}
	
	this.getName = function() {
		return self.name;
	}
	
	this.setIndex = function(i) {
		self.index = i;
	}
	
	this.getIndex = function() {
		return self.index;
	}
	
	this.getDiv = function() {
		return self.div;
	}
	
	this.getInput = function() {
		return self.input;
	}
		
	this.getValue = function() {
		return self.input.value;
	}
	
	this.setValue = function(v) {
		self.input.value = v;
		self.div.innerHTML = v;
	}
	
	this.isEditable = function() {
		return self.editable;
	}
	
	this.setEditable = function(e) {
		self.editable = e;
	}
	
	this.isOpened = function() {
		return (self.input.getAttribute("type") == "text");
	}
	
	this.showInput = function() {
		if (!self.isOpened() && self.isEditable()) {
			var value = (self.div.innerHTML != "&nbsp;")?self.div.innerHTML:"";
			self.input.setAttribute('type', 'text');
			self.input.focus();
			self.input.select();
			self.setValue(value);
			self.div.style.display = "none";
		}
	}
	
	this.hideInput = function() {
		if (self.isOpened()) {
			var value = (self.input.value != "")?self.input.value:"&nbsp;";
			self.input.setAttribute("type", "hidden");
			self.setValue(value);
			self.div.style.display = "block";
		}
	}
	
	this.toggle = function() {
		if (!self.isOpened())
			self.showInput();
		else
			self.hideInput();
	}	
	
	
	if (document.all) { // if IE then welcome to the gambias
		this.input = document.createElement("<input type='hidden'  id='"+self.getName()+"'  name='"+self.getName()+"' />");
	} else {
		this.input = document.createElement("input");
		this.input.setAttribute("type", "hidden");
		this.input.setAttribute("id", self.getName());
		this.input.setAttribute("name", self.getName());
	}
	this.input.setAttribute("type", "hidden");
	this.div = document.createElement("div");
	this.div.innerHTML = "&nbsp;";
	this.div.className = self.datagrid.CELL_CLASS;
	
	this.onDoubleClick = function() {
		if (self.isEditable())
			self.toggle();
	}
	
	Event.addEvent(Mouse.ON_DBL_CLICK, this.div, this.onDoubleClick);
	
	this.onClick = function() {
		if (self.isEditable()) {
			self.datagrid.closeLastCell();
			self.datagrid.setCurrentCell(self);
		}
	}
	
	Event.addEvent(Mouse.ON_CLICK, this.div, this.onClick);
	
}
