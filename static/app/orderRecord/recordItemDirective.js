'use strict';
angular.module('xiaoyuApp.record')
	.directive('recordItem', ['$state', '$log', 'recordOrderUpdate', 'dateTimeService', 'defaultTimeConfig', 'userId',
		function($state, $log, recordOrderUpdate, dateTimeService, defaultTimeConfig, userIdService) {
			// Runs during compile
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {
					recordObj: '=recordObj',
					payAction: '&',
					deleteAction: '&',
					removeAction: '&'
				},
				// {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
				templateUrl: '/static/app/orderRecord/recordItemPage.tpl.html',
				replace: true,
				//transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					$scope.washTime = dateTimeService.getOrderWashTimeStr($scope.recordObj, defaultTimeConfig.duration);
				},
				controller: function($scope) {
					$scope.clickPay = function() {
						// recordOrderUpdate.setRecordObj(angular.copy($scope.recordObj));
						// $scope.payAction();
						$log.log('click pay');
					};

					$scope.clickCancel = function() {
						//get recordObj from service
						recordOrderUpdate.setRecordObj(angular.copy($scope.recordObj));
						$scope.deleteAction();

					};

					$scope.clickRemove = function() {
						//get recordObj from service
						recordOrderUpdate.setRecordObj(angular.copy($scope.recordObj));
						$scope.removeAction();

					};

					$scope.reApplyOrder = function(e) {
						e.preventDefault();
						e.stopPropagation();
						if ($scope.recordObj.type == 3) {
							$state.go('order', {
								'userId': userIdService.getData(),
								'orderId': $scope.recordObj.id,
								'orderType': 3
							});
						} else {
							$state.go('order', {
								'userId': userIdService.getData(),
								'orderId': $scope.recordObj.id
							});
						}
					};

					$scope.goDetail = function() {

						if ($scope.recordObj.id) {
							$state.go('record.detail', {
								'userId': userIdService.getData(),
								'orderId': $scope.recordObj.id
							});

						}
					};

				}
			};
		}
	]);