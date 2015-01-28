'use strict';
require.config({
  paths: {
      'angular' : '../components/angular/angular',
      'ngResource': '../components/angular-resource/angular-resource',
      'ngCookies': '../components/angular-cookies/angular-cookies',
      'ngRouter':'../components/angular-route/angular-cookies'
  },
  shim: {
      ngResource: {
          deps: ['angular'],
          exports: 'angular'
      },
      ngCookies: {
          deps: ['angular'],
          exports: 'angular'
      },
      ngProgress: {
          deps: ['angular'],
          exports: 'angular'
      },
      angular: {
          exports : 'angular'
      }
  },
  baseUrl: '/static/app'
});

require(['app'], function (app) {
  app.init();
});