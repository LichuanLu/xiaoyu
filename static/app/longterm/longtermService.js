'use strict';

//car related service
angular.module('xiaoyuApp.longterm')
	.value('longtermDurationList', [{
		'id': 1,
		'label': '包月',
		'value': 1
	}, {
		'id': 2,
		'label': '半年',
		'value': 6
	}, {
		'id': 3,
		'label': '一年',
		'value': 12
	}])
	.factory('longtermService', ['$http', 'userId',
		function($http, userId) {
			var getRecordList = function() {
				var id = userId.getData();
				// $http returns a promise, which has a then function, which also returns a promise
				var promise = $http({
					url: '/rest/Order/' + id + '/MyLongTerms',
					method: 'get'
				}).then(function(response) {
					// The then function here is an opportunity to modify the response
					console.log(response);
					// The return value gets picked up by the then in the controller.
					return response.data.item;
				});
				// Return the promise to the controller
				return promise;
			};
			return {
				getRecordList: getRecordList
			};
		}
	]);