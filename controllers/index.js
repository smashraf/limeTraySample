var apiManager = require('../apiManager')
module.exports = function() {
  return{
  	getHompage:function(req,res){
  		res.render('index', { title: 'Express' })
  	},
  	getLoginPage:function(req,res){
  		res.render('index', { title: 'Express login' })
  	}
  }

}
