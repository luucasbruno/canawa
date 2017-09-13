// Code goes here
var app = angular.module('canawaApp', ['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      
      templateUrl: 'pages/home.html'
    })
    .when('/clientes', {
      
      templateUrl: 'pages/clientes.html'
    })
    .when('/productos', {
      
      templateUrl: 'pages/productos.html'
    })
    .when('/ventas', {
      
      templateUrl: 'pages/ventas.html'
    });
});

