'use strict';

//car update page  controller
angular.module('xiaoyuApp.user')
	.controller('updatePhoneController', ['$scope', 'CaptureService',
		'$templateCache', '$log', 'validateService','validateMessage',

		function($scope, CaptureService, $templateCache, $log,validateService,validateMessage) {
			$log.log('updatePhoneController Controller init');
			$scope.inputError = false;
			$scope.fieldMessage = '';
			//give access from parent to child
			$scope.setPhoneUpdateScope($scope);

			$scope.$on('updateUserPhone.update', function(event, phone) {
				if ($scope.phone !== phone) {
					$scope.phone = phone;
				}

			});


			$scope.initLayout = function() {

				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>手机号号码</span>';
				// var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('update phone back action start');
				$scope.childToggleShow('phoneUpdate');
			};

			$scope.saveAction = function() {
				//add form verification
				$scope.inputError = false;
				if ($scope.phone === '') {
					$scope.inputError = true;
					$scope.fieldMessage = validateMessage.emptyInputError;
				} else if (!validateService.mobileValidate($scope.phone)) {
					$scope.inputError = true;
					$scope.fieldMessage = validateMessage.mobileInputError;
				} else {
					if ($scope.user.phone !== $scope.phone) {
						$scope.user.phone = $scope.phone;
					}
					$scope.childToggleShow('phoneUpdate');
				}

			};

			$scope.cancelInput = function() {
				$scope.phone = '';
			};

		}
	]);