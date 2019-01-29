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
      UserService.getUser({MN:"get"}).then(function (res) {

      })
      //user kontrol
      //kara liste kontrol
    }
  };
});
