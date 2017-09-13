// Code goes here
var app = angular.module('canawaApp', ['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      
      templateUrl: 'pages/home.html'
    })
    .when('/clientes', {
      controller: 'clientsController',
      templateUrl: 'pages/clientes.html',
      controllerAs: 'cliCtrl'
    })
    .when('/productos', {
      
      templateUrl: 'pages/productos.html'
    })
    .when('/ventas', {
      
      templateUrl: 'pages/ventas.html'
    });
});
app.controller('clientsController', function($scope,$http){
  $scope.sendData = function(){
    var data = $.param({
      name: $scope.name,
      cuit: $scope.cuit,
      phone: $scope.phone,
      location: $scope.location,
      email: $scope.email
    });
    var config = {
      headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
    }

  
  
  $http.post('../../api/src/index.php/clients', data, config)
    .then(function(data, status, headers, config){
      $scope.PostDataResponse = "Post DAta Submitted success";
    }, function(data, status, headers, config){
      $scope.ResponseDetails = "Data: " + data +
      "<hr />status: " + status +
      "<hr />headers: " + headers +
      "<hr />config: " + config;

    });
  };
});

