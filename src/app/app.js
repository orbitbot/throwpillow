(function() {
  'use strict';

  angular.module('throwpillow', ['ui.router', 'templates']);

  angular.module('throwpillow').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('request', {
        url: '/',
        controller: 'RequestCtrl',
        templateUrl: 'request/request.html'
      });

    $urlRouterProvider
      .when('', '/')
      .otherwise('/');
  }]);
})();