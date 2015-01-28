'use strict';
angular.module('xiaoyuApp.car')
	.directive('carListItem', function() {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {
			// 	carObj: '=carObj',
			// 	action: '&'
			// },
			// {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: '/static/app/car/carListItem.tpl.html',
			replace: true,
			//transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				// iElm.on('click', function(e) {
				// 	e.preventDefault();
				// 	//toggle show is from order controller
				// 	$scope.toggleShow('car');
				// 	console.dir($scope.carObj);
				// 	//set car is from parent
				// 	$scope.setCar($scope.carObj);
				// 	$scope.$apply();
				// });
			}
		};
	});