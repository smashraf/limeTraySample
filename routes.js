var indexController=require('./controllers/index');
var searchController=require('./controllers/search');
module.exports.router = function(app) {
  app.get('/',function(req,res){
    indexController().getHompage(req,res);
  });
  app.get('/home',function(req,res){
    res.redirect('/');
  });
  app.post('/search',function(req,res){
  	console.log('************************************');
  	console.log(req.body);
	console.log('************************************');
    searchController().processSearchRequest(req,res);

  })
}
