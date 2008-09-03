/**
 *
 * Javascript Colored Code (JsCC) v 0.1
 *
 * This script convert all <pre> tags, with class name "code", in a "colored code"
 * following the Tokens list (keywords) below.
 *
 * The style of the code displayed (in the HTML) can be changed easily in the CSS file (jscc.css).
 *
 * (languages supported: Java, Javascript)
 *
 * @author Rogério Alencar Lino Filho
 *	
 * http://rogeriolino.wordpress.com/
 *
 *
 * TODO: convert to OOP
 *
 *
 */


/*
*
*	TOKENS
*
*/
var KEYWORDS = "abstract and array Array as break case catch clone const continue declare default die do echo else elseif empty eval exception exit extends final for foreach function global if implements include interface isset new or print println private super protected public require return static switch this throw try use var while class void true false null int char double System out window alert";

var TOKENS = KEYWORDS.split(" ");

// END TOKENS

var entrada = "";
var saida = "";
var posicao = 0;
var proximoCaracter = "";
var tokenReconhecido = "";


function reconheceToken() {
	for (var i=0; i<TOKENS.length; i++) {
		if (TOKENS[i] == tokenReconhecido) {
			return true;
		}
	}
	return false;
}

function leProxCaractere() {
	proxCaractere = entrada.charAt(posicao++);
}

function inicio() {
	try {
		leProxCaractere();
		if (proxCaractere == "/") {
			tokenReconhecido += proxCaractere;
			leProxCaractere();
			if (proxCaractere == "*") {
				tokenReconhecido += proxCaractere;
				leProxCaractere();
				comentario();
			} else if (proxCaractere == "/") {
				tokenReconhecido += proxCaractere;
				leProxCaractere();
				comentario_simples();
			}
		}
		
		if (proxCaractere == "\"") {
			tokenReconhecido += proxCaractere;
			leProxCaractere();
			string();
		}

		if (proxCaractere == "\'") {
			tokenReconhecido += proxCaractere;
			leProxCaractere();
			char();
		}
		
		if ((proxCaractere == '*') || (proxCaractere == ')') || (proxCaractere == '{') || (proxCaractere == '}') || (proxCaractere == '=') || (proxCaractere == '==') || (proxCaractere == '+') || (proxCaractere == '-') || (proxCaractere == '-')) {
			delimitadores();
			leProxCaractere();
		}
		
		if ((proxCaractere == " ") || (proxCaractere == "\n") || (proxCaractere == "\t") || (proxCaractere == '.')  || (proxCaractere == '(') || (proxCaractere == ';')) {
			if (reconheceToken()) {
				tokenReconhecido = "<span class='kwd'>"+tokenReconhecido+"</span>";
			}
			if ((proxCaractere == '.') || (proxCaractere == '(') || (proxCaractere == ';')) {
				delimitadores();
			} else {
				tokenReconhecido += proxCaractere;
				saida += tokenReconhecido;
				tokenReconhecido = "";
			}
		} else {
			tokenReconhecido += proxCaractere;		
		}
		
		inicio();
		
	} catch(e) {
		proxCaractere = "EOF";
	}
}

function delimitadores() {
	saida += tokenReconhecido+"<span class='dlm'>"+proxCaractere+"</span>";
	tokenReconhecido = "";
}

function string() {	
	if (proxCaractere == "\"") {
		tokenReconhecido += proxCaractere;
		tokenReconhecido = "<span class='str'>"+tokenReconhecido+"</span>";
		saida += tokenReconhecido;
		tokenReconhecido = "";
		leProxCaractere();
	} else {
		tokenReconhecido += proxCaractere;
		leProxCaractere();
		string();
	}
}

function char() {	
	if (proxCaractere == "\'") {
		tokenReconhecido += proxCaractere;
		tokenReconhecido = "<span class='chr'>"+tokenReconhecido+"</span>";
		saida += tokenReconhecido;
		tokenReconhecido = "";
		leProxCaractere();
	} else {
		tokenReconhecido += proxCaractere;
		leProxCaractere();
		char();
	}
}

function comentario() {	
	if (proxCaractere == "*") {
		tokenReconhecido += proxCaractere;
		leProxCaractere();
		if (proxCaractere == "/") {
			tokenReconhecido += proxCaractere;
			tokenReconhecido = "<span class='cmt2'>"+tokenReconhecido+"</span>";
			saida += tokenReconhecido;
			tokenReconhecido = "";
			leProxCaractere();
		} else {
			tokenReconhecido += proxCaractere;
			leProxCaractere();
			comentario();
		}
	} else {
		tokenReconhecido += proxCaractere;
		leProxCaractere();
		comentario();
	}
}

function comentario_simples() {
	if (proxCaractere == "\n") {
		tokenReconhecido = "<span class='cmt1'>"+tokenReconhecido+"</span>";
		saida += tokenReconhecido;
		tokenReconhecido = "";
	} else {
		leProxCaractere();
		tokenReconhecido += proxCaractere;
		comentario_simples();
	}
}

function limpa() {
	entrada = "";
	saida = "";
	posicao = 0;
	proximoCaracter = "";
	tokenReconhecido = "";
}

function JsCC_convert() {
	var pre = document.getElementsByTagName("pre");
	for (var i=0; i<pre.length; i++) {
		if ((pre[i].getAttribute("class") == "code") || (pre[i].className == "code")) {
			entrada = pre[i].innerHTML+" ";
			inicio();
			if (document.all) {
				// o IE após a mudança não reconhece as quebras de linha (\n) e tabulações (\t)
				// então substui por tags HTML ("\n" por "<br />" e "\t" por "&nbsp;" - espaços em branco)
				saida = saida.replace(/\n/g, "<br />");
				saida = saida.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			}
			pre[i].innerHTML = saida;
			limpa();
		}
	}
}