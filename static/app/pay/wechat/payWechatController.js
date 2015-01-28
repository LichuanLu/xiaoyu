'use strict';

angular.module('xiaoyuApp.pay')
	.controller('payWechatController', ['$scope', '$log', '$window', '$stateParams', '$location', 'CaptureService',
		'$templateCache', 'userId', 'wcPayService',
		function($scope, $log, $window, $stateParams, $location, CaptureService, $templateCache, userIdService, wcPayService) {
			$log.log('payWechatController init');
			// var userOrderId = $stateParams.userOrderId;
			// if(userOrderId){
			// 	var userId = userOrderId.split('_')[0];
			// 	var orderId = userOrderId.split('_')[1];
			// 	userIdService.setData(userId);

			// }

			$scope.params = $location.search();
			// $scope.appId = params.appid;
			// $scope.timeStamp = params.timeStamp;
			// $scope.nonceStr = params.nonceStr;
			// $scope.packageValue = params.package;
			// $scope.paySign = params.sign;

			$scope.$on('$viewContentLoaded', function() {
				$log.log('pay wechat view loaded');
				// $log.log($location.search().appid);
				if ($scope.params.appid && $scope.params.timeStamp && $scope.params.nonceStr && $scope.params.package && $scope.params.sign) {
					wcPayService.wcPay($scope.params, function(res) {
						if (res === 'success') {
							$location.path('/pay/success/' + userIdService.getData());
						} else {
							alert(res);
						}

					});
				}else{
					alert('支付出现问题，请重试或者联系客服');
				}

			});

			//init order page
			$scope.initLayout = function() {
				// var leftContent = $templateCache.get('/static/app/common/homeBtn.tpl.html');
				var title = '<span>微信安全支付</span>';
				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('pay wechat back action start');
				$window.history.back();
			};

			$scope.payAction = function() {
				$log.log('pay wechat action start');
				if ($scope.params.appid && $scope.params.timeStamp && $scope.params.nonceStr && $scope.params.package && $scope.params.sign) {
					wcPayService.wcPay($scope.params, function(res) {
						if (res === 'success') {
							$location.path('/pay/success/' + userIdService.getData());
						} else {
							alert(res);
						}

					});
				}else{
					alert('支付出现问题，请重试或者联系客服');
				}

			};


			$scope.initLayout();



		}
	]);