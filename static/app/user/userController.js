'use strict';

angular.module('xiaoyuApp.user')
	.controller('userController', ['$scope', '$log', '$templateCache', 'CaptureService',
		'userService', 'updateUserPhoneService', 'updateUserObjService', 'updateUserNameService',
		function($scope, $log, $templateCache, CaptureService, userService,
			updateUserPhoneService, updateUserObjService, updateUserNameService) {
			console.log('userController');
			userService.getUserInfo().then(function(data) {
				$scope.userObj = data;
			});

			//$scope.showUser = true;

			// $scope.$on('updateUserObj.update', function(event, userObj) {
			// 	$scope.user = userObj;
			// });

			// $scope.setUserScope($scope);

			//toggle show user|child page
			// $scope.childToggleShow = function(item) {
			// 	switch (item) {
			// 		case 'nameUpdate':
			// 			$scope.showNameUpdate = !$scope.showNameUpdate;
			// 			$scope.showUser = !$scope.showUser;
			// 			break;
			// 		case 'sexUpdate':
			// 			$scope.showSexUpdate = !$scope.showSexUpdate;
			// 			$scope.showUser = !$scope.showUser;
			// 			break;
			// 		case 'phoneUpdate':
			// 			$scope.showPhoneUpdate = !$scope.showPhoneUpdate;
			// 			$scope.showUser = !$scope.showUser;
			// 			break;
			// 	}

			// };

			// $scope.updatePhone = function() {
			// 	updateUserPhoneService.update($scope.user.phone);
			// 	$scope.childToggleShow('phoneUpdate');

			// };

			// $scope.updateName = function() {
			// 	updateUserNameService.update($scope.user.name);
			// 	$scope.childToggleShow('nameUpdate');

			// };

			// $scope.updateSex = function() {
			// 	// updateUserNameService.update($scope.user.name);
			// 	$scope.childToggleShow('sexUpdate');

			// };

			

			// $scope.backAction = function() {
			// 	$log.log('back action start');
			// 	$scope.toggleShow('user');
			// };

			// $scope.saveAction = function() {
			// 	$log.log('save action start');
			// 	userService.updateUser(angular.copy($scope.user)).then(function() {
			// 		updateUserObjService.updateOldObj($scope.user, $scope.orderObj.user);
			// 		$scope.toggleShow('user');
			// 	});
			// };


			//init order page
			$scope.initLayout = function() {
				var content = '';
				var title = '<span>个人信息</span>';
				//var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn',content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.initLayout();

			//get access for child scope
			// $scope.setNameUpdateScope = function(nameUpdateScope) {
			// 	$scope.nameUpdateScope = nameUpdateScope;
			// };

			// //get access for child scope
			// $scope.setSexUpdateScope = function(sexUpdateScope) {
			// 	$scope.sexUpdateScope = sexUpdateScope;
			// };

			// //get access for child scope
			// $scope.setPhoneUpdateScope = function(phoneUpdateScope) {
			// 	$scope.phoneUpdateScope = phoneUpdateScope;
			// };



			// //change name
			// $scope.setName = function(name) {
			// 	$scope.user.name = name;
			// };

			// //change sex
			// $scope.setSex = function(sex) {
			// 	$scope.user.sex = sex;
			// };

			// //change phone
			// $scope.setPhone = function(phone) {
			// 	$scope.user.phone = phone;
			// };


			// //hide|show car page
			// $scope.$watch('showNameUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showNameUpdate Changed to show');
			// 		if ($scope.nameUpdateScope) {
			// 			$scope.nameUpdateScope.initLayout();
			// 		}

			// 	}
			// });

			// //hide|show car page
			// $scope.$watch('showSexUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showSexUpdate Changed to show');
			// 		if ($scope.sexUpdateScope) {
			// 			$scope.sexUpdateScope.initLayout();
			// 		}

			// 	}
			// });

			// //hide|show car page
			// $scope.$watch('showPhoneUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showPhoneUpdate Changed to show');
			// 		if ($scope.phoneUpdateScope) {
			// 			$scope.phoneUpdateScope.initLayout();
			// 		}

			// 	}
			// });



			// //hide|show order page
			// $scope.$watch('showUser', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showUser Changed to show');
			// 		$scope.initLayout();

			// 	}
			// });

		}
	]);