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


app.controller('DriverController', ['$scope', '$http', function($scope, $http) {
  $scope.driverName = "Driver";
  
  $scope.resetForm = function() {
    $scope.addForm.name = "";
    $scope.addForm.spaces = 0;
    $scope.addForm.destination = "";
  }
  $scope.showAddForm = false;
  
  $scope.addForm = {}
  $scope.resetForm();
  
  $scope.tempID = 3;
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
  
  $scope.addTrip = function() {
      var newCar = JSON.parse(JSON.stringify($scope.addForm));
      newCar.id = $scope.tempID++;
      $scope.carList.push(newCar);
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