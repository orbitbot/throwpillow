(function() {
  'use strict';

  angular.module('throwpillow').factory('requestRTT', function() {
    return {
      request: function(config) {
        config.requestTimestamp = new Date().getTime();
        return config;
      },
      response: function(response) {
        response.config.responseTimestamp = new Date().getTime();
        return response;
      }
    };
  });
})();