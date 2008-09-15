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

var WINDOW_ERROR_ID = "window_error";
var WINDOW_POPUP_ID = "window_popup";
var WINDOW_LOADING_ID = "window_loading";
var WINDOW_BLACKOUT_ID = "window_blackout";


var JSX = {

	version: "0.0.1",
	
	DOM : {
		selectedElement : null
	},
	
	get : function(id) {
		return document.getElementById(id);
	},
	
	onerror : function(msg, url, line) {
	   var error = "";
	   error += "Ocorreu um erro no sistema: \n\n";
	   error += "Erro  : " + msg + "\n";
	   error += "URL   : " + url + "\n";
	   error += "Linha : " + line + "\n\n";
	   error += "Por favor contacte o seu administrador.";
	   window.alert(error); 
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
	    var div = Node.new("div");
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

window.onerror = JSX.onerror;

Object.prototype.pack = function(target, element) {
	document.getElementById(target).appendChild(element);
}
