'use strict';

angular.module('xiaoyuApp.record')
	.controller('orderFinishController', ['$scope', '$state', '$stateParams', '$window', '$log', '$timeout', '$location', '$templateCache', '$rootScope', '$filter',
		'CaptureService', 'orderService', 'orderDetailService', 'userId', 'defaultTimeConfig', 'dateTimeService',
		function($scope, $state, $stateParams, $window, $log, $timeout, $location, $templateCache, $rootScope, $filter,
			CaptureService, orderService, orderDetailService, userIdService, defaultTimeConfig, dateTimeService) {
			$log.log('orderFinishController init');
			//init order detail page


			//如果是包月，需要时间周期
			//1 充值 2 洗车 3 包月
			//$scope.washTime = dateTimeService.getOrderWashTimeStr($scope.orderObj, defaultTimeConfig.duration);
			$scope.endOrderTime = $scope.orderObj.endOrderTime;
			// $scope.washTime = '11月11日 12:00';

			//for rating
			$scope.rate = $scope.orderObj.score;
			$scope.max = 5;
			$scope.isReadonly = false;
			//for rating end

			// $scope.showWasher = false;

			// if ($scope.orderObj.washer && $scope.orderObj.washer.hasOwnProperty('id')) {
			// 	$scope.washer = $scope.orderObj.washer;
			// 	$scope.showWasher = true;
			// }

			$scope.showEdit = true;
			if ($scope.orderObj.status == 7) {
				$scope.showEdit = false;
			}

			if ($scope.orderObj.comment) {
				$scope.comment = $scope.orderObj.comment;
			}

			$scope.imgList = [];
			if ($scope.orderObj.pictures && $scope.orderObj.pictures.length > 0) {
				$scope.imgList = $scope.orderObj.pictures;
			}

			// $scope.hoveringOver = function(value) {
			// 	$scope.overStar = value;
			// 	$scope.percent = 100 * (value / $scope.max);
			// };
			//end
			$scope.submitComment = function() {
				//$log.log('comment:' + $scope.comment);
				//$log.log('score:' + $scope.rate);
				orderDetailService.submitComment($scope.orderObj.id, $scope.comment, $scope.rate).then(function() {
					//$log.log('submit comment success!');
					$rootScope.toggle('submitCommentSucMsg', 'on');
					$timeout(function() {
						$rootScope.toggle('submitCommentSucMsg', 'off');
						$window.location.reload();
					}, 1500);

				});
				
				// $state.reload();
				// $state.go($state.current,$stateParams, {reload: true});
			};

			$scope.reApplyOrder = function() {
				if($scope.orderObj.type == 3){
					$state.go('order',{'userId':userIdService.getData(),'orderId':$scope.orderObj.id,'orderType':3});
				}else{
					$state.go('order',{'userId':userIdService.getData(),'orderId':$scope.orderObj.id});
				}


			};

			$scope.shareAction = function() {

			};


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