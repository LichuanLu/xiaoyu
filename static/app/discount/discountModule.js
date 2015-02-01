'use strict';
angular.module('xiaoyuApp.discount', [])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider) {
			$stateProvider
				.state('discount', {
					abstract: true,
					url: '/discount/:userId',

					// Note: abstract still needs a ui-view for its children to populate.
					// You can simply add it inline here.
					template: '<ui-view/>'
				})
				.state('discount.list', {
					url:'/list',
					views: {
						'': {
							templateUrl: '/static/app/discount/discountPage.tpl.html'
						}
					}
				})
		}
	]);
