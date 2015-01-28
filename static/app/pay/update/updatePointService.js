'use strict';

//car related service
angular.module('xiaoyuApp.pay')
	.factory('updatePayPointService', ['$rootScope',
		function($rootScope) {
			var payPoint;

			var broadcast = function(payPoint) {
				$rootScope.$broadcast('updatePayPoint.update', payPoint);
			};
			var update = function(point) {
				payPoint = point;
				broadcast(payPoint);
			};
			var getPayPoint = function() {
				return payPoint;
			};
			return {
				update: update,
				getPayPoint: getPayPoint

			};
		}
	]);