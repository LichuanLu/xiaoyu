'use strict';

angular.module('xiaoyuApp.user')
	.controller('accountController', ['$scope', '$state', '$log', '$templateCache', 'CaptureService',
		'userService', 'updateUserPhoneService', 'updateUserObjService', 'updateUserNameService','userId',
		function($scope, $state, $log, $templateCache, CaptureService, userService,
			updateUserPhoneService, updateUserObjService, updateUserNameService,userIdService) {
			console.log('accountController');


			//init order page
			$scope.initLayout = function() {
				var content = '';
				var title = '<span>个人中心</span>';
				//var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.initLayout();

			$scope.updateUser = function() {
				$log.log('go to updateuser page');
				$state.go('user.update');
			};

			$scope.goBalance = function() {
				$log.log('go to goBalance page');
				$state.go('balance.supply',{'userId':userIdService.getData()});
			};

			$scope.goLongterm = function() {
				$log.log('go to goLongterm page');
				$state.go('longterm.record',{'userId':userIdService.getData()});
			};

			$scope.goOrder = function() {
				$log.log('go to goOrder page');
				$state.go('record.list',{'userId':userIdService.getData()});
			};

			$scope.goDiscount = function() {
				$log.log('go to goDiscount page');
				$state.go('discount.list',{'userId':userIdService.getData()});

			};

			$scope.goCar = function() {
				$log.log('go to goCar page');
				$state.go('car.list',{'userId':userIdService.getData()});
			};

			$scope.goAbout = function() {
				$log.log('go to goAbout page');
				$state.go('about');

			};
		}
	]);