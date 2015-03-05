'use strict';

//car update page  controller
angular.module('xiaoyuApp.car')
	.controller('carUpdateController', ['$scope','$timeout','$rootScope', '$state', '$previousState',
		'CaptureService', 'carService', '$templateCache',
		'$log', 'updateCarObjService', 'updateCarListService','validateMessage','validateService',

		function($scope,$timeout ,$rootScope, $state, $previousState, CaptureService,
			carService, $templateCache, $log, updateCarObjService, updateCarListService,validateMessage,validateService) {
			$log.log('car Update Controller init');
			//give access from parent to child
			//$scope.setCarUpdateScope($scope);

			$scope.updateCarObj = updateCarObjService.getNewCarObj();
			if ($scope.updateCarObj.id === 0) {
				$scope.isNewCar = true;
			} else {
				$scope.isNewCar = false;
			}

			var previousStateName = $previousState.get().state.name;
			$log.log('previousState:' + previousStateName);
			if (previousStateName.indexOf('order') > -1 || previousStateName.indexOf('car.list') > -1) {
				$previousState.memo('carUpdateEntrypoint');
			}

			// $scope.$on('updateCarObj.update', function(event, newCarObj) {
			// 	$scope.updateCarObj = newCarObj;
			// 	//$scope.$apply();
			// 	//trick , if id === 0 , this is the blank item
			// 	if ($scope.updateCarObj.id === 0) {
			// 		$scope.isNewCar = true;
			// 	} else {
			// 		$scope.isNewCar = false;
			// 	}
			// });


			$scope.initLayout = function() {
				var content = '';
				//disable back action , use cancel to back , in order to prevent wrong action
				//var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>编辑车辆信息</span>';
				CaptureService.setContentFor('title', title, $scope);
				// if ($scope.isNewCar) {
				// 	CaptureService.setContentFor('rightbtn', content, $scope);
				// } else {
				// 	var delRawContent = $templateCache.get('/static/app/common/deleteBtn.tpl.html');
				// 	CaptureService.setContentFor('rightbtn', delRawContent[1], $scope);

				// }
				CaptureService.setContentFor('rightbtn', content, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
			};

			if($state.is('car.update')){
				$scope.initLayout();
			}

			$scope.chooseCarType = function() {
				$state.go('^.brandlist');
			};

			$scope.backAction = function() {
				$log.log('car update back action start');
				$scope.toggleShow('carUpdate');
			};


			$scope.deleteAction = function() {
				$log.log('car delete action');
				carService.deleteCar($scope.updateCarObj.id).then(function(data) {
					$log.log('car delete success');
					updateCarListService.deleteCar($scope.updateCarObj.id);
					//$scope.toggleShow('carUpdate');
					$previousState.go('carUpdateEntrypoint');

				});

			};

			$scope.confirmDelete = function() {
				$scope.deleteAction();
				$rootScope.toggle('deleteCarOverlay', 'off');
			};


			$scope.cancelDelete = function() {
				$rootScope.toggle('deleteCarOverlay', 'off');
			};



			$scope.resultAction = function(type) {
				if (type === 'save') {
					var newCarObj = updateCarObjService.getNewCarObj();

					$scope.inputError = false;
					//输入为空
					if (!newCarObj.car.name) {
						$rootScope.toggle('carWarning', 'on');
						$timeout(function() {
							$rootScope.toggle('carWarning', 'off');
						}, 1500);
					} else if (newCarObj.carNo === '') {
						$scope.inputError = true;
						$scope.fieldMessage = validateMessage.emptyInputError;
					} else if (!validateService.carNoValidate(newCarObj.carNo)) {
						$scope.inputError = true;
						$scope.fieldMessage = validateMessage.carNoInputError;
					} else {
						//if newcar , insert into carlist 
						//if oldcar , call update old car
						if ($scope.isNewCar) {
							carService.addNewCar(newCarObj).then(function(data) {
								if (data) {
									$log.log('add new car success!');
									updateCarListService.addCar(data);
									//$scope.toggleShow('carUpdate');
									$previousState.go('carUpdateEntrypoint');


								} else {
									$log.log('add new car fail!');
								}
							});
						} else {
							carService.updateCar(newCarObj).then(function(data) {
								if (data) {
									$log.log('update car success!');
									updateCarObjService.updateOldCar();
									// $scope.toggleShow('carUpdate');
									$previousState.go('carUpdateEntrypoint');

								} else {
									$log.log('update car fail!');
								}

							});
						}

					}



				} else if (type === 'delete') {
					$log.log('delete car');
					// $scope.toggleShow('carUpdate');
					if ($scope.isNewCar) {
						$previousState.go('carUpdateEntrypoint');
					} else {
						$rootScope.toggle('deleteCarOverlay', 'on');
					}

				}

			};

		}
	]);