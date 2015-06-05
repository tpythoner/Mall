
exports.getUserName = function(title, callback) {
	if(title.length === 0) {
		return callback(null, []);
	}
	return callback({'title': title});
};

exports.getUserId = function(id, callback) {
	if(id.length === 0) {
		return callback(null, []);
	}
	return callback({'id':id});
}
