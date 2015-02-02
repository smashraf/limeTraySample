var path=require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var express = require('express');
module.exports.serverConfing=function(app){
	app.set('views', path.join(__dirname, 'views'));
	app.engine('handlebars', exphbs({defaultLayout: 'main',partialsDir: [
        'views/partials/'
    ]}));
	app.set('view engine', 'handlebars');
	// uncomment after placing your favicon in /public
	//app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname,'public')));
	//app.use(express.static(path.join(__dirname, 'public')));
}

