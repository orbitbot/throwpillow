(function() {
  'use strict';
  
  angular.module('throwpillow').controller('RequestCtrl', ['$scope', '$http', function($scope, $http) {
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
      // console.log($scope.request);
      // validate sth
      // validate headers

      function addToScope(data, status, headers) {
        $scope.request.response = {
          data    : data,
          status  : status,
          headers : headers()
        };
      }

      $http({
        method  : $scope.request.method,
        url     : $scope.request.url,
        headers : $scope.request.headers,
        data    : angular.fromJson($scope.request.payload)
      })
      .success(addToScope)
      .error(addToScope);
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
      delete $scope.request.headers[key];
    };

  }]);
})();