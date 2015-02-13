'use strict';

angular.module('xiaoyuApp.order', [
	'ui.router'
	])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider) {
			$stateProvider
				.state('order', {
		          url:'/order/:userId?orderId&orderType&showState',
		          templateUrl: '/static/app/order/orderPage.tpl.html',
		        })
		        .state('order.confirm', {
					url: '/confirm',
					 views:{
					 	'': {
			              templateUrl: '/static/app/orderConfirm/orderConfirmPage.tpl.html'
			            }
					 }
				})
				.state('order.discount', {
					url: '/discount/:oId',
					 views:{
					 	'': {
			              templateUrl: '/static/app/discount/payDiscountPage.tpl.html'
			            }
					 }
				})
				.state('order.first', {
					url: '/first',
					 views:{
					 	'': {
			              templateUrl: '/static/app/order/firstOrderPage.tpl.html'
			            }
					 }
				})
				.state('order.second', {
					url: '/second',
					 views:{
					 	'': {
			              templateUrl: '/static/app/order/secondOrderPage.tpl.html'
			            },
			            'stateView':{
			            	template:'<bswizard input-collection="bswizardData"></bswizard>'
			            }
					 }
				})
				.state('order.brandlist', {
					url:'/carbrand',
					views: {
						'': {
							templateUrl: '/static/app/car/update/cartype/carTypePage.tpl.html'
						}
					}
				})
				.state('order.typelist', {
					url:'/cartype',
					views: {
						'': {
							templateUrl: '/static/app/car/update/cartype/carTypeUpdatePage.tpl.html'
						}
					}
				})
				.state('order.area', {
					url: '/area',
					views: {
						'': {
							templateUrl: '/static/app/location/update/locationAddUpdatePage.tpl.html'
						}
					}
				})
				.state('order.washtime', {
					url:'/time/:addressId',
					views: {
						'': {
							templateUrl: '/static/app/time/orderTimePage.tpl.html'
						}
					}
				})
		}
	]);