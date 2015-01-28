'use strict';

angular.module('xiaoyuApp.order')
	.controller('secondOrderController', ['$scope','$q','$state', '$log', '$timeout', 'CaptureService',
		function($scope,$q,$state, $log, $timeout, CaptureService) {
			console.log('secondOrderController');
			//init order page
			$scope.initLayout = function() {
				$log.log('second order page init');

				var content = '';
				var title = '<span>洗车订单</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};
			$scope.initLayout();

		}
	]);