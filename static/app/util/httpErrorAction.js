'use strict';

angular.module('xiaoyuApp')
	.factory('httpErrorAction', ['$rootScope','$timeout',

		function($rootScope,$timeout) {

			var httpErrorMessage = '';
			var broadcast = function(message) {
				$rootScope.$broadcast('httpErrorMessage.update', message);
			};

			var update = function(message) {
				httpErrorMessage = message;
				broadcast(httpErrorMessage);
			};

			var baseErrorHandler = function() {
				$rootScope.toggle('httpError', 'on');
				$timeout(function() {
					$rootScope.toggle('httpError', 'off');
				}, 1500);
			};

			var messageErrorHandler = function() {
				$rootScope.toggle('httpMessageError', 'on');
				$timeout(function() {
					$rootScope.toggle('httpMessageError', 'off');
				}, 1500);
			};

			return {
				update:update,
				httpErrorMessage:httpErrorMessage,
				baseErrorHandler: baseErrorHandler,
				messageErrorHandler: messageErrorHandler

			};
		}
	]);