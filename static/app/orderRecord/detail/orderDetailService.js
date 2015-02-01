'use strict';

angular.module('xiaoyuApp.record')
	//order service
	.factory('orderDetailService', ['$http','userId',
		function($http,userIdService) {
			var generateBswizardData = function(orderObj) {
				var result;
				//未支付=1，已支付=2，服务中=3，服务完成=4，订单已取消=6，现今支付=5，订单已删除=9）
				if (orderObj.status && orderObj.status != 6 && orderObj.status != 9) {
					//没有考虑订单取消或删除的情况，不应该出现在里面
					var completeIndex = 0;
					if (orderObj.status == 2) {
						completeIndex = 1;
					} else if (orderObj.status == 3) {
						completeIndex = 2;
					} else if (orderObj.status == 4 || orderObj.status == 7) {
						completeIndex = 3;
					}
					result = [{
						'title': '',
						'content': '确认订单',
						'status': 'complete',
						'column': 3
					}, {
						'title': '',
						'content': '完成支付',
						'status': 'complete',
						'column': 3

					}, {
						'title': '',
						'content': '开始服务',
						'status': 'complete',
						'column': 3

					}, {
						'title': '',
						'content': '完成订单',
						'status': 'complete',
						'column': 3

					}];
					result[completeIndex].status = 'active';
					while (completeIndex < 3) {
						result[completeIndex + 1].status = 'disabled';
						completeIndex++;
					}

				}
				return result;
			};


			var submitComment = function(orderId, comment, score) {
				///rest/order/:userId/:orderId/comment
				var url = '/rest/order/' + userIdService.getData() + '/' + orderId + '/comment';
				var promise = $http({
					url: url,
					method: 'post',
					data:{
						'comment':comment,
						'score':score
					}
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
				generateBswizardData: generateBswizardData,
				submitComment: submitComment
			};
		}
	]);