'use strict';

angular.module('xiaoyuApp.pay')
	.controller('payController', ['$scope', '$state', '$stateParams', '$log', '$window', '$location', 'CaptureService',
		'userService', 'updatePayPointService', '$templateCache', 'userId', 'thirdPayService', 'payTypeList', 'wcPayService',
		function($scope, $state, $stateParams, $log, $window, $location, CaptureService, userService, updatePayPointService,
			$templateCache, userIdService, thirdPayService, payTypeList, wcPayService) {

			$log.log('payController init');
			//var params = $location.search();
			//$log.log(params);
			//"type":""    //充值 //洗车//1//2/

			// $scope.showPay = true;

			//$scope.payTypes = payTypeList;

			//$scope.selectedPayType = $scope.payTypes[0].value;

			//加入Inpage支付判断，inpage支付没有showPrice，还有最终支付需要先拿到orderId，然后提交


			if (!$scope.isUndefined($scope.param1)) {
				$scope.orderId = $scope.param1;
				$scope.price = $scope.param2;
				$scope.type = $scope.param3;
				//可以加判断，是否是object,如果是object就用.type,
				$scope.discountObj = $scope.param4;
				// $scope.inpagePay = $scope.param5;
			}
			// else if(!$scope.isUndefined($stateParams.param1)){
			// 	$scope.orderId = $stateParams.param1;
			// 	$scope.price = $stateParams.param2;
			// 	$scope.type = $stateParams.param3;
			// }


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
				// var leftContent = $templateCache.get('/static/app/common/homeBtn.tpl.html');
				// var title = '<span>支付订单</span>';
				// var rawContent = $templateCache.get('/static/app/pay/linkMyOrder.tpl.html');
				// CaptureService.setContentFor('title', title, $scope);
				// CaptureService.setContentFor('leftbtn', leftContent[1], $scope);
				// CaptureService.setContentFor('rightbtn', rawContent[1], $scope);
			};


			//toggle show order|child page
			// $scope.toggleShow = function(item) {
			// 	switch (item) {
			// 		case 'updatePayPoint':
			// 			$scope.showPay = !$scope.showPay;
			// 			$scope.showUpdatePayPoint = !$scope.showUpdatePayPoint;
			// 			break;
			// 	}
			// };

			//get access for child scope
			// $scope.setUpdatePayPointScope = function(updatePayPointScope) {
			// 	$scope.updatePayPointScope = updatePayPointScope;
			// };


			//link to record page
			$scope.linkMyOrderAction = function() {
				$location.path('/record/' + userIdService.getData());

			};



			$scope.submitAction = function() {

				// if ($scope.inpagePay == 'true') {
				// 	//inpage pay , need to call to generate orderID first , should define in parent scope
				// 	if($scope.generateOrderId instansof Function){
				// 		$scope.orderId = $scope.generateOrderId();
						
				// 	}
				// }else{
				// 	$scope.payAction();

				// }
				$scope.payAction();

			};


			$scope.payAction = function() {
				if ($scope.leftPrice == 0) {
					$scope.leftPointsPayAction();
				} else {
					$log.log('select pay type:' + $scope.selectedPayType);
					var activityId = '';
					if($scope.discountObj.id){
						activityId = $scope.discountObj.id;
					}
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
						case 3:
							$scope.offlineAction(activityId);
							break;
					}
				}
			};

			//选择余额支付，无法修改余额
			$scope.leftPointsPayAction = function(activityId) {
				if ($scope.allPoints < $scope.price) {
					alert('余额不足');
				} else {
					//pay points = leftPrice , leftPrice = 0
					thirdPayService.pointsPay(userIdService.getData(),
						$scope.orderId, $scope.leftPrice, 0, 0,activityId).then(function(data) {
						// $log.log('ali pay link:' + data);
						//link to ali pay page , pass pay success page as return uri
						if (data === 'SUCCESS' || data === 'success') {
							$location.path('/pay/success/' + userIdService.getData());
						}
					});
				}
			};


			$scope.aliPayAction = function(activityId) {
				//send order id , pay money and points to getAliPay
				///rest/Pay/{userId}/{orderId}/balance/{balance}/payType/{payType}/{payAmount}
				//1为微信支付，2为支付宝 3 线下 0 余额
				thirdPayService.getAliPayLink(userIdService.getData(),
					$scope.orderId, $scope.payPoints, 2, $scope.leftPrice,activityId).then(function(data) {
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
				//send order id , pay money and points to get we chat
				///rest/Pay/{userId}/{orderId}/balance/{balance}/payType/{payType}/{payAmount}
				//1为微信支付，2为支付宝
				// thirdPayService.getWeChatPayData(userIdService.getData(),
				// 	$scope.orderId, $scope.payPoints, 1, $scope.leftPrice).then(function(data) {
				// 	$log.log('wechat pay link:' + data);
				// 	//link to ali pay page , pass pay success page as return uri
				// 	if (data === 'SUCCESS' || data === 'success') {
				// 		$location.path('/pay/success/' + userIdService.getData());
				// 	} else {
				// 		wcPayService.wcPay(data, function(res) {
				// 			if (res === 'success') {
				// 				$location.path('/pay/success/' + userIdService.getData());
				// 			} else {
				// 				alert(res);
				// 			}

				// 		});
				// 	}
				// });
				var url = thirdPayService.getWeChatPayLink(userIdService.getData(), $scope.orderId, $scope.payPoints, 1, $scope.leftPrice,activityId);
				if (url) {
					$window.location.href = url;
				}
			};

			$scope.selectDiscount = function() {
				//order.confirm.discount
				$state.go('^.discount',{'oId':$scope.orderId});
			};


			$scope.offlineAction = function() {
				//send order id , pay money and points to get we chat
				thirdPayService.offLinePay($scope.orderId).then(function(data) {
					$log.log('off line pay action' + data);
					//link to pay success page
					$location.path('/record/' + userIdService.getData());
				});

			};

			$scope.linkHomeAction = function() {
				$location.path('/order/' + userIdService.getData());
				// $window.location.href = 'http://xiaoyuchefu.com/index.html';
				// wcPayService.closeWindow();
			};

			// //hide|show order page
			// $scope.$watch('showPay', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showPay Changed to show');
			// 		$scope.initLayout();

			// 	}
			// });


			// //hide|show car No page
			// $scope.$watch('showUpdatePayPoint', function(newValue, oldValue) {
			// 	if (newValue) {
			// 		$log.log('showUpdatePayPoint Changed to show');
			// 		if ($scope.updatePayPointScope) {
			// 			$scope.updatePayPointScope.initLayout();
			// 		}

			// 	}
			// });



		}
	]);