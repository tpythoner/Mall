define(function(require, exports, module) {
    "use strict";
    var $ = require("jquery");
    var mobile = function(){
        this.coins = {'ybc':'元宝币', 'btc':'比特币', 'doge':'狗狗币', 'ltc':'莱特币'};
    }

    mobile.prototype.returnJson = function(url, type, async){ 
        type = arguments[1] ? arguments[1] : 'post';
        async = arguments[2] ? arguments[2] : false;
        var rJson = $.ajax({
            type: type,
            url: url,
            data:'',
            dataType: "json",
            async: async,
            success: function(data){
                return data;
            }
        });
        return rJson.responseJSON;
    }

    mobile.prototype.getcoinsUrl = function(){
        var urlArgs = window.location.search;
        if(urlArgs){
            urlArgs = urlArgs.split('?')[1].split("=");
            var urlJson = {'coin': urlArgs[1]};
        }else{
            var urlJson = {'coin': 'nocoins'}
        }
        return urlJson;
    }

    mobile.prototype.getsendUrl = function(){
        var urlsend = window.location.search;
        if(urlsend){
            urlsend = urlsend.split('?')[1].split("&");
            return {'tags': urlsend[0].split("=")[1], 'address': urlsend[1].split("=")[1]};
        }else{
            return {'tags': 'null'}
        }
    }

    mobile.prototype.ajaxPost = function(data, url, type, async){
        var postData = $.ajax({
            type: type,
            url: url,
            data:data,
            dataType: "json",
            async: async,
            success: function(jsonData){
                return jsonData;
            }   
        });
        return postData.responseJSON;
    }

    mobile.prototype.sendmsg = function(data) {
        $.post("/user_center/sendmsg",data,function(){});
        return true;
    }

    var wait=60;
    mobile.prototype.time = function time(obj) {
        if (wait == 0) {
            wait = 60;
            $(obj).html("重新发送");
        } else {
            $(obj).html("重新发送(" + wait + ")");
            wait--;
            setTimeout(function() {
                time(obj)
            },
            1000)
        }
    }

    mobile.prototype.hode8num = function(floatvar) {
        var f_x = parseFloat(floatvar);
        if (isNaN(f_x))
        {
        //alert('function:changeTwoDecimal->parameter error');
        return false;
        }
        var f_x = Math.floor(floatvar*10000)/10000;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0)
        {
        pos_decimal = s_x.length;
        s_x += '.';
        }
        while (s_x.length <= pos_decimal + 4)
        {
        s_x += '0';
        }
        return s_x;
    }

    //提示type: warn、info、success 
    mobile.prototype.tips = function(type, message){
        $("body").prepend('<div class="ui-poptips ui-poptips-'+type+'" style="display:none;"><div class="ui-poptips-cnt"><i></i> '+message+'</div></div>');
        $('.ui-poptips').slideDown('fast').delay(1500).slideUp('fast', function(){$(this).remove()});
    }

    //单个按钮弹窗
    mobile.prototype.onedialog = function(title, message){
        $('body').append('<div class="ui-dialog show"><div class="ui-dialog-cnt"><div class="ui-dialog-bd"><h4>'+title+'</h4><div>'+message+'</div></div><div class="ui-dialog-ft ui-btn-group"><button type="button" id="hide_reg">确定</button></div></div></div>');
        $('#hide_reg').click(function(){
            $('.ui-dialog').remove();
        });
        return true;
    }

	mobile.prototype.test = function() {
		alert('test mobile');
	}


    module.exports = mobile;
});
