'use strict';

//car update page  controller
angular.module('xiaoyuApp.car')
	.controller('carTypeController', ['$scope','$state','$previousState','CaptureService', 'carService', '$templateCache',
		'$log', 'updateCarTypeService',

		function($scope,$state,$previousState,CaptureService, carService, $templateCache, $log, updateCarTypeService) {
			$log.log('car type Controller init');
			//give access from parent to child
			//$scope.setCarTypeScope($scope);
			$previousState.memo('workflowEntrypoint');
			carService.getCarListByBrand().then(function(data) {
				if (data) {
					$scope.carTypeList = data;
				}
			});

			$scope.initLayout = function() {
				var content = '';
				//disable back action , use cancel to back , in order to prevent wrong action
				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>车辆品牌</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.backAction = function() {
				$log.log('car type back action start');
				$scope.toggleShow('carType');
			};
			$scope.selectCarType = function(carTypeObj) {
				carService.getCarListByBrand(carTypeObj.id).then(function(data) {
					if (data) {
						updateCarTypeService.setCarTypeList(data);
						$state.go('^.typelist');
						
					}
				});
			};
		}
	]);