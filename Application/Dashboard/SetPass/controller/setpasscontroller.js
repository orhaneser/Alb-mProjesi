aplication.controller("setpassctrl", function($scope, $location) {
    $scope.facultylist=[];
    $scope.val=false;
    $scope.pass={
        newpass:"",
        newpasstry:""
    }
    $scope.logincontrol=()=>{
        $('.preloader').css('display',"block");
        LoginControl.onLogin().then(function (res) {
            if(res!=false){
                $scope.getdata();
                $scope.getLayout();
                $scope.getUserDepartment();
                $scope.getcity();
            }else{
            }
        })
    }
    $scope.getdata=()=>{
        $scope.$apply(()=>{
            $scope.userdata = JSON.parse(Base64.decode(localStorage.getItem("UA")))[0];
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
    $scope.usePass=()=>{
        $scope.pass.newpass=$scope.passw;
        $scope.pass.newpasstry=$scope.passw;
    }
    $scope.makePass=()=>{
        $scope.val=!false;
        $scope.passw=Component.makeRandomText()+Math.random().toString().split(".")[1].substring(0,5);
    }
    $scope.getcity=()=>{
        $scope.getfaculty();
        $scope.selectedOption=$scope.userdata.city;
        if(localStorage.getItem("city")==null ||localStorage.getItem("city")=="" ){
            RegisterService.getcity({MN:"get",where:"1"}).then(function (res) {
                $scope.citylist=[];
                $scope.$apply(()=>{
                    localStorage.setItem("city",JSON.stringify(res))
                    res.forEach(element => {
                        $scope.citylist.push(element);

                    });
                });
            })
        }else{
            $scope.citylist=JSON.parse(localStorage.getItem("city"));
        }
    }
    $scope.getfaculty=()=>{
        $scope.selectedFOption=$scope.userdata.fid;
        if(localStorage.getItem("faculty")==null || localStorage.getItem("faculty")=="" ){
            RegisterService.getfaculty({MN:"get",where:"1"}).then(function (res) {
                if(res!="None") {
                    localStorage.setItem("faculty", JSON.stringify(res))
                    $scope.$apply(() => {
                        res.forEach(element => {
                            $scope.facultylist.push(element);
                        });
                    });
                }
            })
        }else{
            $scope.facultylist=JSON.parse(localStorage.getItem("faculty"));
        }
    }
    $scope.getUserDepartment=(fid)=>{
        debugger
        const id=fid||$scope.userdata.fid;
        $scope.selectedDOption=fid!=null?"":$scope.userdata.did;
        departmentService.getdepartment({MN:"get", where: "fid=?", param: [id]}).then(function (res) {
            $scope.$apply(()=>{
                $scope.dphotos=res;

            })
        })
    }
    $scope.setuserpass=()=>{
        if($scope.pass.newpass.length<8 || $scope.pass.newpasstry.length<8){
            Component.showmessage("Uyarı","Lütfen Parolanızı En Az 8 Karakterden Oluşturun.")
        }else if($scope.pass.newpass!= $scope.pass.newpasstry){
            Component.showmessage("Uyarı","Parolalar Eşleşmiyor")
        }else{
            //parola güncelle
        }
    }
    if(window.addEventListener){
        window.addEventListener('load', $scope.logincontrol())
    }
});