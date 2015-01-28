'use strict';

//car update page  controller
angular.module('xiaoyuApp.car')
	.controller('carTypeUpdateController', ['$scope','$previousState','$state','CaptureService', 'carService', '$templateCache',
		'$log', 'updateCarTypeService', 'updateCarObjService',

		function($scope,$previousState,$state,CaptureService, carService, $templateCache, $log, updateCarTypeService, updateCarObjService) {
			$log.log('car type update Controller init');
			//give access from parent to child
			//$scope.setCarTypeUpdateScope($scope);

			$scope.carTypeList = updateCarTypeService.getCarTypeList();
			$scope.$on('updateCarType.update', function(event, newCarTypeList) {
				if (newCarTypeList) {
					$scope.carTypeList = newCarTypeList;
				}

			});

			$scope.initLayout = function() {
				var content = '';
				//disable back action , use cancel to back , in order to prevent wrong action
				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>品牌型号</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.backAction = function() {
				$log.log('car type update back action start');
				$scope.toggleShow('carTypeUpdate');
			};

			$scope.selectCarType = function(carTypeObj) {
				updateCarObjService.getNewCarObj().car = carTypeObj;
				$previousState.go('workflowEntrypoint');
			};
		}
	]);