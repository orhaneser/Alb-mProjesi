aplication.controller("myprofilectrl", function($scope, $location) {
    $scope.logincontrol=()=>{
        LoginControl.onLogin().then(function (res) {
            if(res!=false){
                $scope.getdata();
                $scope.getLayout();
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
    $scope.getLayout=()=>{
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
    $scope.setUserdata=()=>{
        const updatedata=[{
            "usid":$scope.userdata.usid,
            "usprofimg" :$scope.file.base64,
        }]
        PluginService.pluginService("UserProfileİmg/userprofileimg.php",{MN:"add",profileimg:updatedata}).then((res)=>{
            if(res){
            PluginService.pluginService("UserProfileİmg/userprofileimg.php",{MN:"del",where:"uspimgid=?",param:[$scope.userdata.uspimgid]}).then((res)=>{
            UserService.getUser({}).then((res)=>{
                $scope.$apply(()=>{
                    localStorage.setItem("UA", Base64.encode(JSON.stringify(res)));
                    $scope.userdata = res;
                })
            })
            })
            }
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