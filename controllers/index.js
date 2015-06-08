var User = require('../models/user');
var Request = require('../models/request');

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
	Request.get(req, '/longye/manageUserManage/queryUser', {code: 12}, function(data) {
		console.log(data);
	});

	res.send('admin');
	
	//res.redirect('/');
	//res.send('dedecms is my');
};
