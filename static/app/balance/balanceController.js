'use strict';

angular.module('xiaoyuApp.balance')
	.controller('balanceController', ['$scope', '$log', '$location', 'CaptureService', 'userService',
		'balanceService', '$templateCache',
		function($scope, $log, $location, CaptureService, userService, balanceService, $templateCache) {
			$log.log('balanceController init');

			//load from service
			userService.getUserInfo().then(function(data) {
				//$scope.phone = data.phone;
				$scope.points = data.points;
			});


			// balanceService.getBalanceRecord().then(function(data) {
			// 	$scope.recordList = data;
			// });

			//$scope.showBalance = true;


			//init order page
			$scope.initLayout = function() {
				var content = '';
				var title = '<span>我的余额</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.initLayout();

			//toggle show order|child page
			// $scope.toggleShow = function(item) {
			// 	switch (item) {
			// 		case 'supply':
			// 			$scope.showSupply = !$scope.showSupply;
			// 			$scope.showBalance = !$scope.showBalance;
			// 			break;
			// 	}
			// };

			//get access for child scope
			// $scope.setSupplyScope = function(supplyScope) {
			// 	$scope.supplyScope = supplyScope;
			// };

			//hide|show order page
			// $scope.$watch('showBalance', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showBalance Changed to show');
			// 		$scope.initLayout();

			// 	}
			// });


			// //hide|show car No page
			// $scope.$watch('showSupply', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('supply Changed to show');
			// 		if ($scope.supplyScope) {
			// 			$scope.supplyScope.initLayout();
			// 		}

			// 	}
			// });

		}
	]);