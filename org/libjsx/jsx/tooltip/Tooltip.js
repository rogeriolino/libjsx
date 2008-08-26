/**
 *
 * Javascript Tooltip
 *
 * @author Rogerio Alencar Lino Filho
 * @url http://rogeriolino.wordpress.com
 *
 */
 

var Tooltip = function(id) {

	var self = this;

	this.id = id;
	this.background = "#000000";
	this.border = "1px solid #999999";
	this.display = "none";
	this.font = "10px Verdana, Arial, Sans-serif";
	this.color = "#ffffff";
	this.marginX = 13; //distancia do mouse em x
	this.marginY = 5; //distancia do mouse em y
	this.opacity = 75; // 0 a 100
	this.padding = "2px 5px";
	this.position = "absolute";
	this._x = -10;
	this._y = -10;
	
	this.tip = document.createElement("div");
	this.tip.setAttribute("id", this.id);	
	
	this.setStyle = function() {
		with (self.tip.style) {
			background = self.background;
			border = self.border;
			display = self.display;
			font = self.font;
			color = self.color;
			opacity = self.opacity/100;
			filter = "alpha(opacity=" + self.opacity + ")";
			padding = self.padding;
			position = self.position;
		}
	}
	
	this.start = function() {
		var body = document.getElementsByTagName("body")[0];
		body.appendChild(self.tip);
		self.setStyle();
		self.setDocumentLinks();
	}
	
	this.setDocumentLinks = function() {
		var links = document.getElementsByTagName("a");		
		for (i=0; i<links.length; i++) {
			var title = links[i].getAttribute("title");
			if (title) {
				links[i].setAttribute("tptitle", title);
				links[i].removeAttribute("title");
				links[i].onmouseover = function() { 
					self.showTip(this.getAttribute("tptitle") + "<br />" + this.href); 
				}
			} else {
				links[i].onmouseover = function() {
					self.showTip(this.href);
				}
			}
			links[i].onmouseout = function() { 
				self.hideTip();
			}
		}
	}	
	
	this.setPos = function(event) {
		if (document.all) { // IE
			self._x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
			self._y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
			self._x += (window.event.clientX + self.marginX);
			self._y += (window.event.clientY + self.marginY);
		} else { // Smart Browsers
			self._x = (event.pageX + self.marginX);
			self._y = (event.pageY + self.marginY);
		}
	}
	
	this.showTip = function(text) {
		self.tip.style.display = "block";
		document.onmousemove = function(event) {
			self.setPos(event);
			self.tip.innerHTML = text;
			self.tip.style.left = self._x + "px";
			self.tip.style.top = self._y + "px";
		}
	}
	
	this.hideTip = function() {
		self.tip.style.display = "none";
	}	
	
	
}
