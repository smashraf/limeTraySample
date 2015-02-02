var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$=$;
module.exports=Backbone.Router.extend({
	routes: {
        "": "home",
       "test": "testRoute",
    },
    home:function(){
    	
    },
    testRoute:function(){
    	alert("hey");
    }
});
