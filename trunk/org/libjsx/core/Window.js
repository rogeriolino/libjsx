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
var Window = {

	width : (typeof(window.innerWidth)=='number')?window.innerWidth:document.documentElement.clientWidth,	
	height: (typeof(window.innerHeight)=='number')?window.innerHeight:document.documentElement.clientHeight,
	
	getOffsetX: function() {
		return (typeof(window.pageXOffset)=='number')?window.pageXOffset:document.documentElement.scrollLeft;
	},
	getOffsetY: function() {
		return (typeof(window.pageYOffset)=='number')?window.pageYOffset:document.documentElement.scrollTop;
	},
		

}