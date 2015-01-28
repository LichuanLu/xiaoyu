'use strict';

//car page major controller
angular.module('xiaoyuApp.order')
	.controller('orderConfirmController', ['$scope', '$state', '$filter', '$previousState', 'CaptureService', '$templateCache',
		'$log', '$location', 'orderService', 'userId', 'defaultTimeConfig','dateTimeService',

		function($scope, $state, $filter, $previousState, CaptureService, $templateCache, $log, $location,
			orderService, userIdService, defaultTimeConfig,dateTimeService) {
			$log.log('orderConfirmController init');
			//give access from parent to child
			//$scope.setOrderConfirmScope($scope);

			$scope.initLayout = function() {
				var content = '';
				var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
				var title = '<span>订单确认</span>';

				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', rawContent[1], $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.initLayout();

			$scope.backAction = function() {
				$log.log('back action start');
				//call parent function to reverse change
				// $scope.resetWashStartTime();
				//$scope.toggleShow('orderConfirm');
				// $state.go('order');
				$previousState.go();
			};

			// $scope.getWashTimeStr = function(orderObj,dur) {
			// 	//充值 //洗车 // 包月 //1//2/3
			// 	var result = '';
			// 	var washStartTime = orderObj.washStartTime;
			// 	if(typeof washStartTime === 'string'){
			// 		washStartTime = moment(washStartTime);
			// 	}
			// 	if (orderObj.type == 2) {
			// 		result = washStartTime.format('MMMD日') + $filter('amRangeFormat')(washStartTime, 'HH:mm', dur);
			// 	} else if (orderObj.type == 3) {
			// 		if(!orderObj.duration){
			// 			$log.log('error:orderObj.duration is null');
			// 		}
			// 		var duration = moment.duration({
			// 			months: orderObj.duration
			// 		});
			// 		result = $filter('amRangeFormat')(washStartTime, 'll', duration);
			// 	}
			// 	return result;
			// };



			//for pay page param
			$scope.param1 = $scope.orderObj.id;
			$scope.param2 = $scope.orderObj.countPrice;
			$scope.param3 = $scope.orderObj.type;
			// $scope.orderObj.discountObj = '';
			$scope.param4 = $scope.orderObj.discountObj;

			$scope.dur = defaultTimeConfig.duration;
			// $scope.washTime = $scope.getWashTimeStr($scope.orderObj,$scope.dur);
			$scope.washTime = dateTimeService.getOrderWashTimeStr($scope.orderObj,$scope.dur);

			

			$scope.submitAction = function() {
				$log.log('submit action');
				//call submit order service
				// orderService.submitOrder(angular.copy($scope.orderObj)).then(function(data) {
				// 	$log.log('submit order success , redirect to pay page.');
				// 	// $location.path('/pay/' + data.orderId);
				// 	//"type":""    //充值 //洗车 // 包月 //1//2/3
				// 	//$location.path('/pay/'+userIdService.getData()).search({param1: data.id,param2:data.countPrice,param3:2});
				// 	// $state.go('pay',{'userId':userIdService.getData(),'param1': data.id,'param2':data.countPrice,'param3':2});
				// });

			};



		}
	]);