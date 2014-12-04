(function() {
  'use strict';
  
  angular.module('throwpillow').controller('RequestCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.aceOption = function() {
      return {
        mode: 'json',
        onLoad: function (_editor) {
          _editor.setShowPrintMargin(false);
          _editor.setOptions({
            maxLines: Infinity,
            tabSize: 2,
          });
        }
      };
    };

    $scope.submit = function() {
      // validate sth
      // validate headers

      $http({
        method  : $scope.request.method,
        url     : $scope.request.url,
        headers : $scope.request.headers,
        data    : angular.fromJson($scope.request.payload)
      })
      .then(function(response) {
        $scope.request.response = {
          data    : response.data,
          status  : response.status,
          headers : response.headers(),
          text    : response.statusText,
          RTT     : response.config.responseTimestamp - response.config.requestTimestamp
        };
      });
    };

    $scope.addHeader = function() {
      if ($scope.newHeader.field && $scope.newHeader.value) {
        if (!$scope.request.headers) {
          var field = $scope.newHeader.field;
          var value = $scope.newHeader.value;
          $scope.request.headers = { field: value };
        } else {
          $scope.request.headers[$scope.newHeader.field] = $scope.newHeader.value;
        }
        $scope.newHeader.field = '';
        $scope.newHeader.value = '';
      }
    };

    $scope.removeHeader = function(key) {
      $timeout(function() {
        delete $scope.request.headers[key];
        $scope.$digest();
      });
    };

  }]);
})();