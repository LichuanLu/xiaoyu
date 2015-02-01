'use strict';

angular.module('xiaoyuApp.car', [])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider) {
			$stateProvider
				.state('car', {
					abstract: true,
					url: '/car',

					// Note: abstract still needs a ui-view for its children to populate.
					// You can simply add it inline here.
					template: '<ui-view/>'
				})
				.state('car.list', {
					url:'/:userId/list',
					views: {
						'': {
							templateUrl: '/static/app/car/carPage.tpl.html'
						}
					}
				})
				.state('car.update', {
					url:'/update',
					views: {
						'': {
							templateUrl: '/static/app/car/update/carUpdatePage.tpl.html'
						}
					}
				})
				.state('car.brandlist', {
					url:'/carbrand',
					views: {
						'': {
							templateUrl: '/static/app/car/update/cartype/carTypePage.tpl.html'
						}
					}
				})
				.state('car.typelist', {
					url:'/cartype',
					views: {
						'': {
							templateUrl: '/static/app/car/update/cartype/carTypeUpdatePage.tpl.html'
						}
					}
				})
		}
	]);

// angular.module('xiaoyuApp.car', [
// 		'ui.router'
// 	])
// 	.config(['$stateProvider', '$urlRouterProvider',
// 		function($stateProvider) {
// 			$stateProvider
// 				.state('car',{

// 				})
// 				.state('car.brandlist', {
// 					views: {
// 						'@': {
// 							templateUrl: '/static/app/car/update/cartype/carTypePage.tpl.html'
// 						}
// 					}
// 				})
// 				.state('car.brandlist.typelist', {
// 					views: {
// 						'': {
// 							templateUrl: '/static/app/car/update/cartype/carTypeUpdatePage.tpl.html'
// 						}
// 					}
// 				});
// 		}
// 	]);