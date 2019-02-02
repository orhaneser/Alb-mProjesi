aplication.controller("dashboardctrl", function($scope, $location) {
$scope.logincontrol=()=>{
    LoginControl.onLogin().then(function (res) {
        if(res!=false){
            $scope.getdata();
        }else{
        }
    })
}
$scope.getdata=()=>{

    $scope.$apply(()=>{
        $scope.userdata = JSON.parse(Base64.decode(localStorage.getItem("UA")))[0];
    })

    }
    if(window.addEventListener){
        window.addEventListener('load', $scope.logincontrol())
    }
});
