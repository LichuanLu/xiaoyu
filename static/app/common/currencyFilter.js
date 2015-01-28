'use strict';
angular.module('xiaoyuApp')
	.filter('zhcnformat', [
		function() {
			return function(price) {
				// return '￥ ' + price;
				return price+' 元';
			};
		}
	]);