'use strict';

//car related service
angular.module('xiaoyuApp.location')
	.value('areaId', 3)
	.value('emptyLocationObj', {
		'address': {
			'id': 0,
			'name': '',
			'parent': {
				'id': 0,
				'name': '',
				'parent': null,
				'status': 0,
				'type': 0
			},
			'status': 0,
			'type': 0
		},
		'comment': '',
		'default': null,
		'id': 0,
		'status': 0,
		'type': 0

	})
	.factory('updateLocationListService', ['$filter',

		function($filter) {
			var locationList;
			var getLocationList = function() {
				return locationList;
			};
			var setLocationList = function(list) {
				locationList = list;
			};
			var addLocation = function(locationObj) {
				if (locationObj) {
					locationList.push(locationObj);
				}

			};
			var deleteLocation = function(locationId) {
				if (locationId) {
					var tarObj = $filter('filter')(locationList, function(item) {
						return item.id == locationId;
					})[0];
					if (tarObj) {
						locationList.splice(locationList.indexOf(tarObj), 1);
					}
				}
			};
			return {
				addLocation: addLocation,
				deleteLocation:deleteLocation,
				getLocationList: getLocationList,
				setLocationList: setLocationList
			};
		}
	])
	.factory('updateLocationObjService', ['$rootScope', 'emptyLocationObj',
		function($rootScope, emptyLocationObj) {
			var oldLocationObj;
			var newLocationObj = emptyLocationObj;

			var broadcast = function(locationObj) {
				$rootScope.$broadcast('updateLocationObj.update', locationObj);
			};

			var updateOldLocation = function() {
				//update location, locationNo and color
				oldLocationObj.address = newLocationObj.address;
				oldLocationObj.comment = newLocationObj.comment;
			};

			var update = function(locationObj) {
				newLocationObj = locationObj;
				broadcast(newLocationObj);
			};

			var getOldLocationObj = function() {
				return oldLocationObj;
			};

			var getNewLocationObj = function() {
				return newLocationObj;
			};

			var setOldLocationObj = function(locationObj) {
				oldLocationObj = locationObj;
			};

			return {
				update: update,
				updateOldLocation: updateOldLocation,
				getOldLocationObj: getOldLocationObj,
				getNewLocationObj: getNewLocationObj,
				setOldLocationObj: setOldLocationObj

			};
		}
	])
	.factory('locationService', ['$http', 'userId', 'areaId',
		function($http, userId, areaId) {
			var locationService = {
				getLocationList: function() {
					// $http returns a promise, which has a then function, which also returns a promise
					var id = userId.getData();
					var promise = $http({
						url: '/rest/UserAddress/' + id + '/ListAddresses',
						method: 'get'
					}).then(function(response) {
						// The then function here is an opportunity to modify the response
						console.log(response);
						// The return value gets picked up by the then in the controller.
						return response.data.item;
					});
					// Return the promise to the controller
					return promise;
				},
				getAddList: function() {
					var id = areaId;
					var promise = $http({
						url: '/rest/Address/' + id + '/ListAddresses',
						method: 'get'

					}).then(function(response) {
						// The then function here is an opportunity to modify the response
						console.log(response);
						// The return value gets picked up by the then in the controller.
						return response.data.item;
					});
					// Return the promise to the controller
					return promise;
				},
				addNewLocation: function(locationObj) {
					var id = userId.getData();
					var promise = $http({
						url: '/rest/UserAddress/Add',
						method: 'post',
						data: {
							address: locationObj.address,
							user: {
								id: id
							},
							comment: locationObj.comment
						}
					}).then(function(response) {
						// The then function here is an opportunity to modify the response
						console.log(response);
						// The return value gets picked up by the then in the controller.
						return response.data.item;
					});
					// Return the promise to the controller
					return promise;


				},
				updateLocation: function(locationObj) {
					var id = userId.getData();
					var promise = $http({
						url: '/rest/UserAddress/Update',
						method: 'post',
						data: {
							address: locationObj.address,
							user: {
								id: id
							},
							id: locationObj.id,
							comment: locationObj.comment
						}
					}).then(function(response) {
						// The then function here is an opportunity to modify the response
						console.log(response);
						// The return value gets picked up by the then in the controller.
						return response.data.item;
					});
					// Return the promise to the controller
					return promise;

				},
				deleteLocation: function(id) {
					var promise = $http({
						url: '/rest/UserAddress/'+id+'/Delete',
						method: 'get'
					}).then(function(response) {
						// The then function here is an opportunity to modify the response
						console.log(response);
						// The return value gets picked up by the then in the controller.
						return response.data.item;
					});
					// Return the promise to the controller
					return promise;

				}
			};
			return locationService;
		}
	]);