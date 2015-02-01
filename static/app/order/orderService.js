'use strict';

angular.module('xiaoyuApp.order')
	//order service
	.value('defaultOrder', {
		'user': { //用户信息
			'createdDate': '2014年-10月-31日 12:25:37',
			'id': 1,
			'money': 12,
			'name': '刘伟光',
			'phone': '18601391001',
			'points': 8888888,
			'role': null,
			'sex': 1,
			'status': 1,
			'times': 221,
			'type': 1,
			'updatedDate': '2014年-10月-31日 12:26:14',
			'weixinId': '12',
			'weixinToken': '132132123'
		},
		'userCar': {
			'car': {
				'id': 4,
				'name': '丰田霸道',
				'parent': null,
				'pic': '',
				'status': 1,
				'type': 2
			},
			'carNo': '京N 77777',
			'color': 0,
			'createdTime': '2014年-10月-31日 12:27:19',
			'default': true,
			'id': 4,
			'status': 0,
			'type': 0
		},
		'userAddress': {
			'address': {
				'id': 1,
				'name': '曙光花园小区',
				'parent': {
					'id': 3,
					'name': '北京',
					'parent': null,
					'status': 0,
					'type': 0
				},
				'status': 0,
				'type': 0
			},
			'comment': '3单元地下0451',
			'default': true,
			'id': 1,
			'status': 1,
			'type': 1
		},
		'washStartTime': '',
		'comment': ''
	})
	
.factory('orderService', ['$http', 'userId',
	function($http, userId) {
		var uid = userId.getData();

		var submitOrder = function(orderObj) {
			// $http returns a promise, which has a then function, which also returns a promise
			var promise = $http({
				url: '/rest/Order/Add',
				method: 'post',
				data: orderObj,
			}).then(function(response) {
				// The then function here is an opportunity to modify the response
				console.log(response);
				// The return value gets picked up by the then in the controller.
				return response.data.item;
			});
			// Return the promise to the controller
			return promise;
		};

		var getOrderPrice = function(carId, addressId) {
			var promise = $http({
				url: '/rest/Order/UserCar/' + carId + '/UserAddress/' + addressId + '/OrderPrice',
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


		var getDefaultOrder = function() {

			var promise = $http({
				url: '/rest/Order/' + uid + '/DefaultOrder',
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

		var getOrder = function(orderId) {
			var promise = $http({
				url: '/rest/Order/' + orderId + '/view',
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

		var changeOrderStatus = function(orderId, tarStatus) {
			//未支付=1，已支付=2，服务中=3，服务完成=4，订单已取消=6，现今支付=5 , 9 删除
			var promise = $http({
				url: '/rest/Order/' + orderId + '/OrderStatus/' + uid + '/' + tarStatus,
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


		var getOccupiedTimes = function() {
			var promise = $http({
				url: '/rest/time/occupiedTime',
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

		var getDynamicPrice = function(carId,duration) {
			var url;
			if(duration){
				url = '/rest/Order/Car/'+carId+'/Duration/'+duration+'/OrderPrice';

			}else{
				url = '/rest/Order/Car/'+carId+'/OrderPrice';
			}
			var promise = $http({
				url: url,
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
			getOrder: getOrder,
			getDynamicPrice: getDynamicPrice,
			changeOrderStatus: changeOrderStatus,
			getDefaultOrder: getDefaultOrder,
			submitOrder: submitOrder,
			getOrderPrice: getOrderPrice,
			getOccupiedTimes: getOccupiedTimes
		};
	}
])

.factory('updateOrderCommentService', ['$rootScope',
	function($rootScope) {
		var orderComment;

		var broadcast = function(orderComment) {
			$rootScope.$broadcast('updateOrderComment.update', orderComment);
		};

		var update = function(comment) {
			orderComment = comment;
			broadcast(orderComment);
		};

		var getNewOrderComment = function() {
			return orderComment;
		};

		return {
			update: update,
			getNewOrderComment: getNewOrderComment
		};
	}
]);