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
        $scope.getUserDepartment();
        $scope.getLayout();
    })
    }
    $scope.getLayout=()=>{
    debugger
        if (localStorage.getItem("layouts") == null || localStorage.getItem("layouts") == "") {
            UserService.getLayout({MN:"get"}).then(function (res) {
                $scope.$apply(()=>{
                    $scope.layouts=res;
                })
            })
        }else{
            $scope.layouts=JSON.parse(localStorage.getItem("layouts"));
        }
    }
    $scope.getUserDepartment=()=> {
        if (localStorage.getItem("userdepartment") == null || localStorage.getItem("userdepartment") == "") {
            departmentService.getdepartment({
                MN: "get",
                where: "fid=?",
                param: [$scope.userdata.fid]
            }).then(function (res) {
                localStorage.setItem("userdepartment", JSON.stringify(res))
                $scope.$apply(() => {
                    $scope.dphotos = res;
                })
            })
        }else{
            $scope.dphotos=JSON.parse(localStorage.getItem("userdepartment"));
        }
    }
    if(window.addEventListener){
        window.addEventListener('load', $scope.logincontrol())
    }
});
