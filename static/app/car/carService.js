'use strict';

//car related service
angular.module('xiaoyuApp.car')
	.value('emptyCarObj', {
		'car': {
			'id': 0,
			'name': '',
			'parent': null,
			'pic': '',
			'status': 0,
			'type': 0
		},
		'carNo': '',
		'color': '',
		'createdTime': '',
		'default': '',
		'id': 0,
		'status': 0,
		'type': 0
	})
	.factory('updateCarListService', ['$filter',

		function($filter) {
			var carList;
			var getCarList = function() {
				return carList;
			};
			var setCarList = function(list) {
				carList = list;
			};
			var addCar = function(carObj) {
				if (carObj) {
					carList.push(carObj);
				}

			};

			var deleteCar = function(carId) {
				if (carId) {
					var tarObj = $filter('filter')(carList, function(item) {
						return item.id == carId;
					})[0];
					if (tarObj) {
						carList.splice(carList.indexOf(tarObj), 1);
					}
				}
			};
			return {
				addCar: addCar,
				deleteCar:deleteCar,
				getCarList: getCarList,
				setCarList: setCarList
			};
		}
	])
	//get all car by brand
	.factory('updateCarTypeService', ['$rootScope',

		function($rootScope) {
			var carTypeList = {};
			var getCarTypeList = function() {
				return carTypeList;
			};
			var setCarTypeList = function(list) {
				carTypeList = list;
				$rootScope.$broadcast('updateCarType.update', carTypeList);
			};

			return {
				getCarTypeList: getCarTypeList,
				setCarTypeList: setCarTypeList
			};
		}
	])
	.factory('updateCarObjService', ['$rootScope', 'emptyCarObj',
		function($rootScope, emptyCarObj) {
			var oldCarObj;
			var newCarObj = emptyCarObj;

			var broadcast = function(carObj) {
				$rootScope.$broadcast('updateCarObj.update', carObj);
			};

			var updateOldCar = function() {
				//update car, carNo and color
				oldCarObj.car = newCarObj.car;
				oldCarObj.carNo = newCarObj.carNo;
				oldCarObj.color = newCarObj.color;
			};

			var update = function(carObj) {
				newCarObj = carObj;
				//broadcast(newCarObj);
			};

			var getOldCarObj = function() {
				return oldCarObj;
			};

			var getNewCarObj = function() {
				return newCarObj;
			};

			var setOldCarObj = function(carObj) {
				oldCarObj = carObj;
			};

			return {
				update: update,
				updateOldCar: updateOldCar,
				getOldCarObj: getOldCarObj,
				getNewCarObj: getNewCarObj,
				setOldCarObj: setOldCarObj

			};
		}
	])
	.factory('carService', ['$http', 'userId',
		function($http, userId) {
			var carService = {
				getCarList: function() {
					// $http returns a promise, which has a then function, which also returns a promise
					var id = userId.getData();
					var promise = $http({
						url: '/rest/UserCar/' + id + '/ListCar',
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
				addNewCar: function(carObj) {
					var id = userId.getData();
					var promise = $http({
						url: '/rest/UserCar/Add',
						method: 'post',
						data: {
							car: carObj.car,
							user: {
								id: id
							},
							color: carObj.color,
							carNo: carObj.carNo
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
				updateCar: function(carObj) {
					var id = userId.getData();
					var promise = $http({
						url: '/rest/UserCar/Update',
						method: 'post',
						data: {
							car: carObj.car,
							user: {
								id: id
							},
							id: carObj.id,
							color: carObj.color,
							carNo: carObj.carNo
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
				getCarListByBrand: function(id) {
					var parentId = id ? id : 0;
					var promise = $http({
						url: '/rest/Car/' + parentId + '/ListCars',
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
				deleteCar: function(id) {
					if (id) {
						var promise = $http({
							url: '/rest/UserCar/' + id + '/Delete',
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


				}
			};
			return carService;
		}
	]);