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
var Mouse = {

	// BUTTONS
	LEFT     : 0,
	CENTER   : 1,
	RIGHT    : 2,
		
	// Event
	ON_CLICK     : (window.addEventListener)?'click':'onclick',
	ON_DBL_CLICK : (window.addEventListener)?'dblclick':'ondblclick',	
	ON_RELEASE   : (window.addEventListener)?'mouseup':'onmouseup',	
	ON_DOWN      : (window.addEventListener)?'mousedown':'onmousedown',
	ON_MOVE      : (window.addEventListener)?'mousemove':'onmousemove',
	
}