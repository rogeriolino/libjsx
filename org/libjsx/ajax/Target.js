/**
 * 
 * Target Object 
 * 
 * Contem a url a ser aberta e o id do tag html
 * alvo aonde sera carregado o conteudo da url
 *
 * @author Rogério Alencar Lino Filho
 *
 * http://rogeriolino.wordpress.com/
 *
 */
 
var Target = function(url, id) {

    var self = this;
    this.url = url;
    this.id = id;
    
    this.getURL = function() {
        return self.url;
    }
    
    this.getId = function() {
        return self.id;
    }

}