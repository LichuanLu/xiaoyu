'use strict';

angular.module('xiaoyuApp.order')
	.controller('orderController', ['$scope', '$rootScope', '$q', '$state', '$stateParams', '$log', '$timeout', 'CaptureService', 'orderService',
		'updateOrderCommentService', 'defaultOrder', 'updateUserObjService', 'updateCarObjService', 'updateLocationObjService','emptyCarObj',
		'carService', 'locationService', 'longtermDurationList', 'orderDetailService', 'defaultTimeConfig',
		'recordService', 'userId', 'validateMessage', 'validateService',
		function($scope, $rootScope, $q, $state, $stateParams, $log, $timeout, CaptureService,
			orderService, updateOrderCommentService, defaultOrder, updateUserObjService,
			updateCarObjService, updateLocationObjService,emptyCarObj,carService, locationService,
			longtermDurationList, orderDetailService, defaultTimeConfig, recordService, userIdService,
			 validateMessage, validateService) {
			console.log('orderController');

			$scope.durationList = longtermDurationList;
			$scope.dynamicPrice = 0;
			$scope.dur = defaultTimeConfig.duration;
			$scope.showState = false;
			//init orderObj
			if (!$scope.isUndefined($stateParams.orderId)) {
				orderService.getOrder($stateParams.orderId).then(function(data) {

					$scope.initOrderParam(data);
					if ($stateParams.showState == 'true') {
						var result = orderDetailService.generateBswizardData(data);
						if (result) {
							$scope.bswizardData = result;
						}
						$scope.showState = true;
					}



				});

			} else {
				orderService.getDefaultOrder().then(function(data) {
					$scope.initOrderParam(data);
				});

			}


			$scope.initOrderParam = function(data) {
				$scope.orderObj = data;
				//必须重置，否则有可能会出现已经过了的日期
				$scope.orderObj.washStartTime = '';

				if (typeof $stateParams.orderType !== 'undefined') {
					$scope.orderObj.type = $stateParams.orderType;
				} else {
					$scope.orderObj.type = 2;
				}
				$scope.orderObj.discountObj = {};
				//如果没有默认车说明没有下过单，去第一次下单，同时如果第一次下单，需要不用的动态价格方法
				if ($scope.orderObj.userCar && $scope.orderObj.userCar.id) {
					$state.go('order.second');
					$scope.watchCarChange('orderObj.userCar.car');
					$scope.watchDurationChange(2);
				} else {
					$state.go('order.first');
					$scope.currentCar = updateCarObjService.getNewCarObj();
					$scope.watchCarChange('currentCar.car');
					$scope.watchDurationChange(1);

				}

			};

			$scope.watchDurationChange = function(type) {
				if ($scope.orderObj.type == 3) {
					$scope.$watch('orderObj.duration', function(newValue, oldValue) {
						if (newValue) {
							var carId;
							if (type == 2) {
								if ($scope.orderObj.userCar && $scope.orderObj.userCar.id) {
									carId = $scope.orderObj.userCar.id;
								}

							} else if (type == 1) {
								if ($scope.currentCar.car && $scope.currentCar.car.id) {
									carId = $scope.currentCar.car.id;
								}

							}
							if (carId) {
								orderService.getDynamicPrice(carId, newValue).then(function(data) {
									$scope.dynamicPrice = data;
								});
							}

						}


					});
				}
			};

			$scope.watchCarChange = function(watchObj) {
				$scope.$watch(watchObj, function(newValue, oldValue) {
					if (newValue) {
						$log.log('userCar car Changed');
						//包月订单需要加入duration id
						if ($scope.orderObj.type == 3) {
							if (newValue.id && $scope.orderObj.duration) {
								orderService.getDynamicPrice(newValue.id, $scope.orderObj.duration).then(function(data) {
									$scope.dynamicPrice = data;
								});
							}

						} else {
							if (newValue.id) {
								orderService.getDynamicPrice(newValue.id).then(function(data) {
									$scope.dynamicPrice = data;
								});
							}
						}

					}
				});


			};

			//$scope.carScope = null;
			//jquery way
			// $('#orderList > a').click(function(e) {
			// 	e.preventDefault();
			// 	console.log('jquery click order link');
			// });
			//$scope.showOrder = true;

			$scope.gotoWashTimePage = function() {
				$state.go('order.washtime');
			};


			$scope.removeAction = function() {
				$log.log('removeOrderFromWaitPay');
				$rootScope.toggle('removeOrderFromWaitPayOverlay', 'on');
			};


			$scope.confirmRemove = function() {
				$log.log('confirmRemove');
				var tarId = $scope.orderObj.id;
				// var tarId = recordOrderUpdate.getRecordObj().id;
				// var tarObj = $filter('filter')($scope.recordList, {
				// 	id: tarId
				// })[0];
				//call delete service if success then delete
				if (tarId) {
					recordService.removeOrder(tarId).then(function(data) {
						$rootScope.toggle('removeOrderFromWaitPayOverlay', 'off');
						$state.go('record.list', {
							'userId': userIdService.getData()
						})
					});
				} else {
					$log.log("error:remove tarId error");
				}


			};

			$scope.cancelRemove = function() {
				$rootScope.toggle('removeOrderFromWaitPayOverlay', 'off');
			};

			//toggle show order|child page
			// $scope.toggleShow = function(item) {
			// 	switch (item) {
			// 		case 'car':
			// 			$scope.showCar = !$scope.showCar;
			// 			$scope.showOrder = !$scope.showOrder;
			// 			break;
			// 		case 'carUpdate':
			// 			$scope.showCarUpdate = !$scope.showCarUpdate;
			// 			$scope.showCar = !$scope.showCar;
			// 			break;
			// 		case 'carNoUpdate':
			// 			$scope.showCarNoUpdate = !$scope.showCarNoUpdate;
			// 			$scope.showCarUpdate = !$scope.showCarUpdate;
			// 			break;
			// 		case 'carColorUpdate':
			// 			$scope.showCarColorUpdate = !$scope.showCarColorUpdate;
			// 			$scope.showCarUpdate = !$scope.showCarUpdate;
			// 			break;
			// 		case 'carType':
			// 			$scope.showCarType = !$scope.showCarType;
			// 			$scope.showCarUpdate = !$scope.showCarUpdate;
			// 			break;
			// 		case 'carTypeUpdate':
			// 			$scope.showCarTypeUpdate = !$scope.showCarTypeUpdate;
			// 			$scope.showCarType = !$scope.showCarType;
			// 			break;
			// 		case 'carTypeUpdateCommit':
			// 			$scope.showCarTypeUpdate = !$scope.showCarTypeUpdate;
			// 			$scope.showCarUpdate = !$scope.showCarUpdate;
			// 			break;

			// 		case 'location':
			// 			$scope.showLocation = !$scope.showLocation;
			// 			$scope.showOrder = !$scope.showOrder;
			// 			break;
			// 		case 'locationUpdate':
			// 			$scope.showLocationUpdate = !$scope.showLocationUpdate;
			// 			$scope.showLocation = !$scope.showLocation;
			// 			break;
			// 		case 'locationCommentUpdate':
			// 			$scope.showLocationCommentUpdate = !$scope.showLocationCommentUpdate;
			// 			$scope.showLocationUpdate = !$scope.showLocationUpdate;
			// 			break;
			// 		case 'locationAddUpdate':
			// 			$scope.showLocationAddUpdate = !$scope.showLocationAddUpdate;
			// 			$scope.showLocationUpdate = !$scope.showLocationUpdate;
			// 			break;
			// 		case 'orderTime':
			// 			$scope.showOrderTime = !$scope.showOrderTime;
			// 			$scope.showOrder = !$scope.showOrder;
			// 			break;
			// 		case 'orderComment':
			// 			$scope.showOrderComment = !$scope.showOrderComment;
			// 			$scope.showOrder = !$scope.showOrder;
			// 			break;
			// 		case 'orderConfirm':
			// 			$scope.showOrderConfirm = !$scope.showOrderConfirm;
			// 			$scope.showOrder = !$scope.showOrder;
			// 			break;
			// 		case 'user':
			// 			$scope.showUser = !$scope.showUser;
			// 			$scope.showOrder = !$scope.showOrder;
			// 			break;
			// 	}

			// };

			//init order page
			// $scope.initLayout = function() {
			// 	$log.log('order page init');

			// 	var content = '';
			// 	var title = '<span>洗车订单</span>';
			// 	CaptureService.setContentFor('title', title, $scope);
			// 	CaptureService.setContentFor('leftbtn', content, $scope);
			// 	CaptureService.setContentFor('rightbtn', content, $scope);
			// };
			// $scope.initLayout();


			// $scope.$on('updateOrder.time', function(event, newOrderTime) {
			// 	$log.log('newOrderTime:'+newOrderTime);
			// });

			//get access for child scope
			// $scope.setCarScope = function(carScope) {
			// 	$scope.carScope = carScope;
			// };


			// //get access for update car scope
			// $scope.setCarUpdateScope = function(carUpdateScope) {
			// 	$scope.carUpdateScope = carUpdateScope;
			// };

			// //get access for update car No scope
			// $scope.setCarNoUpdateScope = function(carNoUpdateScope) {
			// 	$scope.carNoUpdateScope = carNoUpdateScope;
			// };

			// //get access for update car color scope
			// $scope.setCarColorUpdateScope = function(carColorUpdateScope) {
			// 	$scope.carColorUpdateScope = carColorUpdateScope;
			// };


			// //get access for get all car type scope
			// $scope.setCarTypeScope = function(carTypeScope) {
			// 	$scope.carTypeScope = carTypeScope;
			// };

			// //get access for update car type scope
			// $scope.setCarTypeUpdateScope = function(carTypeUpdateScope) {
			// 	$scope.carTypeUpdateScope = carTypeUpdateScope;
			// };


			// //get access for child scope
			// $scope.setLocationScope = function(locationScope) {
			// 	$scope.locationScope = locationScope;
			// };

			// //get access for update location scope
			// $scope.setLocationUpdateScope = function(locationUpdateScope) {
			// 	$scope.locationUpdateScope = locationUpdateScope;
			// };

			// $scope.setLocationCommentUpdateScope = function(locationCommentUpdateScope) {
			// 	$scope.locationCommentUpdateScope = locationCommentUpdateScope;
			// };

			// $scope.setAddUpdateScope = function(addUpdateScope) {
			// 	$scope.addUpdateScope = addUpdateScope;
			// };

			// $scope.setOrderTimeScope = function(orderTimeScope) {
			// 	$scope.orderTimeScope = orderTimeScope;
			// };

			// $scope.setOrderCommentScope = function(orderCommentScope) {
			// 	$scope.orderCommentScope = orderCommentScope;
			// };

			// $scope.setOrderConfirmScope = function(orderConfirmScope) {
			// 	$scope.orderConfirmScope = orderConfirmScope;
			// };

			// $scope.setUserScope = function(userScope) {
			// 	$scope.userScope = userScope;
			// };

			//click add car in second order page
			$scope.addCarAction = function() {
				//at first , should reset the new car to default car
				updateCarObjService.update(angular.copy(emptyCarObj));
				$state.go('car.update');
			};

			//change order car obj
			$scope.setCar = function(car) {
				$scope.orderObj.userCar = car;
			};

			//change order location obj
			$scope.setLocation = function(location) {
				$scope.orderObj.userAddress = location;
			};



			//change order wash time 
			$scope.setWashStartTime = function(washStartTime) {
				$log.log(washStartTime);
				$scope.orderObj.washStartTime = washStartTime;
			};

			//change order long term duration 
			// $scope.setDuration = function(durationId) {
			// 	$log.log(durationId);
			// 	$scope.orderObj.durationId = durationId;
			// };


			// $scope.updateWashStartTime = function() {
			// 	//$scope.oldWashStartTime = $scope.washStartTime;
			// 	$scope.toggleShow('orderTime');
			// };

			//change order comment 
			// $scope.setOrderComment = function(orderComment) {
			// 	$scope.orderObj.comment = orderComment;
			// };


			// $scope.updateOrderComment = function() {
			// 	updateOrderCommentService.update($scope.orderObj.comment);
			// 	$scope.toggleShow('orderComment');
			// };

			// $scope.updateUser = function() {
			// 	updateUserObjService.update(angular.copy($scope.orderObj.user));
			// 	$scope.toggleShow('user');
			// };

			$scope.confirmOrder = function() {
				// var cid = $scope.orderObj.userCar.id;
				// var aid = $scope.orderObj.userAddress.id;
				// orderService.getOrderPrice(cid, aid).then(function(data) {
				// 	if (data) {
				// 		$scope.orderObj.countPrice = data;
				// 		//$scope.toggleShow('orderConfirm');
				// 		$state.go('order.confirm');
				// 	}
				// });

				//submit the order , and the order status is wait to pay
				orderService.submitOrder(angular.copy($scope.orderObj)).then(function(data) {
					$log.log('submit order success , redirect to pay page.');
					// $location.path('/pay/' + data.orderId);
					//"type":""    //充值 //洗车 // 包月 //1//2/3
					//$location.path('/pay/'+userIdService.getData()).search({param1: data.id,param2:data.countPrice,param3:2});
					if (data) {
						$scope.orderObj.countPrice = data.countPrice;
						$scope.orderObj.id = data.id;
						//$scope.orderObj.type = data.type;
						//for type 3
						$scope.orderObj.washStartTime = data.washStartTime;
						$scope.orderObj.startOrderTime = data.startOrderTime;
						$scope.orderObj.duration = data.duration;
						$state.go('order.confirm');
					}
					// $state.go('pay',{'userId':userIdService.getData(),'param1': data.id,'param2':data.countPrice,'param3':2});
				});
			};

			$scope.submitOrder = function() {
				// carService.addNewCar(updateCarObjService.getNewCarObj()).then(function(data) {
				// 	if (data) {
				// 		$log.log('add new car success!');
				// 		updateCarListService.addCar(data);
				// 		//$scope.toggleShow('carUpdate');
				// 		$previousState.go('carUpdateEntrypoint');


				// 	} else {
				// 		$log.log('add new car fail!');
				// 	}
				// });



				//first check user and washtime
				if (!$scope.orderObj.user) {
					$scope.toggle('userWarning', 'on');
					$timeout(function() {
						$scope.toggle('userWarning', 'off');
					}, 1500);
				} else if (!$scope.orderObj.washStartTime && $scope.orderObj.type == 2) {
					$scope.toggle('washTimeWarning', 'on');
					$timeout(function() {
						$scope.toggle('washTimeWarning', 'off');
					}, 1500);
				} else if (!$scope.orderObj.duration && $scope.orderObj.type == 3) {
					$scope.toggle('longTearmWarning', 'on');
					$timeout(function() {
						$scope.toggle('longTearmWarning', 'off');
					}, 1500);
				} else if ($scope.orderObj.user.phone === '') {
					$scope.inputError = true;
					$scope.fieldMessage = validateMessage.emptyInputError;
				} else if (!validateService.mobileValidate($scope.orderObj.user.phone)) {
					$scope.inputError = true;
					$scope.fieldMessage = validateMessage.mobileInputError;
				} else {
					//first conmmit
					if ($state.is('order.first')) {
						//check car and address
						var newCarObj = updateCarObjService.getNewCarObj();
						var newLocationObj = updateLocationObjService.getNewLocationObj();
						if (!newCarObj.carNo || !newCarObj.car.name) {
							$scope.toggle('carWarning', 'on');
							$timeout(function() {
								$scope.toggle('carWarning', 'off');
							}, 1500);
						} else if (!newLocationObj.address.name || !newLocationObj.comment) {
							$scope.toggle('addressWarning', 'on');
							$timeout(function() {
								$scope.toggle('addressWarning', 'off');
							}, 1500);
						} else {
							//add new car and add new location
							var addNewCarPro = carService.addNewCar(newCarObj);
							var addNewLocationPro = locationService.addNewLocation(newLocationObj);

							$q.all([addNewCarPro, addNewLocationPro]).then(function(results) {
								if (results[0]) {
									$log.log('car results:' + results[0]);
									$scope.setCar(results[0]);
								}
								if (results[1]) {
									$log.log('location results:' + results[1]);
									$scope.setLocation(results[1]);
								}
								$scope.confirmOrder();
							});

						}

					} else {
						//second commit
						//check car and address
						if (!$scope.orderObj.userCar) {
							$scope.toggle('carWarning', 'on');
							$timeout(function() {
								$scope.toggle('carWarning', 'off');
							}, 1500);
						} else if (!$scope.orderObj.userAddress) {
							$scope.toggle('addressWarning', 'on');
							$timeout(function() {
								$scope.toggle('addressWarning', 'off');
							}, 1500);
						} else {
							$scope.confirmOrder();
						}

					}
				}

			};



			//hide|show car page
			// $scope.$watch('showCar', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showCar Changed to show');
			// 		if ($scope.carScope) {
			// 			$scope.carScope.initLayout();
			// 		}

			// 	}
			// });

			// //hide|show car page
			// $scope.$watch('showCarUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('car update Changed to show');
			// 		if ($scope.carUpdateScope) {
			// 			$scope.carUpdateScope.initLayout();
			// 		}

			// 	}
			// });

			// //hide|show car No page
			// $scope.$watch('showCarNoUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('car No update Changed to show');
			// 		if ($scope.carNoUpdateScope) {
			// 			$scope.carNoUpdateScope.initLayout();
			// 		}

			// 	}
			// });


			// //hide|show car color page
			// $scope.$watch('showCarColorUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('car Color update Changed to show');
			// 		if ($scope.carColorUpdateScope) {
			// 			$scope.carColorUpdateScope.initLayout();
			// 		}

			// 	}
			// });


			// //hide|show car type page
			// $scope.$watch('showCarType', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('car type Changed to show');
			// 		if ($scope.carTypeScope) {
			// 			$scope.carTypeScope.initLayout();
			// 		}

			// 	}
			// });

			// //hide|show car type update page
			// $scope.$watch('showCarTypeUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('car type update Changed to show');
			// 		if ($scope.carTypeUpdateScope) {
			// 			$scope.carTypeUpdateScope.initLayout();
			// 		}

			// 	}
			// });


			// //hide|show location page
			// $scope.$watch('showLocation', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showLocation Changed to show');
			// 		if ($scope.locationScope) {
			// 			$scope.locationScope.initLayout();
			// 		}

			// 	}
			// });

			// //hide|show car page
			// $scope.$watch('showLocationUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('location update Changed to show');
			// 		if ($scope.locationUpdateScope) {
			// 			$scope.locationUpdateScope.initLayout();
			// 		}

			// 	}
			// });

			// $scope.$watch('showLocationCommentUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('location update comment Changed to show');
			// 		if ($scope.locationCommentUpdateScope) {
			// 			$scope.locationCommentUpdateScope.initLayout();
			// 		}

			// 	}
			// });

			// $scope.$watch('showLocationAddUpdate', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('location update add Changed to show');
			// 		if ($scope.addUpdateScope) {
			// 			$scope.addUpdateScope.initLayout();
			// 		}

			// 	}
			// });

			// $scope.$watch('showOrderTime', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('wash start time Changed to show');
			// 		if ($scope.orderTimeScope) {
			// 			$scope.orderTimeScope.initLayout();
			// 		}

			// 	}
			// });

			// $scope.$watch('showOrderComment', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('order comment Changed to show');
			// 		if ($scope.orderCommentScope) {
			// 			$scope.orderCommentScope.initLayout();
			// 		}

			// 	}
			// });


			// $scope.$watch('showOrderConfirm', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('order confirm Changed to show');
			// 		if ($scope.orderConfirmScope) {
			// 			$scope.orderConfirmScope.initLayout();
			// 		}

			// 	}
			// });


			// $scope.$watch('showUser', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('user Changed to show');
			// 		if ($scope.userScope) {
			// 			$scope.userScope.initLayout();
			// 		}

			// 	}
			// });



			// //hide|show order page
			// $scope.$watch('showOrder', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showOrder Changed to show');
			// 		$scope.initLayout();

			// 	}
			// });

		}
	]);