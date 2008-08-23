/**
 *
 * Colorpicker version 0.1
 *
 * @author Rogerio Alencar Lino Filho
 *
 * http://rogeriolino.wordpress.com
 *
 */


var ColorPicker = function(left, top) {

	var self = this;
	this.visible = false;
	this.currentColor = "#000000";
	this.cpicker = document.createElement("div");
	this.cpicker.setAttribute("class", "colorpicker");
	this.cpicker.className = "colorpicker";
	
	this.tabela = document.createElement("div");
	this.display = document.createElement("span");
	this.display.onmousedown = function() {
		self.setVisible(false);
	}
	this.display.onmouseover = function() {
		self.onRollOver(self.getColor());
	}
	
	this.list = document.createElement("ul");
	this.input = document.createElement("input");
	this.input.setAttribute("maxlength", "7");
	
	var hexa = Array("00", "33", "66", "99", "CC", "FF");
	
	this.setVisible = function(v) {
		if (!v) {
			self.visible = false;
			self.cpicker.style.display = "none";
		} else {
			self.visible = true;
			self.cpicker.style.display = "block";
		}
	}
	
	this.onRollOver = function(value) {
		self.input.value = value;
		self.setDisplay(value);
	}
	
	this.setDisplay = function(value) {
		self.display.style.background = value;
	}
	
	this.setPosition = function(x, y) {
		self.cpicker.style.position = "absolute";
		self.cpicker.style.top = y+"px";
		self.cpicker.style.left = x+"px";
	}
	
	this.setColor = function(color) {
		self.currentColor = color;
	}
	
	this.getColor = function() {
		return self.currentColor;
	}
	
	this.onChange = function() {}
	
	this.onRelease = function() {
		self.setVisible(false);
		self.onChange();
	}
		
	this.pack = function(alvo) {
		document.getElementsByTagName("body")[0].appendChild(this.cpicker);
	}

	for (var i=0; i<hexa.length; i++) {
		for (var j=0; j<hexa.length; j++) {
			for (var k=0; k<hexa.length; k++) {
				var cor = document.createElement("a");
				cor.style.background = "#" + hexa[i] + hexa[j] + hexa[k];
				cor.setAttribute("title", "#" + hexa[i] + hexa[j] + hexa[k]);
				cor.onmouseover = function() {
					self.onRollOver(this.getAttribute("title"));
				}
				cor.onmousedown = function() {
					self.setColor(this.getAttribute("title"));
					self.onRelease();
				}
				var listItem = document.createElement("li");
				listItem.appendChild(cor);
				self.list.appendChild(listItem);
			}
		}
	}
	
	this.tabela.appendChild(this.display);
	this.tabela.appendChild(this.input);
	this.tabela.appendChild(this.list);	
	this.cpicker.appendChild(this.tabela);	
	
	this.setVisible(this.visible);
	this.setPosition(left, top);
	this.pack();
}
