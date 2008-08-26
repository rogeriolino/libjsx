/**
 *
 * AjaxList Object
 *
 * Objeto usado para guardar as resquisicoes em uma fila
 * e executa-las, para que nao nenhuma se perca.
 *
 * @author Rogério Alencar Lino Filho
 *
 * http://rogeriolino.wordpress.com/
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