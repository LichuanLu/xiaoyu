'use strict';

angular.module('xiaoyuApp.pay')
	.controller('supplySuccessController', ['$scope', '$log', '$stateParams', '$location', 'CaptureService',
		'$templateCache', 'userId', 'wcPayService',
		function($scope, $log, $stateParams, $location, CaptureService, $templateCache, userIdService, wcPayService) {
			$log.log('supplySuccessController init');
			// var userOrderId = $stateParams.userOrderId;
			// if(userOrderId){
			// 	var userId = userOrderId.split('_')[0];
			// 	var orderId = userOrderId.split('_')[1];
			// 	userIdService.setData(userId);

			// }
			//init order page
			$scope.initLayout = function() {
				// var leftContent = $templateCache.get('/static/app/common/homeBtn.tpl.html');
				var title = '<span>充值成功</span>';
				// var rawContent = $templateCache.get('/static/app/pay/linkMyOrder.tpl.html');
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', '', $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			//link to record page
			$scope.linkMyOrderAction = function() {
				$location.path('/record/' + userIdService.getData());
			};

			$scope.linkWashAction = function() {
				$location.path('/order/' + userIdService.getData());
			};

			$scope.linkHomeAction = function() {
				$location.path('/order/' + userIdService.getData());
				// wcPayService.closeWindow();
				// $window.location.href = 'http://xiaoyuchefu.com/index.html';
			};


			$scope.initLayout();



		}
	]);