'use strict';

//car update page  controller
angular.module('xiaoyuApp.user')
	.controller('updateSexController', ['$scope', 'CaptureService',
		'$templateCache', '$log',

		function($scope, CaptureService, $templateCache, $log) {
			$log.log('updateSexController Controller init');
			//give access from parent to child
			$scope.setSexUpdateScope($scope);


			// $scope.$on('updateSexPhone.update', function(event, sex) {
			// 	if ($scope.sex !== sex) {
			// 		$scope.sex = sex;
			// 	}

			// });


			$scope.initLayout = function() {

				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>用户性别</span>';
				var saveRawContent = '';

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn',saveRawContent, $scope);
			};

			$scope.backAction = function() {
				$log.log('update sex back action start');
				$scope.childToggleShow('sexUpdate');
			};

			

			
			$scope.selectSex = function(type) {
				if ($scope.user.sex !== type) {
					$scope.user.sex = type;
				}
				$scope.childToggleShow('sexUpdate');
			};

		}
	]);