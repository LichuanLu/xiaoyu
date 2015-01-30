'use strict';

angular.module('xiaoyuApp.record', [
	'ui.router'
]).config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider) {
		$stateProvider
			.state('record', {
				url: '/record/:userId',
				abstract: true,
				template: '<ui-view/>'

			})
			.state('record.list', {
				url: '/list',
				views: {
					'': {
						templateUrl: '/static/app/orderRecord/orderRecordPage.tpl.html'
					}
				}
			})
			.state('record.detail', {
				url: '/detail/:orderId',
				views: {
					'': {
						templateUrl: '/static/app/orderRecord/detail/orderDetailPage.tpl.html'
					}
				}
			})
			.state('record.detail.confirm', {
				url: '',
				params: { showPay:''},
				views: {
					'': {
						templateUrl: '/static/app/orderRecord/detail/orderDetailConfirmPage.tpl.html'
					}
				}
			})
			.state('record.detail.finish', {
				url: '',
				views: {
					'': {
						templateUrl: '/static/app/orderRecord/detail/orderFinishPage.tpl.html'
					}
				}
			});
		// .state('record.detail.order', {
		// 	url: '/order',
		// 	 views:{
		// 	 	'': {
		//              templateUrl: '/static/app/order/orderPage.tpl.html'
		//            }
		// 	 }
		// })
		// .state('record.detail.order.first', {
		// 	url: '/first',
		// 	 views:{
		// 	 	'': {
		//              templateUrl: '/static/app/order/firstOrderPage.tpl.html'
		//            }
		// 	 }
		// })
		// .state('record.detail.order.second', {
		// 	url: '/second',
		// 	 views:{
		// 	 	'': {
		//              templateUrl: '/static/app/order/secondOrderPage.tpl.html'
		//            }
		// 	 }
		// })
	}
]);