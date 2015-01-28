'use strict';

//car page major controller
angular.module('xiaoyuApp')
	.controller('orderCommentController', ['$scope', 'CaptureService', '$templateCache',
		'$log', 'updateOrderCommentService',

		function($scope, CaptureService, $templateCache, $log, updateOrderCommentService) {
			$log.log('orderCommentController init');
			//give access from parent to child
			$scope.setOrderCommentScope($scope);

			var orderComment = updateOrderCommentService.getNewOrderComment();
			$scope.comment = orderComment;

			$scope.$on('updateOrderComment.update', function(event, newOrderComment) {
				if ($scope.comment !== newOrderComment) {
					$scope.comment = newOrderComment;
				}

			});

			$scope.initLayout = function() {
				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>洗车备注</span>';
				// var saveRawContent = $templateCache.get('/static/app/common/saveBtn.tpl.html');

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', '', $scope);
			};

			$scope.backAction = function() {
				$log.log('back action start');
				//call parent function to reverse change
				// $scope.resetOrderComment();
				$scope.toggleShow('orderComment');
			};

			$scope.saveAction = function() {
				$scope.setOrderComment($scope.comment);
				$scope.toggleShow('orderComment');
			};

		}
	]);