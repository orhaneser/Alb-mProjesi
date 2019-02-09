aplication.controller("registercheckctrl", function($scope, $location) {
   $scope.checkRegister=()=>{
       var day =window.location.hash.split("?")[1].split("%20")[1][0]+window.location.hash.split("?")[1].split("%20")[1][1]
       if (parseInt(day) + 2 == parseInt(new Date().toLocaleDateString().split(".")[0])) {
            RegisterService.getRegister({MN: "get",where: "rcode=?",param: [window.location.hash.split("?")[1]]}).then(function (res) {
                alertify
                    .alert("Bu Link Artık Geçersiz", function(){
                        alertify.message('OK');
                    });
                $scope.deltemp(res[0].rcode);

            })
       } else {
           RegisterService.getRegister({ MN: "get",  where: "rcode=?", param: [window.location.hash.split("?")[1].replace("%20","+")] }).then(function (res) {
                   $scope.addUser(res);
           })
       }
   }
    $scope.deltemp=(code)=>{
    var deferred =new Promise((resolve,reject)=>{
    RegisterService.delRegister({MN:"del",where:"rcode=?",param:[code]}).then(function (res) {
        if(res=="Succes"){
            $location.path('/');
            window.location.hash=""
            resolve(true);
        }
    })
})
        return deferred;
    };
   $scope.updateCityCount=(cid)=>{
       debugger
       PluginService.pluginService("City/city.php",{MN:"get",where:"cid=?",param:[cid]}).then(function (res) {
           debugger
           PluginService.pluginService("City/city.php",{MN:"set",where:"cid=?",param:[cid],
               setcity:[{
                   cname:res[0].cname,
                   ccount:(parseInt(res[0].ccount)+1).toString()
               }]
           }).then(function (res) {

           })
       })
       debugger

   },
   $scope.updateFacultCount=(fid)=>{
       debugger
       FacultyService.getfaculty({MN:"get",where:"fid=?",param:[fid]}).then(function (res) {
           FacultyService.updatefaculty({MN:"set",   where:"fid=?",param:[fid]
               ,setfaculty:[{
                     fname:res[0].fname,
                   fscount:(parseInt(res[0].fscount)+1).toString(),
               }]}).then(function (res) {
                if(res=="Succes"){
                }
           })
       })

   }
   $scope.updateDepartmentCount=(blid)=>{
    departmentService.getdepartment({MN:"get",where:"blid=?",param:[blid]}).then(function (res) {
        departmentService.updateDepartment({MN:"set",where:"blid=?",param:[res[0].blid],
            setdepartment:[{
                blname:res[0].blname,
                fid:res[0].fid,
                bcount:(parseInt(res[0].bcount)+1).toString(),
                dpphoto:res[0].dpphoto

            }]
        }).then(function (res) {
            if(res=="Succes"){
            }
        })
    })
   }
    $scope.addUser=(param)=>{
       debugger
       const  code=param[0].rcode;
        const userjson = {
            usname: param[0].uname.toUpperCase(),
            uslname: param[0].ulastname.toUpperCase(),
            uauth: 2,
            city: param[0].ucity,
            uyear: param[0].uyear,
            fid: param[0].ufaculty,
            did: param[0].udepartment,
            ulgnname:param[0].umail,
            passwd: param[0].upass,
            mail: param[0].umail,
            phone: param[0].uphone,
        }
        UserService.addUser({MN:"add",userdata:[userjson]}).then(function (res) {
               if(res=="Succes"){
                   $scope.deltemp(param[0].rcode).then(function (res) {
                      if(res==true){
                           $scope.updateFacultCount(param[0].ufaculty);
                           $scope.updateDepartmentCount(param[0].udepartment);
                           $scope.updateCityCount(param[0].ucity);
                           $scope.deltemp(code);

                       }
                   })
               }
        })
    };
  });
