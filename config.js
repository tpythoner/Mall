/**
 *	config
 */

var path = require('path');

var config = {
	// debug 为true时，用户本地调试
	debug: false,

	name: 'Mall',
	description: '',
	keywords: '',

	//redis
	redis_host: '127.0.0.1',
	redis_port: 6379,
	redis_db:0,

	//程序运行端口
	port: 3000,

	//远程借口
	server_host: '192.168.1.222',
	server_port: 80,
};

module.exports = config;
