angular.module('tongpangApp', [])
  .controller('TongpangController', ['$scope', '$http', function($scope, $http) {
    $scope.title = "Hello";
    $scope.click = function() {
      console.log("Hello");
      
      $http({
        method: 'GET',
        url: '/dbTest'
      }).then(function successCallback(response) {
        console.log(response.data);
        $scope.title = "Doneee";
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  }]);