'use strict';

angular.module('xiaoyuApp.longterm')
	.controller('longtermController', ['$scope', '$log','$state' ,'$location', 
		'CaptureService', 'userService', 'longtermService','userId',
		function($scope, $log,$state,$location, CaptureService, userService, longtermService,userIdService) {
			$log.log('longtermController init');

			//init order page
			$scope.initLayout = function() {
				var content = '';
				var title = '<span>我的包月</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.initLayout();

			longtermService.getRecordList().then(function(data) {
				if (data) {
					$scope.recordList = data;
				}
			});

			$scope.addLongterm = function() {
				$log.log('go add long term order');
				$state.go('order',{'userId':userIdService.getData(),'orderType':3});
			};
		}
	]);