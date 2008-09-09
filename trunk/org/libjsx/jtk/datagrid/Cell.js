

var Cell = function(datagrid, name) {

	var self = this;
	this.name = name;
	this.input;
	this.div;	
	this.datagrid = datagrid;	
	this.width = datagrid.getCellWidth();

	
	this.setName = function(name) {
		self.name = name;
	}
	
	this.getName = function() {
		return self.name;
	}
	
	this.getWidth = function() {
		return self.width;
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
	
	this.isOpened = function() {
		return (self.input.getAttribute("type") == "text");
	}
	
	this.createInput = function() {
		var value = (self.div.innerHTML != "&nbsp;")?self.div.innerHTML:"";
		if (document.all) { // if IE then welcome to the gambias
			var name = self.input.name;
			self.input = document.createElement("<input type='text' id='"+self.getName()+"' name='"+self.getName()+"' style='width: "+self.getWidth()+"px;' />");
		} else {			
			self.input.setAttribute('type', 'text');			
			self.input.style.width = self.getWidth()+"px";
		}
		self.input.setAttribute("value", value);
		self.input.focus();
		self.input.select();
		self.div.innerHTML = "";
	}
	
	this.removeInput = function() {
		if (self.isOpened()) {
			if (document.all) { // if IE then welcome to the gambias
				var name = self.input.name;
				var value = (self.input.value != "")?self.input.value:"&nbsp;";
				self.input = document.createElement("<input type='hidden' name='"+name+"' />");
				self.input.setAttribute("value", value);
				self.div.innerHTML = value;
			} else {
				var value = (self.input.value != "")?self.input.value:"&nbsp;";
				self.input.setAttribute("type", "hidden");
				self.input.value = value;
				self.div.innerHTML = value;
			}
		}
	}
	
	this.changeForEditable = function(editable) {
		if (editable)
			self.createInput();
		else
			self.removeInput();
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
	
	this.div.ondblclick = function() {
		self.changeForEditable(true);
	}
	
	this.div.onclick = function() {
		self.datagrid.highlightCell();
		self.datagrid.setCurrentCell(self);				
	}
	
	this.input.onkeypress = function(e) {
		var key = (window.event)?event.keyCode:e.keyCode;
		if (key == 13) // <ENTER>
			self.changeForEditable(false);
	}
		

}