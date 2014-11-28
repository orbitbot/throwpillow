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

      $http({
        method  : $scope.request.method,
        url     : $scope.request.url,
        headers : { 'Accept': 'application/json' },
        data    : angular.fromJson($scope.request.payload)
      })
      .success(function(data, status, headers) {
        $scope.request.response = {
          data    : data,
          status  : status,
          headers : headers()
        };
      })
      .error(function(data, status, headers) {
        $scope.request.response = {
          data    : data,
          status  : status,
          headers : headers()
        };
      });
    };

  }]);
})();