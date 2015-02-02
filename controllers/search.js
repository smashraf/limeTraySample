module.exports = function() {
  return{
  	processSearchRequest:function(req,res){
  		res.render('search',{type:'searchResult'});
  	}
  }

}