'use strict';

//car update page  controller
angular.module('xiaoyuApp.user')
	.controller('updateNameController', ['$scope', 'CaptureService',
		'$templateCache', '$log' ,

		function($scope, CaptureService, $templateCache, $log) {
			$log.log('updateNameController Controller init');
			//give access from parent to child
			$scope.setNameUpdateScope($scope);

			
			$scope.$on('updateUserName.update', function(event, name) {
				if ($scope.name !== name) {
					$scope.name = name;
				}

			});


			$scope.initLayout = function() {

				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>用户姓名</span>';
				// var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn','', $scope);
			};

			$scope.backAction = function() {
				$log.log('update name back action start');
				$scope.childToggleShow('nameUpdate');
			};

			$scope.saveAction = function() {
				//add form verification
				if ($scope.user.name !== $scope.name) {
					$scope.user.name = $scope.name;
				}
				$scope.childToggleShow('nameUpdate');
			};

			$scope.cancelInput = function() {
				$scope.name = '';
			};

		}
	]);