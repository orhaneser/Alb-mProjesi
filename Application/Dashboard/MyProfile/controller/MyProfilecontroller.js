aplication.controller("myprofilectrl", function($scope, $location) {
    $scope.test=function () {
        alert("hello");
    }
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
            $scope.getUserDepartment();
        })
    }
    $scope.getUserDepartment=()=>{
        departmentService.getdepartment({MN:"get", where: "fid=?", param: [$scope.userdata.fid]}).then(function (res) {
            $scope.$apply(()=>{
                $scope.dphotos=res;
            })
        })
    }
    if(window.addEventListener){
        window.addEventListener('load', $scope.logincontrol())
    }
});