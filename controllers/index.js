var User = require('../models/user');

exports.index = function(req, res) {
	//res.send('hello, world');
	User.getUserName('tony', function(data) {
		console.log(data.code);
	});
	res.render('', {title: '主页'});
};

exports.update =function(req, res) {
	res.send('dedecms is my');
};
