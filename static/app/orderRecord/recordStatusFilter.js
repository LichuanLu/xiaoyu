'use strict';
angular.module('xiaoyuApp.record')
	.filter('recordFormat', [

		function() {
			return function(status) {
				var res = '';
				//未支付=1，已支付=2，服务中=3，服务完成=4，订单已取消=6，现今支付=5
				switch (status) {
					case 1:
						res = '等待支付';
						break;
					case 2:
						res = '已支付';
						break;
					case 3:
						res = '服务中';
						break;
					case 4:
						res = '服务完成';
						break;
					case 5:
						res = '现金支付';
						break;
					case 6:
						res = '订单已取消';
						break;
					case 7:
						res = '点评完成';
						break;
				}
				return res;
			};
		}
	]);