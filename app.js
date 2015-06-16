/**
 *	Mall - app.js
 * */

var config = require('./config');


var log4js			= require('log4js');
var express			= require('express');
var path			= require('path');
var favicon			= require('serve-favicon');
var logger			= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var ejs				= require('ejs');

var webRouter		= require('./web_router.js');

//We won't need this.
//var logger = require('morgan');
var log = log4js.getLogger("app");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// replace this with the log4js connect-logger
// app.use(logger('dev'));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto', format:':method :url'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRouter);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
	  log.error("Something went wrong:", err);
	  res.status(err.status || 500);
	  res.render('error', {
		  message: err.message,
		  error: err
	  });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    log.error("Something went wrong:", err);
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

if(config.debug) {
	app.listen(config.port, function() {
		log.info('Mall server listening on port ' + config.port);
	});
}

module.exports = app;
