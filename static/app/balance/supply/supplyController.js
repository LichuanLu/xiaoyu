'use strict';

//car update page  controller
angular.module('xiaoyuApp.balance')
	.controller('supplyController', ['$scope', 'CaptureService','$window','$templateCache', '$log', '$filter',
		'$location', 'supplyService', 'userId','thirdPayService',

		function($scope, CaptureService,$window, $templateCache, $log, $filter, $location,
		 supplyService, userIdService,thirdPayService) {
			$log.log('supplyController Controller init');
			//give access from parent to child
			// $scope.setSupplyScope($scope);

			// supplyService.getActList().then(function(data) {
			// 	$scope.$emit('HideLoading');
			// 	$scope.actList = data;
			// 	$scope.selectedAct = $scope.actList[0].id;
			// });
			$scope.supplyPoint = '';
			$scope.selectedPayType = 2;
			$scope.selectedAct = 0;

			// $scope.$watch('selectedAct', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('selectedAct change');
			// 		var currentObj = $filter('filter')($scope.actList, function(item) {
			// 			return item.id == newValue;
			// 		})[0];
			// 		$scope.price = currentObj.inMoney;
			// 	}
			// });

			// $scope.initLayout = function() {
			// 	var content = '';
			// 	//disable back action , use cancel to back , in order to prevent wrong action
			// 	//var rawContent = $templateCache.get('/static/app/common/backBtn.tpl.html');
			// 	var title = '<span>用户充值</span>';
			// 	CaptureService.setContentFor('title', title, $scope);
			// 	CaptureService.setContentFor('leftbtn',content, $scope);
			// 	CaptureService.setContentFor('rightbtn', content, $scope);
			// };

			//$scope.initLayout();

			// $scope.backAction = function() {
			// 	$log.log('supply back action start');
			// 	// $scope.toggleShow('supply');
			// };

			//"type":""    //充值 //洗车 // 包月 //1//2/3
			$scope.generateOrderId = function() {
				//var orderObj = {};
				var result;
				if ($scope.supplyPoint >= 200) {
					//orderObj.countPrice = $scope.supplyPoint;
					//orderObj.type = 1;
					//result = orderService.submitOrder(orderObj);
					result = supplyService.getSupplyOrder($scope.selectedAct,$scope.supplyPoint);
				} else {
					alert('至少充值200元');
				}
				return result;
			};

			$scope.submitAction = function() {
				//get orderId , price
				var activityId = '';
				var promise = $scope.generateOrderId();
				if (promise) {
					promise.then(function(data) {
						$log.log('submit order success , redirect to pay page.');
						// $location.path('/pay/' + data.orderId);
						//"type":""    //充值 //洗车 // 包月 //1//2/3
						//$location.path('/pay/'+userIdService.getData()).search({param1: data.id,param2:data.countPrice,param3:2});
						if (data && data.id) {
							$scope.countPrice = $scope.supplyPoint;
							$scope.orderId = data.id;
							$scope.payAction(activityId);
						}else{
							$log.log('error:generate orderId error');
						}
					});
				}

				// supplyService.getSupplyOrder($scope.selectedAct).then(function(data) {
				// 	var orderId = data.id;
				// 	var price = $scope.price;
				// 	$location.path('/pay/' + userIdService.getData()).search({
				// 		param1: orderId,
				// 		param2: price,
				// 		param3: 1
				// 	});
				// });



			};

			$scope.payAction = function(activityId) {
				$log.log('select pay type:' + $scope.selectedPayType);
				switch ($scope.selectedPayType) {
					case 0:
						$scope.leftPointsPayAction(activityId);
						break;
					case 1:
						$scope.aliPayAction(activityId);
						break;
					case 2:
						$scope.wechatAction(activityId);
						break;
				}

			};

			$scope.aliPayAction = function(activityId) {
				//send order id , pay money and points to getAliPay
				///rest/Pay/{userId}/{orderId}/balance/{balance}/payType/{payType}/{payAmount}
				//1为微信支付，2为支付宝 3 线下 0 余额
				thirdPayService.getAliPayLink(userIdService.getData(),
					$scope.orderId, 0, 2, $scope.countPrice,activityId).then(function(data) {
					$log.log('ali pay link:' + data);
					//link to ali pay page , pass pay success page as return uri
					if (data === 'SUCCESS' || data === 'success') {
						$location.path('/pay/success/' + userIdService.getData());
					} else {
						$window.location.href = data;
					}
				});

			};


			$scope.wechatAction = function(activityId) {
				var url = thirdPayService.getWeChatPayLink(userIdService.getData(), $scope.orderId, 0, 1, $scope.countPrice,activityId);
				if (url) {
					$window.location.href = url;
				}
			};

		}
	]);