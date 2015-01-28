'use strict';

//car update page  controller
angular.module('xiaoyuApp.location')
	.controller('locationUpdateController', ['$scope','$rootScope','$state','$previousState','CaptureService', 'locationService', '$templateCache',
		'$log', 'updateLocationObjService', 'updateLocationListService',

		function($scope,$rootScope,$state ,$previousState, CaptureService, locationService, $templateCache, $log, updateLocationObjService, updateLocationListService) {
			$log.log('location Update Controller init');
			//give access from parent to child
			//$scope.setLocationUpdateScope($scope);

			$scope.updateLocationObj = updateLocationObjService.getNewLocationObj();

			if ($scope.updateLocationObj.id === 0) {
				$scope.isNewLocation = true;
			} else {
				$scope.isNewLocation = false;
			}

			var previousStateName = $previousState.get().state.name;
			$log.log('previousState:' + previousStateName);
			if (previousStateName.indexOf('order') > -1 || previousStateName.indexOf('location.list') > -1) {
				$previousState.memo('locationUpdateEntrypoint');
			}
			// $scope.$on('updateLocationObj.update', function(event, newLocationObj) {
			// 	$scope.updateLocationObj = newLocationObj;
			// 	//$scope.$apply();
			// 	//trick , if id === 0 , this is the blank item
			// 	if ($scope.updateLocationObj.id === 0) {
			// 		$scope.isNewLocation = true;
			// 	} else {
			// 		$scope.isNewLocation = false;
			// 	}
			// });


			$scope.initLayout = function() {
				// var content = '';
				// //disable back action , use cancel to back , in order to prevent wrong action
				// //var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				// var title = '<span>编辑地址</span>';
				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', content, $scope);
				// if ($scope.isNewLocation) {
				// 	CaptureService.setContentFor('rightbtn', content, $scope);
				// } else {
				// 	var delRawContent = $templateCache.get('/static/app/common/deleteBtn.tpl.html');
				// 	CaptureService.setContentFor('rightbtn', delRawContent[1], $scope);

				// }
			};

			$scope.backAction = function() {
				$log.log('location update back action start');
				$scope.toggleShow('locationUpdate');
			};

			$scope.deleteAction = function() {
				$log.log('location delete action');
				locationService.deleteLocation($scope.updateLocationObj.id).then(function(data) {
					$log.log('location delete success');
					updateLocationListService.deleteLocation($scope.updateLocationObj.id);
					//$scope.toggleShow('locationUpdate');
					$previousState.go('locationUpdateEntrypoint');

				});

			};


			$scope.confirmDelete = function() {
				$scope.deleteAction();
				$rootScope.toggle('deleteLocationOverlay', 'off');
			};


			$scope.cancelDelete = function() {
				$rootScope.toggle('deleteLocationOverlay', 'off');
			};



			$scope.chooseLocation = function() {
				$state.go('^.area');
			};


			$scope.resultAction = function(type) {
				if (type === 'save') {
					//if newcar , insert into carlist 
					//if oldcar , call update old car
					if ($scope.isNewLocation) {
						locationService.addNewLocation(updateLocationObjService.getNewLocationObj()).then(function(data) {
							if (data) {
								$log.log('add new location success!');
								updateLocationListService.addLocation(data);
								// $scope.toggleShow('locationUpdate');
								$previousState.go('locationUpdateEntrypoint');



							} else {
								$log.log('add new location fail!');
							}
						});
					} else {
						locationService.updateLocation(updateLocationObjService.getNewLocationObj()).then(function(data) {
							if (data) {
								$log.log('update location success!');
								updateLocationObjService.updateOldLocation();
								// $scope.toggleShow('locationUpdate');
								$previousState.go('locationUpdateEntrypoint');

							} else {
								$log.log('update location fail!');
							}

						});
					}

				} else if (type === 'delete') {
					$log.log('delete location');
					//$scope.toggleShow('locationUpdate');
					if ($scope.isNewLocation) {
						$previousState.go('locationUpdateEntrypoint');
					} else {
						$rootScope.toggle('deleteLocationOverlay', 'on');
					}
				}

			};

		}
	]);