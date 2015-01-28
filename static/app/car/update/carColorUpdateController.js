'use strict';

//car update page  controller
angular.module('xiaoyuApp.car')
	.controller('carColorUpdateController', ['$scope', 'CaptureService', 'carService', '$templateCache', '$log', 'updateCarObjService',

		function($scope, CaptureService, carService, $templateCache, $log, updateCarObjService) {
			$log.log('car Color Update Controller init');
			//give access from parent to child
			$scope.setCarColorUpdateScope($scope);

			var carColor = updateCarObjService.getNewCarObj().color;
			$scope.carColorObj = {
				'carColor': carColor
			};

			$scope.$on('updateCarObj.update', function(event, newCarObj) {
				if ($scope.carColorObj.carColor !== newCarObj.color) {
					$scope.carColorObj.carColor = newCarObj.color;
				}

			});


			$scope.initLayout = function() {

				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>车辆颜色</span>';
				// var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('car Color update back action start');
				if (updateCarObjService.getNewCarObj().color !== $scope.carColorObj.carColor) {
					$scope.carColorObj.carColor = updateCarObjService.getNewCarObj().color;
				}
				$scope.toggleShow('carColorUpdate');
			};

			$scope.saveAction = function() {
				//add form verification
				if (updateCarObjService.getNewCarObj().color !== $scope.carColorObj.carColor) {
					updateCarObjService.getNewCarObj().color = $scope.carColorObj.carColor;
				}
				$scope.toggleShow('carColorUpdate');
			};

			$scope.cancelInput = function() {
				$scope.carColorObj.carColor = '';
			};

		}
	]);