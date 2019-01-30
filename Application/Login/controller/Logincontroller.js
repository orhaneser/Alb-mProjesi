aplication.controller("loginctrl", function($scope, $location) {
  $scope.login = {
    usname: "",
    upass: ""
  };
  $scope.checklogin = () => {
    if (
      $scope.login.usname.trim() == "" ||
      $scope.login.usname.trim().length < 8 ||
      !Component.validateemail($scope.login.usname.trim())
    ) {
      Component.showmessage("Uyarı", "Kullanıcı Adı Veya Parola Geçersiz");
    } else if (
      $scope.login.upass.trim() == "" ||
      $scope.login.upass.trim().length < 8
    ) {
      Component.showmessage("Uyarı", "Kullanıcı Adı Veya Parola Geçersiz");
    }else{
      RegisterService.getblocklist({MN:"get",where: "email=?",param:[$scope.login.usname]}).then(function (res) {
        debugger
        if(res=="None") {
          LoginControl.onLoginCheck($scope.login).then(function (res) {
            if(res){
              $location.path("#/Dashboard")
            }
          })

        }else{
          Component.showmessage("Uyarı","Bu Kullanıcı Hesabı Engellenmiştir.")
        }
      })

      //kara liste kontrol
    }
  };
});
