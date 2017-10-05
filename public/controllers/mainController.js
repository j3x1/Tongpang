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
      url: '/' + redirURL + 'login/' + $scope.loginEmail
    }).then(function successCallback(response) {
      console.log(response.data);
      if ( response.data === null) {
        if ( redirURL === 'driver' ) {
          $scope.errorMessage = "Please register a car to your account first";
        } else {
          $scope.errorMessage = "No such user found";
        }
      } else if ( response.data.email === $scope.loginEmail ) {
        window.localStorage.setItem("user", $scope.loginEmail);
        window.location.href = '/#!/' + redirURL;
      } else {
        $scope.errorMessage = "Strange error. Siao liao.";
      }
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
}]);

app.controller('RiderController', ['$scope', '$http', function($scope, $http) {
  $scope.riderName = "";
  $scope.relevantTrips = []
  $scope.email = window.localStorage.getItem("user");

  if ( !$scope.email ) {
    window.location.href = '/#!/';
  }

  $scope.resetForm = function() {
    $scope.addForm.num_riders = "Number of Riders";
    $scope.addForm.origin = "Origin";
    $scope.addForm.dest = "Destination";
  }
  
  $scope.addForm = {}
  $scope.resetForm();

  $scope.getName = function() {
    $http({
      method: 'GET',
      url: '/user/' + $scope.email + '/name'
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.riderName = response.data[0].name;
    }, function errorCallback(response) {

    });
  }

  $scope.getName();

  $scope.getRelevantTrips = function() {
    $http({
      method: 'GET',
      url: '/user/' + $scope.email + '/relevanttrips',
      data: JSON.parse(JSON.stringify($scope.addForm))
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.relevantTrips = response.data.name;
    }, function errorCallback(response) {

    });
  }
}]);


app.controller('DriverController', ['$scope', '$http', function($scope, $http) {
  $scope.driverName = "";
  $scope.email = window.localStorage.getItem("user");

  if ( !$scope.email ) {
    window.location.href = '/#!/';
  }
  $scope.resetForm = function() {
    $scope.addForm.spaces = 0;
    $scope.addForm.origin = "";
    $scope.addForm.destination = "";
    $scope.addForm.time = "2000-01-01 01:01:01";
  }
  $scope.showAddForm = false;
  
  $scope.addForm = {}
  $scope.resetForm();
  
  $scope.upcomingDrives = [];
  $scope.driveHistory = [];
  
  $scope.logout = function() {
    localStorage.clear();
    window.location.href = '/#!/';  
  }

  $scope.getName = function() {
    $http({
      method: 'GET',
      url: '/user/' + $scope.email + '/name'
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.driverName = response.data[0].name;
    }, function errorCallback(response) {

    });
  }

  $scope.getName();
  
  $scope.getDriveHistory = function() {
    $http({
      method: 'GET',
      url: '/user/' + $scope.email + '/drivehistory'
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.driveHistory = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.getDriveHistory();

  $scope.getFutureDrives = function() {
    $http({
      method: 'GET',
      url: '/user/' + $scope.email + '/futuredrives'
    }).then(function successCallback(response) {
      console.log(response.data);
      $scope.upcomingDrives = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.getFutureDrives();
  
  $scope.addTrip = function() {
      $http({
        method: 'POST',
        url: '/user/' + $scope.email + '/drive',
        data: JSON.parse(JSON.stringify($scope.addForm))
      }).then(function successCallback(response) {
        console.log(response.data);
        $scope.getFutureDrives();
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