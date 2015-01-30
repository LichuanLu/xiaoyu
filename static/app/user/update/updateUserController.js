'use strict';

//car update page  controller
angular.module('xiaoyuApp.user')
	.controller('updateUserController', ['$scope','$previousState','CaptureService',
		'$templateCache', '$log', 'validateService','validateMessage','userService',

		function($scope,$previousState, CaptureService, $templateCache, $log,validateService,validateMessage,userService) {
			$log.log('updateUserController Controller init');
			$scope.inputError = false;
			$scope.fieldMessage = '';

			$scope.phone = $scope.userObj.phone;

			$scope.initLayout = function() {

				//var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>更新资料</span>';
				// var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', '', $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			// $scope.backAction = function() {
			// 	$log.log('update phone back action start');
			// 	$scope.childToggleShow('phoneUpdate');
			// };

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
					if($scope.userObj.phone !== $scope.phone){
						$scope.userObj.phone = $scope.phone;
						userService.updateUser(angular.copy($scope.userObj)).then(function() {
							$log.log('user phone update success');
							$previousState.go();
						});
					}else{
						alert('新手机号不能跟旧的一样');
					}
					// if ($scope.user.phone !== $scope.phone) {
					// 	$scope.user.phone = $scope.phone;
					// }
					// $scope.childToggleShow('phoneUpdate');
					//run update service
				}

			};

			$scope.cancelInput = function() {
				$scope.phone = '';
			};

		}
	]);