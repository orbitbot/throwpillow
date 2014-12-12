(function() {
  'use strict';

  angular.module('throwpillow')
  .factory('requestRTT', function() {
    return {
      request: function(config) {
        config.requestTimestamp = new Date().getTime();
        return config;
      },
      response: function(response) {
        response.config.responseTimestamp = new Date().getTime();
        return response;
      },
      responseError: function(rejection) {
        rejection.config.responseTimestamp = new Date().getTime();
        return rejection;
      }
    };
  }).factory('requestDebugger', function() {
    return {
      request: function(config) {
        console.log('request', config);
        return config;
      },
      requestError: function(rejection) {
        console.log('requestError', rejection);
        return rejection;
      },
      response: function(response) {
        console.log('response', response);
        return response;
      },
      responseError: function(rejection) {
        console.log('responseError', rejection);
        return rejection;
      }
    };
  });
})();