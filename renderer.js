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
        controller:"dashboardctrl"
        }).when("/Profile",{
        templateUrl:"./Application/Dashboard/MyProfile/view/MyProfileview.html",
        controller:"myprofilectrl"
    }).when("/SharePhoto",{
        templateUrl:"./Application/Dashboard/SharePhoto/view/SharedPhotoview.html",
        controller:"sharedphotoctrl"
    }).when("/MyPhotos",{
        templateUrl:"./Application/Dashboard/MyPhotos/view/MyPhotosview.html",
        controller:"myphotosctrl"
    })
        .otherwise({
          templateUrl: "./Application/404/view/404.html",
          controller:"notctrl"
        });
});

aplication.controller("mainctrl", function ($scope,$location,$interval) {
   $scope.onCloseSession=()=>{
    LoginControl.delSession().then(()=>{
        $location.path('/');
        window.location.hash=""
    });
   }
   $scope.SessinInterval=()=>{
       $interval(()=>{
            //session kontrol edilecek
       }, 30 * 60 * 1000);
   }


  });
  