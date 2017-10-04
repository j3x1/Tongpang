var app = angular.module('tongpangApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html",
        controller : "LoginController"
    })
    .when("/driver", {
        templateUrl : "views/driver.html",
        controller : "DriverController"
    })
    .when("/rider", {
        templateUrl : "views/rider.html",
        controller : "RiderController"
    });
});

app.controller('LoginController', ['$scope', '$http', function($scope, $http) {
  $scope.title = "Tongpang";
  $scope.welcome = "Welcome destination tongpang, where you can tongpang stuff.";
  $scope.loginEmail = "";
  $scope.login = function(redirURL) {
    $http({
      method: 'GET',
      url: '/login/' + $scope.loginEmail
    }).then(function successCallback(response) {
      console.log(response.data.email);
      if ( response.data.email === $scope.loginEmail ) {
        window.localStorage.setItem("user", $scope.loginEmail);
        window.location.href = '/#!/' + redirURL;
      } else {
        $scope.errorMessage = "Invalid email";
      }
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
}]);


app.controller('DriverController', ['$scope', '$http', function($scope, $http) {
  $scope.driverName = "Driver";
  $scope.email = window.localStorage.getItem("user");

  if ( !$scope.email ) {
    window.location.href = '/#!/';
  }
  $scope.resetForm = function() {
    $scope.addForm.spaces = 0;
    $scope.addForm.origin = "";
    $scope.addForm.destination = "";
    $scope.addForm.time = "2017-10-06 11:05:13";
  }
  $scope.showAddForm = false;
  
  $scope.addForm = {}
  $scope.resetForm();
  
  $scope.rideHistory = [];

  
  $scope.logout = function() {
    localStorage.clear();
    window.location.href = '/#!/';  
  }
  
  $scope.getRides = function() {
    $http({
      method: 'GET',
      url: '/user/' + $scope.email + '/drivehistory'
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.rideHistory = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.getRides();
  
  $scope.addDisabled = function() {
    return false;
  }

  
  $scope.addTrip = function() {
      $http({
        method: 'POST',
        url: '/user/' + $scope.email + '/drive',
        data: JSON.parse(JSON.stringify($scope.addForm))
      }).then(function successCallback(response) {
        console.log(response.data);
      }, function errorCallback(response) {
      });
      $scope.resetForm();
  }
  
  $scope.delete = function(id) {
    
    for( var i = 0; i < $scope.carList.length; i++){
      if ( $scope.carList[i].id === id) {
        if ( confirm("Are you sure you want destination delete " + $scope.carList[i].name + "?" )) {  
          $scope.carList.splice(i, 1);
        }
        break;
      }
    }
  }
}]);


app.controller('RiderController', ['$scope', '$http', function($scope, $http) {
  $scope.riderName = "Rider";
  
  $scope.carList = [
    {
      "id": 1,
      "name": "Red Honda",
      "spaces": 2,
      "destination": "Bedok"
    },
    {
      "id": 2,
      "name": "Blue Toyota",
      "spaces": 1,
      "destination": "Serangoon"
    }
  ]
  
  $scope.bid = function(carid) {
    console.log(carid);
    
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