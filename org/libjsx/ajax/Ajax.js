/**
 *
 * Ajax Object
 *
 *
 * @author Rogério Alencar Lino Filho
 *
 * http://rogeriolino.wordpress.com/
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
