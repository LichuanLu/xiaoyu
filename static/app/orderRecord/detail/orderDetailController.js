'use strict';

angular.module('xiaoyuApp.record')
	.controller('orderDetailController', ['$scope', '$state', '$stateParams', '$log', '$location', '$templateCache', '$rootScope', '$filter',
		'CaptureService', 'orderService', 'orderDetailService', 'userId',
		function($scope, $state, $stateParams, $log, $location, $templateCache, $rootScope, $filter,
			CaptureService, orderService, orderDetailService, userIdService) {
			$log.log('orderDetailController init');
			$scope.bswizardData = [];
			$scope.orderObj = '';

			//是否显示洗车员信息
			$scope.showWasher = false;

			if (!$scope.isUndefined($stateParams.orderId)) {
				orderService.getOrder($stateParams.orderId).then(function(data) {
					//状态栏
					var result = orderDetailService.generateBswizardData(data);
					if (result) {
						$scope.bswizardData = result;
					}

					//订单Obj是否存在washer
					 // "washer":{
				  //     "id":"1",
				  //     "name": "刘伟光",
				  //     "phone": "18601391001"
				  //   },
				  	if(data.washer && data.washer.hasOwnProperty('id') && data.washer.id){
				  		$scope.showWasher = true;
				  	}

					//未支付=1，已支付=2，服务中=3，服务完成=4，订单已取消=6，现今支付=5，订单已删除=9）
					if (data.status == 1 || data.status == 2 || data.status == 3) {
						$scope.orderObj = data;
						var showPay = 'true';
						if (data.status == 2 || data.status == 3) {
							showPay = 'false';
						}
						$state.go('record.detail.confirm', {
							'showPay': showPay
						});

						// $state.go('order', {
						// 	'userId': userIdService.getData(),
						// 	'showState':true,
						// 	'orderId':$stateParams.orderId
						// });
					} else {

						$scope.orderObj = data;
						if (data.status == 4 || data.status == 7) {
							$log.log('go order finish page');
							$state.go('record.detail.finish');
						} else {
							$log.log('error:order status error');
						}
					}

				});
			}
			//init order detail page
			$scope.initLayout = function() {
				var content = '';
				var title = '<span>订单详情</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.initLayout();

		}
	]);