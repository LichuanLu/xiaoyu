'use strict';
angular.module('xiaoyuApp')
	.directive('editInput', ['$log', function($log) {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				inputModel: '=inputModel',
				placeholder: '@placeholder',
				inputId: '@inputId',
				cancelInput: '&',
				inputError:'=inputError',
				fieldMessage:'=fieldMessage',
				prefix: '@prefix',
			},
			// {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: '/static/app/common/editInput.tpl.html',
			replace: true,
			//transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$scope.focusAction = function() {
					$log.log('focus');
					$scope.inputActive = true;
				};
				$scope.blurAction = function() {
					$log.log('blur');
					$scope.inputActive = false;
				};
			}
		};
	}]);