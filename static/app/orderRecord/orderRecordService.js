'use strict';

angular.module('xiaoyuApp.record')
//order service
.factory('recordOrderUpdate', [

	function() {
		var recordObj;
		var setRecordObj = function(record) {
			recordObj = record;
		};

		var getRecordObj = function() {
			return recordObj;
		};

		return {
			getRecordObj: getRecordObj,
			setRecordObj: setRecordObj
		};
	}
])

.factory('recordService', ['$http', 'userId', 'orderService',
	function($http, userId, orderService) {

		var getRecordList = function() {
			var id = userId.getData();
			// $http returns a promise, which has a then function, which also returns a promise
			var promise = $http({
				url: '/rest/Order/' + id + '/MyOrders',
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

		var rollBackOrder = function(orderId) {
			var status = 6;
			return orderService.changeOrderStatus(orderId,status);
		};

		var removeOrder = function(orderId) {
			var status = 9;
			return orderService.changeOrderStatus(orderId,status);
		};



		return {
			removeOrder:removeOrder,
			rollBackOrder:rollBackOrder,
			getRecordList: getRecordList
		};
	}
]);