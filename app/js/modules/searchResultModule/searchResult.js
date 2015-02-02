var $ = require('jquery');
var template = require("./templates/test.hbs");
var router=require('./router/searchResultRouter');
var Backbone = require('backbone');
Backbone.$=$;
module.exports = function() {
	return{
		init:function(){
			this.createNampeSpace();
			this.bindEvents();
			console.log(searchResult);
			console.log(router);
			searchResult.router=new router();
			this.StartPageHistory();
		},
		bindEvents:function(){
			var self=this;
			var count = 1;
			$(window).scroll(function(){
				if  ($(window).scrollTop() == $(document).height() - $(window).height()){
						count++;
					 	self.loadMoreSearchResult(count);
				}
			});

		},
		loadMoreSearchResult:function(count){
		$("#searchResults__results--js").append(template);
		},
		createNampeSpace:function(){
			window.searchResult={};
		},
		
		StartPageHistory:function(){
			Backbone.history.start();
			searchResult.router.navigate("test",{ trigger:true, replace: true });
		}
	}
	

};