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
	}

}