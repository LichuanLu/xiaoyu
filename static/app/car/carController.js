'use strict';

//car page major controller
angular.module('xiaoyuApp.car')
	.controller('carController', ['$scope','$state','$filter','CaptureService', 'carService', '$templateCache',
		'$log', 'updateCarObjService', 'emptyCarObj', 'updateCarListService',

		function($scope,$state,$filter,CaptureService, carService, $templateCache, $log, updateCarObjService, emptyCarObj, updateCarListService) {
			$log.log('carController init');
			//give access from parent to child
			// $scope.setCarScope($scope);

			carService.getCarList().then(function(data) {
				$scope.carList = data;
				//share car list using service
				updateCarListService.setCarList($scope.carList);
				$log.log($scope.carList.length);

				//for second order
				// var found = $filter('filter')($scope.fish, {id: fish_id}, true);
			 //     if (found.length) {
			 //         $scope.selected = JSON.stringify(found[0]);
			 //     } else {
			 //         $scope.selected = 'Not found';
			 //     }
				if ($scope.carList.length > 0) {
					if($scope.orderObj.userCar){
						var found = $filter('filter')($scope.carList, {id: $scope.orderObj.userCar.id}, true);
						$log.log('found:'+found);
						if (found.length) {
							$scope.currentCar.carObj = found[0];
						}else{
							$scope.currentCar.carObj = $scope.carList[0];
							$scope.changeCarAction();
						}

					}else{
						$scope.currentCar.carObj = $scope.carList[0];
						$scope.changeCarAction();
					}

				}

			});

			//selected car
			$scope.currentCar = {
				'carObj': ''
			};

			$scope.initLayout = function() {
				// var content = '';
				// var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				// var title = '<span>我的车辆</span>';
				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				// CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.backAction = function() {
				$log.log('back action start');
				$scope.toggleShow('car');
			};

			$scope.radioClickAction = function($event) {
				if (typeof $event !== 'undefined') {
					$event.stopPropagation();
				}
			};

			$scope.changeCarAction = function() {
				$log.log('changeCarAction fire');
				// if (typeof $event !== 'undefined') {
				// 	$event.stopPropagation();
				// }
				// $log.log($scope.currentCar.carObj);
				if ($scope.currentCar.carObj) {
					$scope.setCar($scope.currentCar.carObj);

				}

			};

			// $scope.$watch('currentCar', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('currentCar Changed');
			// 		$log.log(newValue);
			// 	}
			// });

			$scope.updateAction = function(carObj, $event) {
				$log.log('updateAction fire'+carObj);
				if (typeof $event !== 'undefined') {
					$event.preventDefault();
					$event.stopPropagation();
				}
				if (typeof carObj !== 'undefined') {
					//updateCarObjService.oldCarObj = carObj;
					$log.log('create new car');
					updateCarObjService.update(angular.copy(emptyCarObj));
				} else {
					updateCarObjService.setOldCarObj(carObj);
					updateCarObjService.update(angular.copy(carObj));
				}
				$state.go('car.update');
				// $scope.toggleShow('carUpdate');
			};

		}
	]);