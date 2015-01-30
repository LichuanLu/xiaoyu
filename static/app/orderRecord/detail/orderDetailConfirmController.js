'use strict';

angular.module('xiaoyuApp.record')
	.controller('orderDetailConfirmController', ['$scope', '$state', '$stateParams', '$log', '$location', '$templateCache', '$rootScope', '$filter',
		'CaptureService', 'orderService', 'orderDetailService', 'userId',
		function($scope, $state, $stateParams, $log, $location, $templateCache, $rootScope, $filter,
			CaptureService, orderService, orderDetailService, userIdService) {
			$log.log('orderDetailConfirmController init');
			//init order detail page
			$scope.initLayout = function() {
				// var content = '';
				// var title = '<span>订单详情</span>';
				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', content, $scope);
				// CaptureService.setContentFor('rightbtn', content, $scope);
			};

			// $scope.initLayout();

		}
	]);