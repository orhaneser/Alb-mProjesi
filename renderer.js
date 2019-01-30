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
        }).when("/Dashboard",{
        templateUrl: "./Application/Dashboard/view/Dashboardview.html",
        controller:"Dashboardctrl"
    })
      .otherwise({
          templateUrl: "./Application/404/view/404.html",
        });
});

aplication.controller("mainctrl", function ($scope) {
    $scope.test="Merhaba";
  });
  