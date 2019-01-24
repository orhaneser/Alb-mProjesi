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
      var test=Component.RequestParse("ad=ahmet & soyad=ahmet");
    Provider.AjaxPOST({SN:"User",MN:"get",data:[test]}).then(function(res){
      debugger
    })
      //user kontrol
      //kara liste kontrol
    }
  };
});
