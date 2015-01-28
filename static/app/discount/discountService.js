'use strict';

//car related service
angular.module('xiaoyuApp.discount')
	.factory('discountService', ['$log','$http','userId',
		function($log,$http,userId) {

			var getDiscountList = function(orderId) {
				// $http returns a promise, which has a then function, which also returns a promise
					var id = userId.getData();
					var url;
					
					var promise = $http({
						url: '/rest/Activity/user/' + id + '/ListAll',
						params:{
							'orderId':orderId
						},
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
				getDiscountList: getDiscountList
			};
		}
	]);
