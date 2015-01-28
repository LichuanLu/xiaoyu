'use strict';

//car update page  controller
angular.module('xiaoyuApp.pay')
	.controller('updatePointController', ['$scope', 'CaptureService', '$templateCache',
		'$log', 'updatePayPointService',

		function($scope, CaptureService, $templateCache, $log, updatePayPointService) {
			$log.log('updatePointController init');
			//give access from parent to child
			//$scope.setUpdatePayPointScope($scope);

			$scope.$on('updatePayPoint.update', function(event, newPayPoint) {
				$scope.payPoint = newPayPoint;
			});


			$scope.initLayout = function() {
				// //var content = '';
				// //disable back action , use cancel to back , in order to prevent wrong action
				// var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				// // var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');
				// var title = '<span>余额支付</span>';
				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				// CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('pay point update back action start');
				$scope.toggleShow('updatePayPoint');
			};

			$scope.saveAction = function() {
				$scope.setPayPoint($scope.payPoint);
				$scope.toggleShow('updatePayPoint');


			};

			$scope.cancelInput = function() {
				$scope.payPoint = 0;
			};

		}
	]);