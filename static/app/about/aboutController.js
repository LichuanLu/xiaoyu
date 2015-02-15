'use strict';

angular.module('xiaoyuApp')
	.controller('aboutController', ['$scope', '$log', '$stateParams', '$location', 'CaptureService',
		'$templateCache', 
		function($scope, $log, $stateParams, $location, CaptureService, $templateCache) {
			$log.log('aboutController init');
			// var userOrderId = $stateParams.userOrderId;
			// if(userOrderId){
			// 	var userId = userOrderId.split('_')[0];
			// 	var orderId = userOrderId.split('_')[1];
			// 	userIdService.setData(userId);
			// }
			//init order page
			$scope.initLayout = function() {
				// var leftContent = $templateCache.get('/static/app/common/homeBtn.tpl.html');
				var title = '<span>关于我们</span>';
				// var rawContent = $templateCache.get('/static/app/pay/linkMyOrder.tpl.html');
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', '', $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			
			$scope.initLayout();



		}
	]);