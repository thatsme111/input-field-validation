window.Validation = new (function(){
	// contains set of rules can be accessed using Rule.Empty(element)
	this.Rule = {};

	// method to add extra rule to existing set of rules
	this.addRule = function(rule, action){
		window.Validation.Rule[rule] = action;
	};

	// attach listener to execute rules for elements in register
	this.addRegister = function(register){
		register.element.addEventListener(register.action, function(){
			var elements = document.querySelectorAll("[validation-"+register.name+"]");
			for(i=0; i<elements.length; i++){
				var rule = elements[i].getAttribute("validation-"+register.name);
				var RuleExecuter = {
					"execute": Validation.Rule[rule],
					"message": elements[i].getAttribute("validation-message")
				};
				if(RuleExecuter.execute(elements[i])){
					console.log(RuleExecuter.message);
				}
			}
		});
	};
})();

/* 
 * find trigger-validation attribute 
 * create register and add it to global validation object
 */
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
// process arguments
window.Validation.addRule("empty", function(element){
	if(element.value == ""){
		this.message = "This is improtatnt field which cannot be empty"
		return true;
	}
	else
		return false;
});

window.Validation.addRule("password", function(element){
	if(element.value.length < 6){
		this.message = "password length should be atleast 6 digit"
		return true;
	}
	else
		return false;
});
