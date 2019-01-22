aplication.controller("registerctrl", function($scope, $location) {
  $scope.registerdata = {
    ad: "",
    soyad: "",
    email: "",
    password: "",
    cpassword: "",
    phone: ""
  };
  $scope.checkRegisterForm = () => {
    if (
      $scope.registerdata.ad.trim() == "" ||
      $scope.registerdata.ad.trim().length < 3
    ) {
      Component.showmessage("Uyarı", "İsim Alanı Geçersiz");
    } else if (
      $scope.registerdata.soyad.trim() == "" ||
      $scope.registerdata.soyad.trim().length < 3
    ) {
      Component.showmessage("Uyarı", "SoyAd Alanı Geçersiz");
    } else if (!Component.validateemail($scope.registerdata.email.trim())) {
      Component.showmessage("Uyarı", "Email Adresi Geçersiz");
    } else if (
      $scope.registerdata.password.trim() == "" ||
      $scope.registerdata.password.trim().length < 8
    ) {
      Component.showmessage("Uyarı", "Şifre Alanı Geçersiz");
    } else if (
      $scope.registerdata.cpassword.trim() == "" ||
      $scope.registerdata.cpassword.trim().length < 8
    ) {
      Component.showmessage("Uyarı", "Şifre Alanı Geçersiz");
    } else if (
      $scope.registerdata.cpassword.trim() !=
      $scope.registerdata.password.trim()
    ) {
      Component.showmessage("Uyarı", "Parolalar Eşleşmiyor");
    } else if (
      $scope.registerdata.phone.trim().length < 11 ||
      $scope.registerdata.phone.trim() == ""
    ) {
      Component.showmessage("Uyarı", "Telefon Numrası Geçersiz");
    }else {

    }
  };
});
