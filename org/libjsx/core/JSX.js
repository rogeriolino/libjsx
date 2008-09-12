/** 
 * 
 * JSX Javascript Library 1.0.0
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
 
 var WINDOW_ERROR_ID = "window_error";
 var WINDOW_POPUP_ID = "window_popup";
 var WINDOW_LOADING_ID = "window_loading";
 var WINDOW_BLACKOUT_ID = "window_blackout";
 
window.onerror = function(msg, url, line) {
   var error = "";
   error += "Ocorreu um erro no sistema: \n\n";
   error += "Erro  : " + msg + "\n";
   error += "URL   : " + url + "\n";
   error += "Linha : " + line + "\n\n";
   error += "Por favor contacte o seu administrador.";
   window.alert(error); 
}

var JSX = {

	version: "1.0",
	
	DOM : {
		selectedElement : null
	},
	
	
	import : function(package) {
			var pkgs = package.split(".");
	},
	
	get : function(id) {
		return document.getElementById(id);
	},	
	
	add : function(element) {
   		JSX.getBody().appendChild(element);
	},
	
	getBody : function() {
		return document.getElementsByTagName("body")[0];
	},

	removeBodyChild : function(child) {
	    JSX.getBody().removeChild(child);
	},

	closeError : function() {
	    JSX.removeBlackout();
		JSX.get(WINDOW_ERROR_ID).style.display = "none";
	},

	blackout : function() {
	    var div = document.createElement("div");
	    div.setAttribute("id", WINDOW_BLACKOUT_ID);
	    JSX.getBody().appendChild(div);
	    return div;
	},

	removeBlackout : function() {
	    var div = JSX.get(WINDOW_BLACKOUT_ID);
	    if (div != null) {
	        JSX.removeBodyChild(div);
	    	return true;
	   	}
	   	return false;
	},

	popup : function(w, h) {
		if (w <= 0 || h <= 0) return false;
	    var popup = document.createElement("div");
	    popup.setAttribute("id", WINDOW_POPUP_ID);
	    with (popup.style) {
	        top = "50%";
	        left = "50%";
	        width = w + "px";
	        height = h + "px";
	        position = "absolute";
	        margin = "-"+(h/2)+"px 0px 0px -"+(w/2)+"px";
	    }
	    return true;
	},
		
	removePopup : function() {
	    var div = JSX.get(WINDOW_POPUP_ID);
	    if (div != null) {
	        JSX.removeBodyChild(div);
		    return true;
	    }
	    return false;
	},
		
	createLoading : function(msg) {
	    if (JSX.get(WINDOW_LOADING_ID) == null) {
	        var body = JSX.getBody();
	        var loading = document.createElement("div");
	        loading.setAttribute("id", WINDOW_LOADING_ID);
	        loading.innerHTML = msg;
	        body.appendChild(loading);
	    }
	},
		
	removeLoading : function() {
	    var div = JSX.get(WINDOW_LOADING_ID);
	    if (div != null) {
	        JSX.removeBodyChild(div);
	        return true;
		}
		return false;
	}
		
}

var Event = {
				
	addEvent : function(event, element, callback) {
		if(window.addEventListener) // Mozilla, Netscape, Firefox
		    element.addEventListener(event, callback, false)
		else // IE
		    element.attachEvent(event, callback)
	}

}

var Keyboard = {
		
	ESC      : 27,
	ENTER    : 13,	
	// ARROWS KEY
	LEFT     : 37,
	UP       : 38,
	RIGHT    : 39,
	DOWN     : 40,	
	// FN
	F1       : 112,
	F2       : 113,
	F3       : 114,
	F4       : 115,
	F5       : 116,
	F6       : 117,
	F7	     : 118,
	F8       : 119,
	F9       : 120,
	F10      : 121,
	F11      : 122,
	F12      : 123,
	// Event
	ON_PRESS : (window.addEventListener)?'keypress':'onkeypress',
	ON_DOWN  : '',
	ON_UP    : '',
	
	getKeyCode : function(e) {
		return (window.event)?event.keyCode:e.keyCode;
	},	

}

var Mouse = {
	
	// BUTTONS
	LEFT     : 1,
	RIGHT    : 2,
	CENTER   : 3,	
	// Event
	ON_CLICK     : (window.addEventListener)?'click':'onclick',
	ON_DB_CLICK  : (window.addEventListener)?'dblclick':'ondblclick',
	
}

Object.prototype.pack = function(target, element) {
	document.getElementById(target).appendChild(element);
}
