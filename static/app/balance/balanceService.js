'use strict';

angular.module('xiaoyuApp.balance')
	.factory('balanceService', ['userId', '$http',
		function(userId, $http) {
			var getBalanceRecord = function() {
				var promise = $http({
					url: '/rest/Bill/' + userId.getData() + '/MyBills',
					method: 'get'
				}).then(function(response) {
					// The then function here is an opportunity to modify the response
					console.log(response);
					// The return value gets picked up by the then in the controller.
					return response.data.item;
				});
				// Return the promise to the controller
				return promise;
			};

			return {
				getBalanceRecord: getBalanceRecord
			};
		}
	]);