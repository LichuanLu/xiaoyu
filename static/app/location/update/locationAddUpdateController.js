'use strict';

//location update page  controller
angular.module('xiaoyuApp.location')
	.controller('locationAddUpdateController', ['$scope','$previousState','CaptureService', 'locationService', '$templateCache',
		'$log', 'updateLocationObjService',

		function($scope,$previousState,CaptureService, locationService, $templateCache, $log, updateLocationObjService) {
			$log.log('location add update Controller init');
			//give access from parent to child
			//$scope.setAddUpdateScope($scope);

			locationService.getAddList().then(function(data) {
				if (data) {
					$scope.addList = data;
				}
			});
			// $scope.$on('updateLocationType.update', function(event, newLocationTypeList) {
			// 	if (newLocationTypeList) {
			// 		$scope.locationTypeList = newLocationTypeList;
			// 	}

			// });

			$scope.initLayout = function() {
				// var content = '';
				// //disable back action , use cancel to back , in order to prevent wrong action
				// var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				// var title = '<span>选择小区</span>';
				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				// CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.backAction = function() {
				$log.log('location add update back action start');
				$scope.toggleShow('locationAddUpdate');
			};

			$scope.selectAdd = function(addObj) {
				updateLocationObjService.getNewLocationObj().address = addObj;
				//$scope.toggleShow('locationAddUpdate');
				$previousState.go();
			};
		}
	]);