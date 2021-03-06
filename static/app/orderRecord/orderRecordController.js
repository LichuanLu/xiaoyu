'use strict';

angular.module('xiaoyuApp.record')
	.controller('orderRecordController', ['$scope', '$state' ,'$log', '$location', '$templateCache', '$rootScope', '$filter',
		'CaptureService', 'recordService', 'recordOrderUpdate','userId',
		function($scope, $state ,$log, $location, $templateCache, $rootScope, $filter,
			CaptureService, recordService, recordOrderUpdate,userIdService) {
			$log.log('orderRecordController init');

			//load from service
			recordService.getRecordList().then(function(data) {
				$scope.recordList = data;
			});

			$scope.showRecord = true;
			//if status in array , it will be considerd as finished orders
			$scope.byFinishedStatus = [2, 3, 5, 6];
			$scope.byFinishedStatusString = ['2', '3', '5', '6'];

			$scope.finishedStatus = [4,7];
			$scope.finishedStatusString = ['4', '7'];

			$scope.filterByFinishedStatus = function(recordObj) {
				return ($scope.byFinishedStatus.indexOf(recordObj.status) !== -1 || $scope.byFinishedStatusString.indexOf(recordObj.status) !== -1);
			};


			$scope.filterFinishedStatus = function(recordObj) {
				return ($scope.finishedStatus.indexOf(recordObj.status) !== -1 || $scope.finishedStatusString.indexOf(recordObj.status) !== -1);
			};

			$scope.filterByUndeleteStatus = function(recordObj) {
				return (recordObj.status != 9);
			};

			//init order page
			$scope.initLayout = function() {
				var content = '';
				var title = '<span>我的订单</span>';
				CaptureService.setContentFor('title', title, $scope);
				CaptureService.setContentFor('leftbtn', content, $scope);
				CaptureService.setContentFor('rightbtn', content, $scope);
			};

			$scope.initLayout();
			$scope.payAction = function() {
				$scope.orderObj = angular.copy(recordOrderUpdate.getRecordObj());
				// if($scope.orderObj.type == 1){
				// 	$scope.toggleShow('orderConfirm');
				// }else if($scope.orderObj.type == 2){
				// 	$location.path('/pay/'+userIdService.getData()).search({
				// 		param1: $scope.orderObj.id,
				// 		param2: $scope.orderObj.countPrice,
				// 		//"type":""    //充值 //洗车//1//2/
				// 		param3: 2
				// 	});
				// }
				//新的逻辑会跳转到带状态的订单详情，然后支付
				//orderId,showState=true
				// .state('order', {
		  //         url:'/order/:userId?orderId&orderType&showState',
				var orderId = $scope.orderObj.id;
				if(orderId){
					//跳转到订单详细
					$state.go('record.detail',{'userId':userIdService.getData(),'orderId':orderId});
					// $state.go('order',{'userId':userIdService.getData(),'orderId':orderId,'orderType':$scope.orderObj.type,'showState':true});
				}else{
					$log.log('error:record pay action ,order id is null');
				}
				

			};


			$scope.removeAction = function() {
				$log.log('removeOrderFromWaitPay');
				$rootScope.toggle('removeOrderFromWaitPayOverlay', 'on');
			};


			$scope.confirmRemove = function() {
				$log.log('confirmRemove');
				var tarId = recordOrderUpdate.getRecordObj().id;
				var tarObj = $filter('filter')($scope.recordList, {
					id: tarId
				})[0];
				//call delete service if success then delete
				recordService.removeOrder(tarId).then(function(data) {
					//delete from list
					$scope.recordList.splice($scope.recordList.indexOf(tarObj), 1);
					$rootScope.toggle('removeOrderFromWaitPayOverlay', 'off');
				});

			};


			$scope.cancelRemove = function() {
				$rootScope.toggle('removeOrderFromWaitPayOverlay', 'off');
			};

			$scope.confirmDelete = function() {
				$log.log('confirmDelete');
				var tarId = recordOrderUpdate.getRecordObj().id;
				var tarObj = $filter('filter')($scope.recordList, {
					id: tarId
				})[0];
				//call delete service if success then delete
				recordService.rollBackOrder(tarId).then(function(data) {
					tarObj.status = 6;
					$rootScope.toggle('deleteOrderOverlay', 'off');
				});

			};


			$scope.cancelDelete = function() {
				$rootScope.toggle('deleteOrderOverlay', 'off');
			};

			$scope.deleteAction = function() {
				$rootScope.toggle('deleteOrderOverlay', 'on');
			};


			$scope.toggleShow = function(item) {
				switch (item) {
					case 'orderConfirm':
						$scope.showOrderConfirm = !$scope.showOrderConfirm;
						$scope.showRecord = !$scope.showRecord;
						break;
				}
			};

			//get access for child scope
			$scope.setOrderConfirmScope = function(orderConfirmScope) {
				$scope.orderConfirmScope = orderConfirmScope;
			};


			// $scope.$watch('showOrderConfirm', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showOrderConfirm Changed to show');
			// 		if ($scope.orderConfirmScope) {
			// 			$scope.orderConfirmScope.initLayout();
			// 		}

			// 	}
			// });

			//hide|show showRecord page
			// $scope.$watch('showRecord', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showRecord Changed to show');
			// 		$scope.initLayout();
			// 	}
			// });



		}
	]);