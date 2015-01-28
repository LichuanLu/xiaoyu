'use strict';

//location update page  controller
angular.module('xiaoyuApp.location')
	.controller('locationCommentUpdateController', ['$scope', 'CaptureService', 'locationService',
		'$templateCache', '$log', 'updateLocationObjService',

		function($scope, CaptureService, locationService, $templateCache, $log, updateLocationObjService) {
			$log.log('location Comment Update Controller init');
			//give access from parent to child
			$scope.setLocationCommentUpdateScope($scope);

			var locationComment = updateLocationObjService.getNewLocationObj().comment;
			$scope.locationCommentObj = {
				'locationComment': locationComment
			};

			$scope.$on('updateLocationObj.update', function(event, newLocationObj) {
				if ($scope.locationCommentObj.locationComment !== newLocationObj.comment) {
					$scope.locationCommentObj.locationComment = newLocationObj.comment;
				}

			});


			$scope.initLayout = function() {

				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>详细地址</span>';
				// var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('location Comment update back action start');
				if (updateLocationObjService.getNewLocationObj().comment !== $scope.locationCommentObj.locationComment) {
					$scope.locationCommentObj.locationComment = updateLocationObjService.getNewLocationObj().comment;
				}
				$scope.toggleShow('locationCommentUpdate');
			};

			$scope.saveAction = function() {
				//add form verification
				if (updateLocationObjService.getNewLocationObj().comment !== $scope.locationCommentObj.locationComment) {
					updateLocationObjService.getNewLocationObj().comment = $scope.locationCommentObj.locationComment;
				}
				$scope.toggleShow('locationCommentUpdate');
			};

			$scope.cancelInput = function() {
				$scope.locationCommentObj.locationComment = '';
			};

		}
	]);