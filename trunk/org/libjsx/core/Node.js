/** 
 * 
 * JSX Javascript Library 0.0.1
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
Node.new = function(tagname) {
	var el = document.createElement(tagname);
	//if (el instanceof HTMLUnknownElement)
	//	throw("Could not be create the element. Invalid tag name: " + tagname + "."); 
	return el;
} 

Node.prototype.add = function(el) {
	this.appendChild(child);
}

Node.prototype.dispose = function() { 
	var node = element.parentNode;
   	node.parentNode.removeChild(element);
}

Node.prototype.show = function() { 
	this.style.display = "block";
}

Node.prototype.hide = function() { 
	this.style.display = "";
}

Node.prototype.drag = function() {
	/**
	 * TODO: get element offset (x and y)
	 */
	var element = this;
	element._ELEMENT_CLICKED_ = false;
	Event.addEvent(Mouse.ON_DOWN, this, 
			function(e) {
				if (e.button == Mouse.LEFT)
					element._ELEMENT_CLICKED_ = true;
			}
	);
	Event.addEvent(Mouse.ON_RELEASE, document, 
			function(e) {
				if (e.button == Mouse.LEFT)
					element._ELEMENT_CLICKED_ = false; 
			}
	);  
	Event.addEvent(Mouse.ON_MOVE, document, 
			function(e) {
				e = e?e:window.event; 
				if (element._ELEMENT_CLICKED_) {
					with (element.style) {
						top = (e.clientY - 10) + "px";
						left = (e.clientX - 10) + "px";
						position = "absolute";					 	
					}
				} 
			}
	);		
		
}

Node.prototype.alpha = function(a) {
	if (a >= 0.0 && a <= 1.0) {			
		with (this.style) {
			opacity = a;
			filter = "opacity(alpha="+(a*100)+")";
		}
	}
}
