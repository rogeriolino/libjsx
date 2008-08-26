/**
 *
 * BarChart v 0.1
 *
 *
 * @author Rogério Alencar Lino Filho
 *
 * http://rogeriolino.wordpress.com/
 *
 */

var BarChart = function(n) {

	this.barras = n;
	var head = document.getElementsByTagName("head").item(0);
	head.appendChild(this.addStyle());
	this.moldura = document.createElement("div");
	this.moldura.setAttribute("id", "grafico_barras");
	this.titulo = document.createElement("h2");
	this.fonte = document.createElement("p");
	this.fonte.innerHTML = "Fonte:";
	this.moldura.appendChild(this.titulo);
	this.ul = document.createElement("ul");

	for (var i=0; i<n; i++) {
		var barra = document.createElement("li");
		var link = document.createElement("a");
		var label = document.createElement("span");
		link.setAttribute("id", "barra"+i);
		link.setAttribute("href", "#");
		link.style.background = this.getColor();
		link.style.cursor = "pointer"; // for ie
		label.setAttribute("id", "label"+i);
		label.style.position = "absolute";
		link.appendChild(label);
		barra.appendChild(link);
		this.ul.appendChild(barra);
	}
	this.moldura.appendChild(this.ul);
	this.moldura.appendChild(this.fonte);
	var body = document.getElementsByTagName("body").item(0);
	body.appendChild(this.moldura);
}


BarChart.prototype.getColor = function() {
	var r = Math.round(Math.random()*99);
	r = (r<=9)?"0"+r:r;
	var g = Math.round(Math.random()*99);
	g = (g<=9)?"0"+g:g;
	var b = Math.round(Math.random()*99);
	b = (b<=9)?"0"+b:b;
	return "#"+r+g+b;
}

BarChart.prototype.setSize = function(size) {
	this.moldura.style.width = size;
}

BarChart.prototype.getSize = function() {
	return this.moldura.style.width;
}

BarChart.prototype.setTitle = function(title) {
	this.getTitle().innerHTML = title;
}

BarChart.prototype.getTitle = function() {
	return this.moldura.getElementsByTagName("h2").item(0);
}

BarChart.prototype.setSource = function(source) {
	this.getSource().innerHTML = source;
}

BarChart.prototype.getSource = function() {
	return this.moldura.getElementsByTagName("p").item(0);
}

BarChart.prototype.getBarra = function(n) {
	return document.getElementById("barra"+n);
}

BarChart.prototype.getLabel = function(n) {
	return document.getElementById("label"+n);
}

BarChart.prototype.setBarraLabel = function(n, name) {
	var label = this.getLabel(n);
	var barra = this.getBarra(n);
	label.style.width = this.getSize();
	label.innerHTML = name;
	barra.setAttribute("title", name+" - "+this.getBarraSize(n));
}

BarChart.prototype.setBarraSize = function(n, size) {
	var barra = this.getBarra(n);
	barra.style.width = size;
}

BarChart.prototype.getBarraSize = function(n, size) {
	var barra = this.getBarra(n);
	return barra.style.width;
}

BarChart.prototype.setBarraLink = function(n, url) {
	var barra = this.getBarra(n);
	barra.setAttribute("href", url);
}
