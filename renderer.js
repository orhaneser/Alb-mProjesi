const aplication = angular.module("myApp", ["ngRoute"]);
aplication.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./Application/Login/view/Loginview.html",
            controller: "loginctrl"
        }).when("/Register",{
            templateUrl: "./Application/Register/view/Registerview.html",
            controller:"registerctrl"
        }).when("/RegisterCheck",{
            templateUrl: "./Application/RegisterCheck/view/RegisterCheckview.html",
            controller:"registercheckctrl"
        })
      .otherwise({
            template: "<h1>Sory Not Found</h1>"
        });
});

aplication.controller("mainctrl", function ($scope) {
    $scope.test="Merhaba";
  });
  