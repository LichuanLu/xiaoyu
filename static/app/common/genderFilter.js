'use strict';
angular.module('xiaoyuApp')
	.filter('zhGenderformat', [
		function() {
			return function(gender) {
				if(gender == 1){
					return '男';
				}else if(gender == 2){
					return '女';
				}else{
					return '';
				}
			};
		}
	]);