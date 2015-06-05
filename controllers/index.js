var User = require('../models/user');

exports.index = function(req, res) {
	//res.send('hello, world');
	User.getUserName('', function(data) {
		console.log(data);
	});
	res.render('', {title: '主页'});
};

exports.update =function(req, res) {
	res.send('dedecms is my');
};
