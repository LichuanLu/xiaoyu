'use strict';

angular.module('xiaoyuApp.pay')
	.controller('paySuccessController', ['$scope', '$log', '$stateParams', '$location', 'CaptureService',
		'$templateCache', 'userId', 'wcPayService',
		function($scope, $log, $stateParams, $location, CaptureService, $templateCache, userIdService, wcPayService) {
			$log.log('paySuccessController init');
			// var userOrderId = $stateParams.userOrderId;
			// if(userOrderId){
			// 	var userId = userOrderId.split('_')[0];
			// 	var orderId = userOrderId.split('_')[1];
			// 	userIdService.setData(userId);

			// }
			//init order page
			$scope.initLayout = function() {
				// var leftContent = $templateCache.get('/static/app/common/homeBtn.tpl.html');
				var title = '<span>支付成功</span>';
				// var rawContent = $templateCache.get('/static/app/pay/linkMyOrder.tpl.html');
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', '', $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			//link to record page
			$scope.linkMyOrderAction = function() {
				$location.path('/record/' + userIdService.getData()+'/list');
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