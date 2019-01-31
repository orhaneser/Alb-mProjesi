aplication.controller("dashboardctrl", function($scope, $location) {
$scope.logincontrol=()=>{
    LoginControl.onLogin().then(function (res) {
        if(res!=false){
            $scope.test();
        }else{
        }
    })
}
$scope.test=()=>{
        console.log("asdasd");
    }
});
