/**
 *	config
 */

var path = require('path');

var config = {
	// debug 为true时，用户本地调试
	debug: true,

	name: 'Mall',
	description: '',
	keywords: '',

	//redis
	redis_host: '127.0.0.1',
	redis_port: 6379,
	redis_db:0,

	//程序运行端口
	port: 3000,

	//远程接口
	//server_host: '123.57.254.17',
	server_host: 'api.dai.yuanbaobang.com',
	server_port: 80,

	//TOKEN
	APP_ID: 1001,
	SECRET: '1234567890'
};

module.exports = config;
