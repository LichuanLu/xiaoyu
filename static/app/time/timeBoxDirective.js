'use strict';
angular.module('xiaoyuApp.order')
	.directive('timeBox', ['$log','$rootScope','$timeout', function($log,$rootScope,$timeout) {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {
			// 	timeObj: '=timeObj',
			// 	durationModel: '=durationModel',
			// 	toggle:'&toggleFunction'
			// },
			scope:true,
			// {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			templateUrl: '/static/app/time/timeBox.tpl.html',
			replace: true,
			//transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$scope.isSelected = false;

				$scope.selectTime = function() {
					if(iElm.hasClass('disable')){
						$scope.toggle('washTimeDisableWarning', 'on');
						$timeout(function() {
							$scope.toggle('washTimeDisableWarning', 'off');
						}, 1500);
					}else{
						$scope.isSelected = true;
						$scope.selectedTime.time = $scope.timeObj.time;
						$rootScope.$broadcast('timeBox.changeSelect', iElm);
					}
				};

				$scope.$on('timeBox.changeSelect', function(event, sourceElm) {
					if(sourceElm != iElm && $scope.isSelected === true){
						$scope.isSelected = false;
					}
				});
			}
		};
	}]);