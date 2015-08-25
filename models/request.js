var http = require('http');
var config = require('../config');
var qs = require('querystring');
var Log = require('log4js').getLogger("request");


// GET TOKEN
exports.token = function(callback) {
	data = {app_id : config.APP_ID, secret : config.SECRET}
	var content = qs.stringify(data);

	var options = {
		hostname : config.server_host,
		port : config.server_port,
		path : '/oauth2/access_token?grant_type=client_credential&' + content,
		method : 'GET'
	};

	var req = http.request(options, function (res) {
		res.setEncoding('utf8');
		var data = '';
		res.on('data', function (d) {
			data += d;
		}).on('end' , function(){
			data = JSON.parse(data);
			return callback(null, data);
		});
	}).on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	req.end();
};

// post请求
exports.post = function(token, url, data, callback) {
	var content = qs.stringify(data);

	var options = {
	    hostname : config.server_host,  
	    port : config.server_port,  
	    path : url + '?app_id=' + config.APP_ID + '&access_token=' + token.access_token,
	    method : 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	        "Content-Length": content.length
	    }
	};

	var req = http.request(options, function (res) {
		res.setEncoding('utf8');
		var data = '';
		res.on('data', function (d) {
			data += d;
		}).on('end' , function() {
			data = JSON.parse(data);
			return callback(null, data);
		});
	}).on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(content);
	req.end();
};


// get请求
exports.get = function(token, url, data, callback) {
	var content = qs.stringify(data);

	var options = {
		hostname : config.server_host,
		port : config.server_port,
		path : url + '?app_id=' + config.APP_ID + '&access_token=' + token.access_token + '&' + content,
		method : 'GET'
	};

	var req = http.request(options, function (res) {
		res.setEncoding('utf8');
		var data = '';
		res.on('data', function (d) {
			data += d;
		}).on('end' , function(){
			data = JSON.parse(data);
			return callback(null, data);
		});
	}).on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	req.end();
};
