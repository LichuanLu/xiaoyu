'use strict';

angular.module('xiaoyuApp')


.factory('validateService', [
		function() {

			var carNoValidate = function(input) {
				return /^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$/.test(input);
			};

			var mobileValidate = function(input) {
				return /^\d{11}$/.test(input);
			};


			return {
				carNoValidate: carNoValidate,
				mobileValidate:mobileValidate
			};
		}
	])
	.value('validateMessage', {
		'emptyInputError': '输入不能为空',
		'carNoInputError': '车牌号格式不对，请参考 京A88888',
		'mobileInputError': '手机号必须是11位数字'
	});