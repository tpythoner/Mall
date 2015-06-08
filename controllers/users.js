
exports.index = function(req, res) {
	console.log(req.params.name);
	console.log(req.query.name);
	res.send(req.query.name);
} 
