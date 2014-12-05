(function() {
  'use strict';

  angular.module('throwpillow', ['templates', 'ui.router', 'ui.bootstrap', 'ui.ace']);

  angular.module('throwpillow').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
      .state('request', {
        url: '/',
        controller: 'RequestCtrl',
        templateUrl: 'request/request.html'
      });

    $urlRouterProvider
      .when('', '/')
      .otherwise('/');

    $httpProvider.interceptors.push('requestRTT');
    // $httpProvider.interceptors.push('requestDebugger');
    $httpProvider.defaults.headers.common = undefined;
    $httpProvider.defaults.headers.post = undefined;
    $httpProvider.defaults.headers.put = undefined;
  }]);
})();