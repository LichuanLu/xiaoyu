'use strict';

angular.module('xiaoyuApp.pay')
	.controller('inpagePayController', ['$scope', '$state', '$stateParams', '$log', '$window', '$location', 'CaptureService',
		'userService', 'updatePayPointService', '$templateCache', 'userId', 'thirdPayService', 'payTypeList', 'wcPayService',
		function($scope, $state, $stateParams, $log, $window, $location, CaptureService, userService, updatePayPointService,
			$templateCache, userIdService, thirdPayService, payTypeList, wcPayService) {

			$log.log('inpagePayController init');
			//var params = $location.search();
			//$log.log(params);
			//"type":""    //充值//洗车//包月//1//2//3

			// $scope.showPay = true;

			//$scope.payTypes = payTypeList;

			//$scope.selectedPayType = $scope.payTypes[0].value;

			//加入Inpage支付判断，inpage支付没有showPrice，还有最终支付需要先拿到orderId，然后提交


			if (typeof $scope.param1 !== 'undefined') {
				$scope.orderId = $scope.param1;
				$scope.price = $scope.param2;
				$scope.type = $scope.param3;
				//可以加判断，是否是object,如果是object就用.type,
				$scope.discountObj = $scope.param4;
				// $scope.inpagePay = $scope.param5;
			}


			// $scope.orderId = $stateParams.param1;
			// $scope.price = $stateParams.param2;
			// $scope.type = $stateParams.param3;
			// $scope.orderId = params.param1;
			// $scope.price = params.param2;
			// $scope.type = params.param3;
			$log.log('$scope.price:' + $scope.price);
			$scope.leftPrice = $scope.price;
			$scope.payPoints = 0;

			//use discount to reduce the $scope.price
			//调用统一支付接口支付？需要先判断discount
			if ($scope.discountObj) {
				if ($scope.discountObj.type == 3) {
					$scope.leftPrice = 0;
				}
				//else 使用折扣算出leftprice
			}

			// 	//"type":""    //充值 //洗车 // 包月 //1//2/3
			if ($scope.type == '2') {
				//load from service
				userService.getUserInfo().then(function(data) {
					$scope.showPayPoint = true;
					$scope.showDiscount = true;
					$scope.allPoints = data.points;
					$scope.selectedPayType = 0;
					//$scope.payPoints = Number($scope.allPoints) >= Number($scope.price) ? $scope.price : $scope.allPoints;
					//$scope.updateLeft.call();
				});
			} else if ($scope.type == '1' || $scope.type == '3') {
				$scope.showPayPoint = false;
				$scope.showDiscount = false;
				$scope.selectedPayType = 2;
			}

			$scope.showPrice = true;
			//如果是页面内支付
			// if ($scope.inpagePay == 'true') {
			// 	$scope.showPrice = false;
			// }

			$scope.updateLeft = function() {
				$scope.leftPoints = $scope.allPoints - $scope.payPoints;
				$scope.leftPrice = $scope.price - $scope.payPoints;
			};

			$scope.setPayPoint = function(point) {
				$scope.payPoints = point;
				$scope.updateLeft.call();
			};

			$scope.updatePoint = function() {
				updatePayPointService.update($scope.payPoints);
				$scope.toggleShow('updatePayPoint');
			};

			//init order page
			$scope.initLayout = function() {
			};


			$scope.submitAction = function() {

				if ($scope.inpagePay == 'true') {
					//inpage pay , need to call to generate orderID first , should define in parent scope
					if($scope.generateOrderId instansof Function){
						$scope.orderId = $scope.generateOrderId();
						
					}
				}else{
					$scope.payAction();

				}
				

			};


			$scope.payAction = function() {
				if ($scope.leftPrice == 0) {
					$scope.leftPointsPayAction();
				} else {
					$log.log('select pay type:' + $scope.selectedPayType);
					switch ($scope.selectedPayType) {
						case 0:
							$scope.leftPointsPayAction();
							break;
						case 1:
							$scope.aliPayAction();
							break;
						case 2:
							$scope.wechatAction();
							break;
						case 3:
							$scope.offlineAction();
							break;
					}
				}
			};

			//选择余额支付，无法修改余额
			$scope.leftPointsPayAction = function() {
				if ($scope.allPoints < $scope.price) {
					alert('余额不足');
				} else {
					//pay points = leftPrice , leftPrice = 0
					thirdPayService.pointsPay(userIdService.getData(),
						$scope.orderId, $scope.leftPrice, 0, 0).then(function(data) {
						// $log.log('ali pay link:' + data);
						//link to ali pay page , pass pay success page as return uri
						if (data === 'SUCCESS' || data === 'success') {
							$location.path('/pay/success/' + userIdService.getData());
						}
					});
				}
			};


			$scope.aliPayAction = function() {
				//send order id , pay money and points to getAliPay
				///rest/Pay/{userId}/{orderId}/balance/{balance}/payType/{payType}/{payAmount}
				//1为微信支付，2为支付宝 3 线下 0 余额
				thirdPayService.getAliPayLink(userIdService.getData(),
					$scope.orderId, $scope.payPoints, 2, $scope.leftPrice).then(function(data) {
					$log.log('ali pay link:' + data);
					//link to ali pay page , pass pay success page as return uri
					if (data === 'SUCCESS' || data === 'success') {
						$location.path('/pay/success/' + userIdService.getData());
					} else {
						$window.location.href = data;
					}
				});

			};


			$scope.wechatAction = function() {
				
				var url = thirdPayService.getWeChatPayLink(userIdService.getData(), $scope.orderId, $scope.payPoints, 1, $scope.leftPrice);
				if (url) {
					$window.location.href = url;
				}
			};

			$scope.selectDiscount = function() {
				//order.confirm.discount
				$state.go('^.discount');
			};



		}
	]);