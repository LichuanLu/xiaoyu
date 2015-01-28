'use strict';

angular.module('xiaoyuApp', [
    // 'ngRoute',
    'ui.router',
    'angular-lodash',
    'ct.ui.router.extras',
    'ui.bootstrap',
    'ngTouch',
    'angularMoment',
    'mobile-angular-ui',
    'xiaoyuApp.order',
    'xiaoyuApp.record',
    'xiaoyuApp.car',
    'xiaoyuApp.location',
    'xiaoyuApp.pay',
    'xiaoyuApp.balance',
    'xiaoyuApp.user',
    'xiaoyuApp.discount',
    'xiaoyuApp.longterm'


  ])
  .run(
    ['$rootScope', '$state', '$stateParams',
      function($rootScope, $state, $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      // $urlRouterProvider.otherwise("/state1");
      $stateProvider
        .state('pay', {
          url: '/pay/:userId?param1&param2&param3',
          templateUrl: '/static/app/pay/payPage.tpl.html',
          controller: 'payController',
          // resolve:{
          //   'UserIdData':function(userId){
          //     // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
          //     return userId.promise;
          //   }
          // }
        }).state('paysuccess', {
          url: '/pay/success/:userId',
          templateUrl: '/static/app/pay/success/paySuccessPage.tpl.html',
          controller: 'paySuccessController',

        }).state('wechatpay', {
          url: '/wechatpay/:userId',
          templateUrl: '/static/app/pay/wechat/payWechatPage.tpl.html',
          controller: 'payWechatController',
        });



    }
  ])
  .controller('MainController', ['$rootScope', '$scope', '$http', '$templateCache', 'httpErrorAction',
    function($rootScope, $scope, $http, $templateCache, httpErrorAction) {

      $rootScope.$on('$routeChangeStart', function() {
        $rootScope.loading = true;
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.loading = false;
      });

      // $scope.$watch('httpErrorAction.httpErrorMessage', function(newValue, oldValue) {
      //   if (newValue) {
      //     $scope.httpErrorMessage = newValue;
      //   }
      // });
      $scope.httpErrorMessage = '';
      $scope.$on('httpErrorMessage.update', function(event, newMes) {
        $scope.httpErrorMessage = newMes;
      });



      $scope.userAgent = navigator.userAgent;

      $http.get('/static/app/common/backBtn.tpl.html', {
        cache: $templateCache
      });
      $http.get('/static/app/common/saveBtn.tpl.html', {
        cache: $templateCache
      });
      $http.get('/static/app/common/deleteBtn.tpl.html', {
        cache: $templateCache
      });
      $http.get('/static/app/common/homeBtn.tpl.html', {
        cache: $templateCache
      });

      $http.get('/static/app/pay/linkMyOrder.tpl.html', {
        cache: $templateCache
      });
      


    }
  ]);