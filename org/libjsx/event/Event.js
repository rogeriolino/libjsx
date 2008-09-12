
var Event = {
				
	addEvent : function(event, element, callback) {
		if(window.addEventListener) // Mozilla, Netscape, Firefox
		    element.addEventListener(event, callback, false)
		else // IE
		    element.attachEvent(event, callback)
	}

}