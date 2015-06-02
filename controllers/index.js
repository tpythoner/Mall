

exports.index = function(req, res) {
	//res.send('hello, world');
	res.render('', {title: '主页'});
};

exports.update =function(req, res) {
	res.send('dedecms is my');
};
