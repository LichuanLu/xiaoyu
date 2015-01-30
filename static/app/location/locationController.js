'use strict';

//car page major controller
angular.module('xiaoyuApp.location')
	.controller('locationController', ['$scope', '$state','$filter', 'CaptureService', 'locationService', '$templateCache',
		'$log', 'emptyLocationObj', 'updateLocationListService', 'updateLocationObjService',

		function($scope, $state, $filter,CaptureService, locationService, $templateCache, $log,
			emptyLocationObj, updateLocationListService, updateLocationObjService) {
			$log.log('locationController init');
			//give access from parent to child
			//$scope.setLocationScope($scope);

			locationService.getLocationList().then(function(data) {
				$scope.locationList = data;
				//share car list using service
				updateLocationListService.setLocationList($scope.locationList);
				$log.log($scope.locationList.length);
				// if ($scope.locationList.length > 0) {
				// 	$scope.currentLocation.locationObj = $scope.locationList[0];
				// }
				if ($scope.locationList.length > 0) {
					if ($scope.orderObj.userAddress) {
						var found = $filter('filter')($scope.locationList, {
							id: $scope.orderObj.userAddress.id
						}, true);
						$log.log('found:' + found);
						if (found.length) {
							$scope.currentLocation.locationObj = found[0];
						} else {
							$scope.currentLocation.locationObj = $scope.locationList[0];
							$scope.changeLocationAction();
						}

					} else {
						$scope.currentLocation.locationObj = $scope.locationList[0];
						$scope.changeLocationAction();
					}

				}
			});



			$scope.currentLocation = {
				'locationObj': ''
			};

			$scope.initLayout = function() {
				// var content = '';
				// var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				// var title = '<span>我的地址</span>';
				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				// CaptureService.setContentFor('rightbtn', content, $scope);
			};

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

			$scope.backAction = function() {
				$log.log('back action start');
				$scope.toggleShow('location');
			};


			$scope.updateAction = function(locationObj, $event) {
				if (typeof $event !== 'undefined') {
					$event.preventDefault();
					$event.stopPropagation();
				}


				if ($scope.isUndefined(locationObj)) {
					//updateCarObjService.oldCarObj = carObj;
					$log.log('create new location');
					updateLocationObjService.update(angular.copy(emptyLocationObj));
				} else {
					updateLocationObjService.setOldLocationObj(locationObj);
					updateLocationObjService.update(angular.copy(locationObj));
				}
				//$scope.toggleShow('locationUpdate');
				$state.go('location.update');
			};

		}
	]);