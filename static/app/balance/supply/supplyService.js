'use strict';

angular.module('xiaoyuApp.balance')
	.factory('supplyService', ['$http','userId',
		function($http,userId) {
			var getActList = function() {
				var promise = $http({
					url: '/rest/Activity/ListAll',
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


			var getSupplyOrder = function(activityId,countPrice) {
				var uid = userId.getData();
				var promise = $http({
					url: '/rest/Activity/'+uid+'/'+activityId+'/Recharge',
					data:{
						'countPrice':countPrice
					},
					method: 'post'
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
				getActList: getActList,
				getSupplyOrder:getSupplyOrder
			};
		}
	]);