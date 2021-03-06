'use strict';

//car page major controller
angular.module('xiaoyuApp.discount')
	.controller('discountController', ['$scope', '$state', '$stateParams', '$log', '$previousState',
		'CaptureService', 'discountService','userId',
		function($scope, $state, $stateParams, $log, $previousState,
			CaptureService, discountService,userIdService) {
			$log.log('discountController init');
			var orderId = "";
			if (!$scope.isUndefined($stateParams.oId)) {
				orderId = $stateParams.oId;
			}

			discountService.getDiscountList(orderId).then(function(data) {
				$scope.discountList = data;
			});



			$scope.initLayout = function() {
				var content = '';
				//var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>我的优惠卷</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};
			$scope.initLayout();

			$scope.radioClickAction = function($event) {
				if (typeof $event !== 'undefined') {
					$event.stopPropagation();
				}
			};

			$scope.changeLocationAction = function() {
				$log.log('changeLocationAction fire');
				// if (typeof $event !== 'undefined') {
				// 	$event.stopPropagation();
				// }
				// $log.log($scope.currentCar.carObj);
				if ($scope.currentLocation.locationObj) {
					$scope.setLocation($scope.currentLocation.locationObj);
				}
			};

			$scope.chooseDiscountAction = function(discountObj) {
				//set discountObj
				$scope.orderObj.discountObj = discountObj;
				$previousState.go();
			};

			$scope.goOrder = function() {
				$log.log('go order');
				$state.go('order',{'userId':userIdService.getData()});

			};

		}
	])
	.filter('discountname', [
		function() {
			return function(type) {
				//代金卷1，打折卷2 ,  免费洗车 3
				if (type == 3) {
					return '免费洗车一次';
				} else {
					return '';
				}
			};
		}
	]);