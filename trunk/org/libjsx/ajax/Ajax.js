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
var Ajax = function(t) {

    var self = this;
    this.target = t;
    this.xmlhttp = null;

    this.createObjectRequest = function() {
        var xml = null;
	    if (window.XMLHttpRequest)
		    xml = new XMLHttpRequest();
	    else if (window.ActiveXObject)
		    xml = new ActiveXObject("Microsoft.XMLHTTP");
        return xml;
    }
    
    this.getTarget = function() {
        return self.target;
    }    
    
    this.getUrlVars = function() {
	    var url = window.location.href;
	    vars = url.split("?")[1];
	    return vars;
    }
    

}

/*
 * Codifica os parametros no Object.
 */
Ajax.encodePostParameters = function(obj) {
    var param = "";
    for (k in obj) {
        param += k + "=" + encodeURI(obj[k]) + "&";
    }
    return param.substring(0, param.length-1);
}

Ajax.simpleLoad = function(url, id, method, params, loading) {
    var t1 = new Target(url, id);
    var ajaxList = new AjaxList();    
    ajaxList.setMethod(method);
    ajaxList.setShowLoading(loading);
    ajaxList.setParameters(params);
    ajaxList.add(new Ajax(t1));
    ajaxList.loadURLs();
}

/**
 *
 * AjaxList Object
 *
 * Objeto usado para guardar as resquisicoes em uma fila
 * e executa-las, para que nao nenhuma se perca.
 *
 */ 
var AjaxList = function() {

    var self = this;
    this.queue = Array();
    this.method = "GET";
    this.parameters = "";
    this.showLoading = false;
    
    this.setMethod = function(m) {
        self.method = m;
    }
    
    this.getMethod = function() {
        return self.method;
    }
    
    this.setParameters = function(p) {
        self.parameters = p;
    }
    
    this.getParameters = function() {
        return self.parameters;
    }
    
    this.setShowLoading = function(b) {
        self.showLoading = (b == true);
    }
    
    this.add = function(ajax) {
        self.queue.push(ajax);
    }
    
    this.get = function() {
        return self.queue.shift();
    }    
    
    this.loadURLs = function() {
        var ajax = self.get();
        var target = ajax.getTarget();
        var xmlhttp = ajax.createObjectRequest();
        
        if (xmlhttp != null) {
	        xmlhttp.onreadystatechange = function() {
		        if (xmlhttp.readyState == 4) {
	                if (xmlhttp.status == 200) {
	                    if (target.getId() != "") {
    		                var tag = document.getElementById(target.getId());
    		                if (tag != null) tag.innerHTML = xmlhttp.responseText;    		                
                        }
                        window.removeLoading();
		                if (self.queue.length > 0) {
		                    setTimeout(self.loadURLs, 100);
		                }
	                }
                }
	        }
	        if (self.showLoading) {
    	        window.createLoading();
    	    }
	        var method = self.getMethod();
	        if (method == "GET") {
    	        xmlhttp.open(method, target.getURL(), true);
	            xmlhttp.send(null);
	        }
	        else if (method == "POST") {
	            var p = self.getParameters();
	            xmlhttp.open(method, target.getURL(), true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.setRequestHeader("Content-length", p.length);
                xmlhttp.setRequestHeader("Connection", "close");
                xmlhttp.send(p);
	        }	        
	        return true;
	    }
        return false;
    }

}

/**
 * 
 * Target Object 
 * 
 * Contem a url a ser aberta e o id do tag html
 * alvo aonde sera carregado o conteudo da url
 */ 
var Target = function(url, id) {

    var self = this;
    this.url = url;
    this.id = id;
    
    this.getURL = function() {
        return self.url;
    }
    
    this.getId = function() {
        return self.id;
    }

}