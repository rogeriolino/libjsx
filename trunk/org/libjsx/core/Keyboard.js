
var Keyboard = {
	
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
	
	getKeyCode : function(e) {
			return (window.event)?event.keyCode:e.keyCode;
		},
	
	addEvent : function(callback) {
		var oldonkeypress = document.onkeypress;
		document.onkeypress = function(e) {
			if (oldonkeypress != null) 
				oldonkeypress();
			callback(e);
		}
	}

}