var User = require('../models/user');

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

	console.log(req.params.opt);
	console.log(req.query.names);
	res.redirect('http://www.baidu.com');
	res.send('dedecms is my');
};
