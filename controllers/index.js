var User = require('../models/user');
var Request = require('../models/request');
var EventProxy = require('eventproxy');
var Log = require('log4js').getLogger("index");

exports.index = function(req, res, next) {
	var iData = User.getUserName('tony', function(data) {
		return data;
	});
	var iId = User.getUserId('12576', function(data) {
		return data;
	});

	var proxy = new EventProxy();
	proxy.fail(next);

	Request.get(req, '/', {}, function(err, data) {
		proxy.emit("result", data);
	})

	proxy.all('result', function (result) {
		console.log(result);
		res.render('', {'title': result.errmsg, 'id': iId.id});
	});

};

exports.update = function(req, res, next) {
	console.log(req.params.opt);
	console.log(req.query.names);
	//console.log(req.body.);
	//解决异步调用的问题
	var proxy = new EventProxy();
	proxy.fail(next);
	
	Request.get(req, '/longye/manageUserManage/queryUser', {code: 12}, proxy.done('get', function(data) {
		//proxy.emit("get", data);
		return data;
	}));
	/*	proxy调用方式
	fs.readFile('foo.txt', ep.done('content', function (content) {
	  return content.trim();
	}));

	// equal to =>

	fs.readFile('foo.txt', function (err, content) {
	  if (err) {
		return ep.emit('error', err);
	  }
	  ep.emit('content', content.trim());
	});
	*/
	Request.get(req, '/longye/manageUserManage/queryUser', {code: 12}, function(err, data) {
		proxy.emit("result", data);
	});

	Request.get(req, '/longye/manageUserManage/queryUser', {code: 12}, proxy.done('three'));
	
	/*proxy调用方式
	fs.readFile('foo.txt', ep.done('content'));

	// equal to =>

	fs.readFile('foo.txt', function (err, content) {
	  if (err) {
		return ep.emit('error', err);
	  }
	  ep.emit('content', content);
	});
	*/
	proxy.all("get", 'result', 'three', function (gets, result, three) {
	    console.log(gets);
		console.log(result);
		console.log(three);
		res.render('update', {title:'admin'});
	});
	//res.send('admin');
	
	//res.redirect('/');
	//res.send('dedecms is my');
};
