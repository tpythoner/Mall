var User = require('../models/user');
var Request = require('../models/request');
var EventProxy = require('eventproxy');

exports.index = function(req, res) {
	var iData = User.getUserName('tony', function(data) {
		return data;
	});
	var iId = User.getUserId('12576', function(data) {
		return data;
	});
	res.render('', {'title': iData.title, 'id': iId.id});
};

exports.update =function(req, res, next) {
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
	});
	res.send('admin');
	
	//res.redirect('/');
	//res.send('dedecms is my');
};
