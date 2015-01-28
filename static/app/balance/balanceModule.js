'use strict';

angular.module('xiaoyuApp.balance', [
		'ui.router'
	])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider) {
			$stateProvider
				.state('balance', {
		          url:'/balance/:userId',
		          abstract:  true,
		          template: '<ui-view/>',
		          controller:'balanceController'

		        })
				// .state('balance.record', {
				// 	url: '/balance/:userId',
				// 	templateUrl: '/static/app/balance/balancePage.tpl.html'
				// })
				.state('balance.supply', {
					url: '/supply',
					templateUrl: '/static/app/balance/supply/supplyPage.tpl.html'
				});
		}
	]);