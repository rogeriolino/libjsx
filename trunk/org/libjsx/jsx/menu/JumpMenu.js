/**
 * 
 * Jump Menu
 *
 *
 * @author Rogerio Alencar Lino Filho
 *
 * Para criar um jump menu basta criar um vetor 
 * contendo os itens do menu, no qual sao vetores
 * de duas posicoes (na primeira o link, e na segunda o rotulo).
 * E depois adicionar a algum elemento HTML 
 * atraves do id do mesmo.
 *
 */
 
var JumpMenu = function(_itens) {

	var self = this;
	this.opened = false;
	this.focus = false;

	this.itens = Array(_itens.length);
	this.jump = document.createElement('div');
	this.label = document.createElement('span');
	this.ul = document.createElement('ul');

	this.setLabel = function(label) {
		self.label.innerHTML = label;
	}

	this.getLabel = function(label) {
		return self.label.innerHTML;
	}

	this.setItem = function(i, item) {
		self.itens[i].setAttribute('href', item[0])
		self.itens[i].innerHTML = item[1];
	}

	this.getItem = function(i) {
		return Array(self.itens[i].getAttribute('href'), self.itens[i].innerHTML);
	}

	this.addItem = function(_item) {
		var item = document.createElement('a');
		item.setAttribute('href', _item[0]);
		item.onmousedown = function() {
			window.open(this.getAttribute('href'), '_self');
		}
		item.onmouseup = self.toogle;
		item.innerHTML = _item[1];
		self.itens[i] = item;
		return item;
	}

	this.toogle = function() {
		self.ul.style.display = (self.opened)?'none':'block';
		self.opened = !self.opened;
	}

	this.pack = function(target) {
		document.getElementById(target).appendChild(this.jump);
	}

	// construct
	this.jump.setAttribute('id', 'jump_menu');
	this.label.onmousedown = self.toogle;
	this.label.innerHTML = 'Jump Menu';
	this.jump.appendChild(this.label);
	this.ul.style.display = 'none';
	for (var i=0; i<_itens.length; i++) {
		var li = document.createElement('li');
		li.appendChild(this.addItem(_itens[i]));
		this.ul.appendChild(li);
	}
	this.jump.appendChild(this.ul);

	this.jump.onmouseover = function() {
		self.focus = true;
	}

	this.jump.onmouseout = function() {
		self.focus = false;
	}

	// pega o body
	var doc = document.getElementsByTagName('body')[0];
	// guarda o atual onmousedown do body
	var doc_onclick = doc.onmousedown;
	// adiciona acao de fechar o menu ao clicar fora
	doc.onmousedown = function() {
		doc_onclick;
		if (!self.focus && self.opened)
			self.toogle();
	}

}
