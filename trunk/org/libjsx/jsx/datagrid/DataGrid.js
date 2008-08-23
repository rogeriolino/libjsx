/**
 *
 * DataGrid v 0.1
 *
 *
 * @author Rogério Alencar Lino Filho
 *
 * http://rogeriolino.wordpress.com/
 *
 */

var DataGrid = function(lin, col) {

	/**
	  * TODO: criar objeto Cell
	  *
	  */

	var self = this;
	// if not will set a name, a random name is maked
	this.name = "datagrid"+Math.floor(Math.random()*99)+Math.floor(Math.random()*99);
	
	this.linhas = lin;
	this.colunas = col;
	this.width;
	this.height;
	this.font = "Sans-serif";
	this.font_size = "12";
	this.font_color = "#000000";
	this.text_align = "left";
	this.cel_width;	
	this.cel_height;
	this.cel_atual = null;
	this.cel_atual_border_color = "#FF0000";
	this.cel_overflow = "hidden";
	this.cel_border_px = "1";
	this.cel_border_color = "#CCCCCC";
	this.cel_border_style = "solid";
	this.linha_atual = null;
	this.linha_bg_selected = "#F1F1F1";
	this.linha_bg_default = "#FFFFFF";
	
	this.datagrid = document.createElement("table");
	with (this.datagrid) {
		style.border = "1px solid #000000";
		style.cursor = "default";
		cellSpacing = "0";
	}
	
	this.mount = function() {
		var linha;
		var coluna;
		var input;
		var div;
		var thead = document.createElement("thead");
		if (document.all) {
			thead.appendChild(document.createElement("<input type='hidden' id='"+self.getName()+"_rows' name='"+self.getName()+"_rows' value='"+self.linhas+"' />"));
			thead.appendChild(document.createElement("<input type='hidden' id='"+self.getName()+"_cols' name='"+self.getName()+"_cols' value='"+self.colunas+"' />"));
		} else {
			var n_linhas = document.createElement("input");
			n_linhas.setAttribute("type", "hidden");
			n_linhas.setAttribute("id", self.getName()+"_rows");
			n_linhas.setAttribute("name", self.getName()+"_rows");
			n_linhas.setAttribute("value", self.linhas);
			
			var n_colunas = document.createElement("input");
			n_colunas.setAttribute("type", "hidden");
			n_colunas.setAttribute("id", self.getName()+"_cols");
			n_colunas.setAttribute("name", self.getName()+"_cols");
			n_colunas.setAttribute("value", self.colunas);
			
			thead.appendChild(n_linhas);			
			thead.appendChild(n_colunas);
		}
		self.datagrid.appendChild(thead);
		var tbody = document.createElement("tbody");
		for (var i=0; i<self.linhas; i++) {
			linha = document.createElement("tr");
			linha.style.background = self.getRowBg();
			for (var j=0; j<self.colunas; j++) {
				if (document.all) { // if IE then welcome to the gambias
					input = document.createElement("<input type='hidden'  id='"+self.getName()+"_"+i+"_"+j+"'  name='"+self.getName()+"_"+i+"_"+j+"' />");
				} else {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("id", self.getName()+"_"+i+"_"+j);
					input.setAttribute("name", self.getName()+"_"+i+"_"+j);
				}
				input.setAttribute("type", "hidden");
				div = document.createElement("div");
				div.innerHTML = "&nbsp;";
				with (div.style) {
					width = self.getCelWidth()+"px";
					font = self.getFontSize()+"px "+self.getFont();
					color = self.getFontColor();
					textAlign = self.getTextAlign();
					// the IE dont like of overflow
					if (!document.all) overflow = self.getCelOverflow();
				}
				coluna = document.createElement("td");
				coluna.appendChild(input);
				coluna.appendChild(div);
				with(coluna.style) {
					width = self.getCelWidth()+"px";
					height = self.getCelHeight()+"px";
					border = self.getCelBorderPx()+"px "+self.getCelBorderStyle()+" "+self.getCelBorderColor();
				}
				linha.appendChild(coluna);
			}
			tbody.appendChild(linha);
		}
		self.datagrid.appendChild(tbody);
	}
	
	this.setName = function(name) {
		self.name = name;
	}
	
	this.getName = function() {
		return self.name;
	}
	
	this.setSize = function(w, h) {
		self.setWidth(w);
		self.setHeight(h);
	}
	
	this.setWidth = function(w) {
		self.width = w;
		self.datagrid.style.width = w+"px";
	}
	
	this.getWidth = function() {
		return self.width;
	}
	
	this.setHeight = function(h) {
		self.height = h;
		self.datagrid.style.height = h+"px";
	}
	
	this.getHeight = function() {
		return self.height;
	}
	
	this.setFont = function(font) {
		self.font = font;
	}
	
	this.getFont = function() {
		return self.font;
	}
	
	this.setFontSize = function(size) {
		self.font_size = size;
	}
	
	this.getFontSize = function() {
		return self.font_size;
	}
	
	this.setFontColor = function(color) {
		self.font_color = "#000000";
	}
	
	this.getFontColor = function() {
		return self.font_color;
	}
	
	this.setTextAlign = function(align) {
		self.text_align = align;
	}
	
	this.getTextAlign = function() {
		return self.text_align;
	}
	
	this.setCel = function(lin, col, content) {
		var cel = self.getCel(lin, col);
		var input = cel.childNodes[0];
		var div = cel.childNodes[1];
		input.value = content;
		div.innerHTML = content;
	}
	
	this.setCelSize = function(w, h) {
		self.setCelWidth(w);
		self.setCelHeight(h);
	}
	
	this.setCelWidth = function(w) {
		self.cel_width = w;
	}
	
	this.getCelWidth = function() {
		return self.cel_width;
	}
	
	this.setCelHeight = function(h) {
		self.cel_height = h;
	}
	
	this.getCelHeight = function() {
		return self.cel_height;
	}
	
	this.setCelOverflow = function(is) {
		if (is)
			self.cel_overflow = "hidden";
		else
			self.cel_overflow = "none";
	}
	
	this.getCelOverflow = function() {
		return self.cel_overflow;
	}
	
	this.setCelBorder = function(px, color) {
		self.setCelBorderPx(px);
		self.setCelBorderColor(color);
	}
	
	this.setCelBorderPx = function(px) {
		self.cel_border_px = px;
	}
	
	this.setCelBorderColor = function(color) {
		self.cel_border_color = color;
	}
	
	this.getCelBorderPx = function() {
		return self.cel_border_px;
	}
	
	this.getCelBorderColor = function() {
		return self.cel_border_color;
	}
	
	this.getCelBorderStyle = function() {
		return self.cel_border_style;
	}
	
	this.setCurrentCel = function(cel) {
		var anterior = self.getCurrentCel();
		if (anterior != null)
			anterior.style.borderColor = self.getCelBorderColor();
		self.cel_atual = cel;
	}
	
	this.getCurrentCel = function() {
		return self.cel_atual;
	}
	
	this.setCelHighLightColor = function(color) {
		self.cel_atual_border_color = color;
	}
	
	this.getCelHighLightColor = function() {
		return self.cel_atual_border_color
	}
	
	this.highlightCel = function() {
		self.cel_atual.style.borderColor = self.getCelHighLightColor();
	}
	
	this.setCurrentRow = function(row) {
		var anterior = self.getCurrentRow();
		if (anterior != null)
			anterior.style.background = self.getRowBg();
		self.linha_atual = row;
	}
	
	this.getCurrentRow = function() {
		return this.linha_atual;
	}
	
	this.onRowChange = function() {
		var linhas = self.getRows();
		for (var i=0; i<linhas.length; i++) {
			linhas[i].onmousedown = function() {
				self.setCurrentRow(this);
				self.removeInput();
				this.style.background = self.getRowSelectedBg();
			}
		}
	}
	
	this.onDoubleClick = function() {
		var colunas;
		var linhas = self.getRows();
		for (var i=0; i<linhas.length; i++) {
			colunas = self.getCols(i);
			for (var j=0; j<colunas.length; j++) {
				colunas[j].onclick = function() {
					self.setCurrentCel(this);
					self.highlightCel();
				}
				colunas[j].ondblclick = function() {
					self.setCurrentCel(this);
					self.highlightCel();
					self.changeForEditable(this, true);
				}
				colunas[j].onkeypress = function(e) {
					var key = (window.event)?event.keyCode:e.keyCode;
					if (key == 13) // <ENTER>
						self.changeForEditable(this, false);
				}
			}
		}
	}
	
	this.changeForEditable = function(cel, editable) {
		if (editable)
			self.createInput(cel);
		else
			self.removeInput();
	}
	
	this.createInput = function(cel) {
		var div = cel.childNodes[1];
		var value = (div.innerHTML != "&nbsp;")?div.innerHTML:"";
		var input = cel.childNodes[0];
		if (document.all) { // if IE then welcome to the gambias
			var name = input.name;
			cel.innerHTML = "";
			input = document.createElement("<input type='text' id='"+name+"' name='"+name+"' style='width: "+self.getCelWidth()+"px; height: "+self.getCelHeight()+"px;' />");
			input.setAttribute("value", value);
			cel.appendChild(input);
			cel.appendChild(div);
			input.focus();
			input.select();			
		} else {			
			input.setAttribute('type', 'text');
			input.setAttribute("value", value);
			input.style.width = self.getCelWidth()+"px";
			input.style.height = self.getCelHeight()+"px";
			input.focus();
			input.select();
			div.innerHTML = "";
		}
	}
	
	this.removeInput = function() {
		if (self.getCurrentCel() != null) {
			var cel = self.getCurrentCel();
			var input = cel.childNodes[0];
			if (input.getAttribute("type") == "text") {
				if (document.all) { // if IE then welcome to the gambias
					var name = input.name;				
					var div = cel.childNodes[1];
					cel.innerHTML = "";
					var value = (input.value != "")?input.value:"&nbsp;";
					input = document.createElement("<input type='hidden' name='"+name+"' />");
					input.setAttribute("value", value);
					div.innerHTML = value;
					cel.appendChild(input);
					cel.appendChild(div);
				} else {
					var div = cel.childNodes[1];
					var value = (input.value != "")?input.value:"&nbsp;";
					input.setAttribute("type", "hidden");
					input.value = value;
					div.innerHTML = value;
				}
			}
		}
	}

	this.getRows = function() {
		return self.datagrid.getElementsByTagName("tr");
	}
	
	this.getRow = function(lin) {
		var linhas = self.getRows();
		return linhas[lin];
	}
	
	this.getCols = function(lin) {
		var linha = self.getRow(lin);
		return linha.getElementsByTagName("td");
	}
	
	this.getCel = function(lin, col) {
		var colunas = self.getCols(lin);
		return colunas[col];
	}
	
	this.setRowBg = function(color) {
		self.linha_bg_default = color;
	}
	
	this.getRowBg = function() {
		return self.linha_bg_default;
	}
	
	this.setRowSelectedBg = function(color) {
		self.linha_bg_selected = color;
	}
	
	this.getRowSelectedBg = function() {
		return self.linha_bg_selected;
	}
	
	this.pack = function(target) {
		self.mount();
		self.onRowChange();
		self.onDoubleClick();
		document.getElementById(target).appendChild(self.datagrid);	
	}
	
	this.onChange = function() {}
	
}