'use strict';

angular.module('xiaoyuApp')


.factory('wcPayService', ['$log',
	function($log) {

		var wcPay = function(payObj, callback) {

			// $http returns a promise, which has a then function, which also returns a promise
			//http://www.xiaoyuchefu.com/weixinpay/pay.jsp?appid="+appid2+"&timeStamp="+timestamp+"&nonceStr="+nonceStr2+"&package="+packages+"&sign="+finalsign
			WeixinJSBridge.invoke('getBrandWCPayRequest', {
				'appId': payObj.appid, //公众号名称，由商户传入
				'timeStamp': payObj.timeStamp, //时间戳
				'nonceStr': payObj.nonceStr, //随机串
				'package': payObj.package, //扩展包
				'signType': 'MD5', //微信签名方式:1.md5
				'paySign': payObj.sign //微信签名
			}, function(res) {
				if (res.err_msg == 'get_brand_wcpay_request:ok') {
					callback.call(this, 'success');
				} else {
					callback.call(this, res.err_msg);
				}
				// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				//因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
			});
		};

		var closeWindow = function() {
			WeixinJSBridge.invoke('closeWindow', {}, function(res) {
				$log.log(res.err_msg);
			});
		};

		return {
			wcPay: wcPay,
			closeWindow: closeWindow
		};
	}
]);

