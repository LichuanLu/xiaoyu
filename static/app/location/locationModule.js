'use strict';

angular.module('xiaoyuApp.location', [])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider) {
			$stateProvider
				.state('location', {
					abstract: true,
					url: '/location',

					// Note: abstract still needs a ui-view for its children to populate.
					// You can simply add it inline here.
					template: '<ui-view/>'
				})
				.state('location.list', {
					url: '/list',
					views: {
						'': {
							templateUrl: '/static/app/location/locationPage.tpl.html'
						}
					}
				})
				.state('location.update', {
					url: '/update',
					views: {
						'': {
							templateUrl: '/static/app/location/update/locationUpdatePage.tpl.html'
						}
					}
				})
				.state('location.area', {
					url: '/area',
					views: {
						'': {
							templateUrl: '/static/app/location/update/locationAddUpdatePage.tpl.html'
						}
					}
				})
		}
	]);