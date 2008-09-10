
var Cell = function(datagrid, name) {

	var self = this;
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
		var value = (self.div.innerHTML != "&nbsp;")?self.div.innerHTML:"";
		if (document.all) { // if IE then welcome to the gambias
			var name = self.input.name;
			self.input = document.createElement("<input type='text' id='"+self.getName()+"' name='"+self.getName()+"' style='width: "+self.datagrid.getCellWidth()+"px; height: "+self.datagrid.getCellHeight()+"px;' />");
			self.input.setAttribute("value", value);
		} else {			
			self.input.setAttribute('type', 'text');			
			self.input.style.width = self.datagrid.getCellWidth()+"px";
			self.input.style.height = self.datagrid.getCellHeight()+"px";
		}		
		self.input.focus();
		self.input.select();
		self.setValue(value);
		self.div.style.display = "none";
	}
	
	this.hideInput = function() {
		if (self.isOpened()) {
			if (document.all) { // if IE then welcome to the gambias
				var name = self.input.name;
				var value = (self.input.value != "")?self.input.value:"&nbsp;";
				self.input = document.createElement("<input type='hidden' name='"+name+"' />");
				self.input.setAttribute("value", value);
				self.div.innerHTML = value;
				self.setValue(value);
			} else {
				var value = (self.input.value != "")?self.input.value:"&nbsp;";
				self.input.setAttribute("type", "hidden");
				self.setValue(value);
			}
			self.div.style.display = "block";
		}
	}
	
	this.changeForEditable = function(editable) {
		if (editable)
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
	this.div.style.width = self.datagrid.getCellWidth()+"px";
	this.div.style.height = self.datagrid.getCellHeight()+"px";
	this.div.className = self.datagrid.CELL_CLASS;
	
	this.div.ondblclick = function() {
		if (self.isEditable())
			self.changeForEditable(true);
	}
	
	this.div.onclick = function() {
		if (self.isEditable()) {
			self.datagrid.closeLastCell();
			self.datagrid.setCurrentCell(self);
		}
	}
	
	this.input.onkeypress = function(e) {
		var key = (window.event)?event.keyCode:e.keyCode;
		if (key == 13) // <ENTER>
			self.changeForEditable(false);
	}

}
