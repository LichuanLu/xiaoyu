'use strict';

angular.module('xiaoyuApp.user', [
		'ui.router'
	])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider) {
			$stateProvider
				.state('user', {
					url: '/user/:userId',
					abstract: true,
					templateUrl: '/static/app/user/userPage.tpl.html'

				})
				.state('user.account', {
					url: '/account',
					views: {
						'': {
							templateUrl: '/static/app/user/account/accountPage.tpl.html'
						}
					}
				})
				.state('user.update', {
					url: '/update',
					views: {
						'': {
							templateUrl: '/static/app/user/update/updateUserPage.tpl.html'
						}
					}
				})
		}
	]);