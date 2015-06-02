define(function(require, exports, module) {
    var $ = require("jquery");
    var Cookie = require("./Cookie");
    var mobile = require('./mobile');
    //var zepto = require('./frozen');
	//测试js原生继承写法调用
    mo = new mobile();
	mo.test();
	//插件式
	Cookie.read();

});
