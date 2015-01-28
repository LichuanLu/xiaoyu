'use strict';

//prevent link behavior
angular.module('xiaoyuApp')
	.directive('a', function() {
		return {
			restrict: 'E',
			link: function(scope, elem, attrs) {
				if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
					elem.on('click', function(e) {
						e.preventDefault();
					});
				}
			}
		};
	});