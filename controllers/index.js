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

exports.update =function(req, res) {
	var proxy = new EventProxy();
	
	Request.get(req, '/longye/manageUserManage/queryUser', {code: 12}, function(data) {
		proxy.emit("get", data);
	});
	Request.get(req, '/longye/manageUserManage/queryUser', {code: 12}, function(data) {
		proxy.emit("result", data);
	});

	proxy.all("get", 'result', function (gets, result) {
	    console.log(gets);
		console.log(result);
	});
	res.send('admin');
	
	//res.redirect('/');
	//res.send('dedecms is my');
};
