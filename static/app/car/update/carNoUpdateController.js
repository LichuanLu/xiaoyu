'use strict';

//car update page  controller
angular.module('xiaoyuApp.car')
	.controller('carNoUpdateController', ['$scope', 'CaptureService',
		'carService', '$templateCache', '$log', 'updateCarObjService', 'validateService', 'validateMessage',

		function($scope, CaptureService, carService, $templateCache, $log, updateCarObjService, validateService, validateMessage) {
			$log.log('car No Update Controller init');
			$scope.inputError = false;
			$scope.fieldMessage = '';
			//give access from parent to child
			$scope.setCarNoUpdateScope($scope);


			var carNo = updateCarObjService.getNewCarObj().carNo;
			$scope.carNoObj = {
				'carNo': carNo
			};

			$scope.$on('updateCarObj.update', function(event, newCarObj) {
				if ($scope.carNoObj.carNo !== newCarObj.carNo) {
					$scope.carNoObj.carNo = newCarObj.carNo;
				}

			});


			$scope.initLayout = function() {

				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>车牌号</span>';
				// var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('car No update back action start');
				if (updateCarObjService.getNewCarObj().carNo !== $scope.carNoObj.carNo) {
					$scope.carNoObj.carNo = updateCarObjService.getNewCarObj().carNo;
				}
				$scope.toggleShow('carNoUpdate');
			};

			$scope.saveAction = function() {
				//add form verification
				$scope.inputError = false;
				if ($scope.carNoObj.carNo === '') {
					$scope.inputError = true;
					$scope.fieldMessage = validateMessage.emptyInputError;
				} else if (!validateService.carNoValidate($scope.carNoObj.carNo)) {
					$scope.inputError = true;
					$scope.fieldMessage = validateMessage.carNoInputError;
				} else {
					if (updateCarObjService.getNewCarObj().carNo !== $scope.carNoObj.carNo) {
						updateCarObjService.getNewCarObj().carNo = $scope.carNoObj.carNo;
					}
					$scope.toggleShow('carNoUpdate');
				}


			};

			$scope.cancelInput = function() {
				$scope.carNoObj.carNo = '';
			};

		}
	]);