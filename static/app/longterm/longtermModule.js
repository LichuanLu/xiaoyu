'use strict';

angular.module('xiaoyuApp.longterm', [
	'ui.router'
	])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider) {
			$stateProvider
				.state('longterm', {
		          url:'/longterm/:userId',
		          templateUrl: '/static/app/longterm/longtermPage.tpl.html'
		        })
		        .state('longterm.record', {
					url: '/record',
					 views:{
					 	'': {
			              templateUrl: '/static/app/longterm/longtermRecordPage.tpl.html'
			            }
					 }
				})
		}
	]);