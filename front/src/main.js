var app = angular.module('canawaApp',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: "index.html"
    })
    .when("/clientes", {
        templateUrl: "clientes.html"
    })
    .when("/ventas", {
        templateUrl: "ventas.html"
    })
    .when("/productos",{
        templateUrl: "productos.html"
    });

});
