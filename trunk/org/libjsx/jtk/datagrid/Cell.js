
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
	
	this.div.ondblclick = function() {
		if (self.isEditable())
			self.toggle();
	}
	
	this.div.onclick = function() {
		if (self.isEditable()) {
			self.datagrid.closeLastCell();
			self.datagrid.setCurrentCell(self);
		}
	}
	

}
