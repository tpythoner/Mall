
exports.getUserName = function(name, callback) {
	console.log(name.length);
	if(name.length === 0) {
		return callback(null, []);
	}
	return callback({code: 8});
};
