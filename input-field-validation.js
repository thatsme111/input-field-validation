window.Validation = new (function(){
	this.Rule = {};
	this.addRule = function(rule, action){
		window.Validation.Rule[rule] = action;
	};
	this.addRegister = function(register){
		register.element.addEventListener(register.action, function(){
			var elements = document.querySelectorAll("[validation-"+register.name+"]");
			for(i=0; i<elements.length; i++){
				var rule = elements[i].getAttribute("validation-"+register.name);
				if(Validation.Rule[rule](elements[i])){
					var message = elements[i].getAttribute("validation-message");
					console.log(message);
				}					
			}
		});
	};
})();

addEventListener("DOMContentLoaded", function(){
	var registers = document.querySelectorAll("[trigger-validation]");
	for(i=0; i<registers.length; i++){
		var attribute = registers[i].getAttribute("trigger-validation").split(":");
		var register = {
			element: registers[0],
			name: attribute[0],
			action: attribute[1]
		};
		Validation.addRegister(register);
	}
});

// add validation rules
// process or arguments
window.Validation.addRule("empty", function(element){
	if(element.value == "")
		return true;
	else
		return false;
});