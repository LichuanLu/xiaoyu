'use strict';
angular.module('xiaoyuApp.record')
	.directive('recordItem', ['recordOrderUpdate',function(recordOrderUpdate) {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				recordObj: '=recordObj',
				payAction: '&',
				deleteAction: '&',
				removeAction:'&'
			},
			// {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: '/static/app/orderRecord/recordItemPage.tpl.html',
			replace: true,
			//transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {},
			controller: function($scope) {
				$scope.clickPay = function() {
					recordOrderUpdate.setRecordObj(angular.copy($scope.recordObj));
					$scope.payAction();
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

				

			}
		};
	}]);