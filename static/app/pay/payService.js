'use strict';

angular.module('xiaoyuApp.pay')
	.factory('thirdPayService', ['$http', 'orderService',
		function($http, orderService) {

			var getAliPayLink = function(userId, orderId, balance, payType, payAmount,activityId) {
				///rest/Pay/{userId}/{orderId}/balance/{balance}/payType/{payType}/{payAmount}
				//1为微信支付，2为支付宝
				var promise = $http({
					url: '/rest/Pay/' + userId + '/' + orderId + '/balance/' + balance + '/payType/' + payType + '/' + payAmount,
					params:{
						'activityId':activityId	
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


			var getWeChatPayData = function(userId, orderId, balance, payType, payAmount) {
				var promise = $http({
					url: '/rest/Pay/' + userId + '/' + orderId + '/balance/' + balance + '/payType/' + payType + '/' + payAmount,
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

			var getWeChatPayLink = function(userId, orderId, balance, payType, payAmount,activityId) {
				var url = '/rest/Pay/' + userId + '/' + orderId + '/balance/' + balance + '/payType/' + payType + '/' + payAmount+'?activityId='+activityId;
				return url;

			};

			var pointsPay = function(userId, orderId, balance, payType, payAmount,activityId) {
				var promise = $http({
					url: '/rest/Pay/' + userId + '/' + orderId + '/balance/' + balance + '/payType/' + payType + '/' + payAmount,
					params:{
						'activityId':activityId
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

			var offLinePay = function(orderId) {
				// Return the promise to the controller
				var status = 5;
				return orderService.changeOrderStatus(orderId, status);
			};


			return {
				getAliPayLink: getAliPayLink,
				getWeChatPayData: getWeChatPayData,
				offLinePay: offLinePay,
				pointsPay:pointsPay,
				getWeChatPayLink: getWeChatPayLink
			};
		}
	])
	.value('payTypeList', [{
		value: 1,
		label: '支付宝支付'
	}, {
		value: 2,
		label: '微信支付'
	}, {
		value: 3,
		label: '线下支付'
	},
	{
		value: 0,
		label: '余额支付'
	}]);