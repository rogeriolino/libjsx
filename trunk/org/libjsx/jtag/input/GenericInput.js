
var GenericInput = function() {

}

GenericInput.createInput = function(type, value) {
	var input = document.createElement("input");
	input.setAttribute("type", type);
	input.setAttribute("value", value);
	return input;
}