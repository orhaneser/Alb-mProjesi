const aplication = angular.module("myApp", ["ngRoute"]);
aplication.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./Application/Login/view/Loginview.html",
            controller: "loginctrl"
        }).when("/Register",{
            templateUrl: "./Application/Register/view/Registerview.html",
            controller:"registerctrl"
        })
      .otherwise({
            template: "<h1>None</h1><p>Nothing has been selected</p>"
        });
});

aplication.controller("mainctrl", function ($scope) {
    $scope.test="Merhaba ak";
  });
  