'use strict';

angular.module('xiaoyuApp.user')
	.factory('userId', ['$http','$location','$stateParams',
		function($http,$location,$stateParams) {
			// var userId = null;
			// var weixinId = 123;
			// var promise = $http.get('/rest/User/' + weixinId + '/Id').success(function(data) {
			// 	userId = data.item.userId;
			// });
			// var params = $location.search();
			// var userId = params.userId?params.userId:1;
			var userId;
			if($stateParams.userId){
				userId = $stateParams.userId;
			}
			console.log('userId:'+userId);
			var setData = function(data) {
				userId = data;
			};
			var getData = function() {
				return userId;
			};
			return {
				// promise: promise,
				setData: setData,
				getData: getData

			};
		}
	])
	.factory('updateUserObjService', ['$rootScope',

		function($rootScope) {
			var newUserObj;

			var broadcast = function(userObj) {
				$rootScope.$broadcast('updateUserObj.update', userObj);
			};

			var update = function(userObj) {
				newUserObj = userObj;
				broadcast(newUserObj);
			};

			var updateOldObj = function(newObj, oldObj) {
				oldObj.name = newObj.name ;
				oldObj.sex = newObj.sex;
				oldObj.phone = newObj.phone ;
			};


			return {
				update: update,
				updateOldObj: updateOldObj
			};
		}
	])
	.factory('updateUserPhoneService', ['$rootScope',

		function($rootScope) {
			var newUserObj;

			var broadcast = function(userObj) {
				$rootScope.$broadcast('updateUserPhone.update', userObj);
			};

			var update = function(userObj) {
				newUserObj = userObj;
				broadcast(newUserObj);
			};

			var updateOldObj = function(newPhone, oldPhone) {
				oldPhone = newPhone;
			};


			return {
				update: update,
				updateOldObj: updateOldObj
			};
		}
	])
	.factory('updateUserNameService', ['$rootScope',

		function($rootScope) {
			var newUserObj;

			var broadcast = function(userObj) {
				$rootScope.$broadcast('updateUserName.update', userObj);
			};

			var update = function(userObj) {
				newUserObj = userObj;
				broadcast(newUserObj);
			};

			var updateOldObj = function(newPhone, oldPhone) {
				oldPhone = newPhone;
			};


			return {
				update: update,
				updateOldObj: updateOldObj
			};
		}
	])
	.factory('userService', ['userId', '$http',
		function(userId, $http) {
			var getUserInfo = function() {
				var promise = $http({
					url: '/rest/User/' + userId.getData() + '/View',
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
			var updateUser = function(userObj) {
				var promise = $http({
					url: '/rest/User/Update',
					method: 'post',
					data: userObj
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
				getUserInfo: getUserInfo,
				updateUser: updateUser
			};
		}
	]);