

var Cell = function(name) {

	var self = this;
	this.name = name;
	this.input;
	this.div;
	
	this.width = 0;	
	
	this.setName = function(name) {
		self.name = name;
	}
	
	this.getName = function() {
		return self.name;
	}
	
	this.setWidth = function(w) {
		self.width = w;
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
	
	this.createInput = function() {
		var value = (self.div.innerHTML != "&nbsp;")?self.div.innerHTML:"";
		if (document.all) { // if IE then welcome to the gambias
			var name = self.input.name;
			self.input = document.createElement("<input type='text' id='"+self.getName()+"' name='"+self.getName()+"' style='width: "+self.getWidth()+"px;' />");
		} else {			
			self.input.setAttribute('type', 'text');			
			self.input.style.width = self.getCelWidth()+"px";
			self.input.style.height = self.getCelHeight()+"px";
		}
		self.input.setAttribute("value", value);
		self.input.focus();
		self.input.select();
		self.div.innerHTML = "";
	}
	
	this.removeInput = function() {
		if (self.input.getAttribute("type") == "text") {
			if (document.all) { // if IE then welcome to the gambias
				var name = self.input.name;
				var value = (self.input.value != "")?self.input.value:"&nbsp;";
				self.input = document.createElement("<input type='hidden' name='"+name+"' />");
				self.input.setAttribute("value", value);
				self.div.innerHTML = value;
			} else {
				var div = cel.childNodes[1];
				var value = (input.value != "")?input.value:"&nbsp;";
				input.setAttribute("type", "hidden");
				input.value = value;
				div.innerHTML = value;
			}
		}
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

}