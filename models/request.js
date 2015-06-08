var http = require('http');
var config = require('../config');
var qs = require('querystring');


// post请求
exports.post = function(req, url, data, callback) {	
	var content = qs.stringify(data);
	
	var options = {  
	    hostname: config.server_host,  
	    port: config.server_port,  
	    path: url,  
	    method: 'POST',  
	    headers: req.headers
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

	req.write(content);  
	req.end(); 
};

//get请求
exports.get = function(req, url, data, callback) {
	var content = qs.stringify(data);  
  
	var options = {  
   		hostname: config.server_host,
    	port: config.server_port,  
    	path: url + '?' + content,  
    	method: 'GET',
		headers: req.headers
	};

	var req = http.request(options, function (res) {  
		res.setEncoding('utf8');
		var data = '';
		res.on('data', function (d) {
			data += d;
		}).on('end', function() {
			data = JSON.parse(data);
			return callback(null, data);
		});
	}).on('error', function (e) {  
    	console.log('problem with request: ' + e.message);  
	});  
  
	req.end();
};
