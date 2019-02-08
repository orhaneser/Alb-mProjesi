aplication.controller("myprofilectrl", function($scope, $location) {
    $scope.logincontrol=()=>{
        $('.preloader').css('display',"block");
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
    $scope.getLayout=()=>{
        $('.preloader').addClass('complete');
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
            PluginService.pluginService("UserProfileİmg/userprofileimg.php",{MN:"del",where:"uspimgid=?",param:[$scope.userdata.uspimgid]}).then((res)=>{
                PluginService.pluginService("UserProfileİmg/userprofileimg.php",{MN:"add",profileimg:updatedata}).then((res)=>{
                    if(res) {
                        UserService.getUser({MN:"get",param:[$scope.userdata.ulgnname]}).then((res)=>{
                            $scope.$apply(()=>{
                                localStorage.setItem("UA",Base64.encode(JSON.stringify(res)));
                                $scope.userdata.uimg=res[0].uimg;
                                $scope.userdata.uspimgid=res[0].uspimgid;
                                Component.showmessage("Bilgi","Fotoğrafınız Başarıyla Güncellendi.")
                            })
                            
                        })
                    }
            })
            })

    }
    $scope.openpass=()=>{
    $location.path("/SetPass");
    }
    $scope.openuseredit=()=>{
        $location.path("/SetUser");
    }
    $scope.getUserDepartment=()=>{
        departmentService.getdepartment({MN:"get", where: "fid=?", param: [$scope.userdata.fid]}).then(function (res) {
            $scope.$apply(()=>{
                $scope.dphotos=res;
                $scope.getLayout();
            })
        })
    }
    if(window.addEventListener){
        window.addEventListener('load', $scope.logincontrol())
    }
});