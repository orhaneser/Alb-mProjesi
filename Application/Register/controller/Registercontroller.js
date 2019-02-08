aplication.controller("registerctrl", function($scope, $location,$http) {
  var code;
  $scope.facultylist=[];
  $scope.registerdata = {
    ad: "",
    soyad: "",
    email: "",
    password: "",
    cpassword: "",
    phone: ""
  };
  $scope.captchacode="";
  $scope.yearsarray = [];
  const year = parseInt(new Date().toLocaleDateString().split(".")[2]);
  for (let index = year; index >= year - 20; index--) {
    $scope.yearsarray.push(index);
  }
  $scope.getplugins=()=>{
    $scope.getfaculty();
    $scope.getcity();
  }
  $scope.getcity=()=>{
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
  $scope.getdepartmant=(faculty)=>{
      $scope.deparmentlist=[];
      RegisterService.getdepartmant({MN: "get", where: "fid=?", param: [faculty.fid]}).then(function (res) {
        if(res!="None"){
          $scope.$apply(() => {
            res.forEach(element => {
              $scope.deparmentlist.push(element);
            });
          })
        }
      })
  }
  $scope.makeid= ()=> {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },
  $scope.addRegister=(name,lastname,phone,mail,faculty,department,pass,city,year)=>{
    $('.preloader').css('display',"block");
      RegisterService.addRegister({MN:"add",
      registerdata:[{
        uname:name.toUpperCase(),
        ulastname:lastname.toUpperCase(),
        uphone:phone,
        umail:mail,
        ufaculty:faculty,
        udepartment:department,
        upass:MD5(pass),
        rcode:MD5($scope.makeid())+"+"+ new Date().toLocaleDateString().split(".")[0] + new Date().toLocaleDateString().split(".")[1] + new Date().toLocaleDateString().split(".")[2],
        ucity:city,
        uyear:year
      }]
    }).then(function (res) {
          if(res=="Succes"){
            RegisterService.getRegister({ MN:"get",where:"umail=?",param:[$scope.registerdata.email]}).then(function (res) {
              if(typeof res =="object"){
                var host="http://localhost/electrotest/#!/RegisterCheck?"
                var msgarr=["<html><body>","<b>Kayıt oldugunuz için teşekkürler</b>","<br>","<b>buraya tıklayarak kaydınızı aktif edebilirsiniz</b>","<br>",host+res[0].rcode,"<hr>","<br>","<b>Tüm Haklar Gizlidir.</b>","</body></html>"]
                var msgg=msgarr.join("");
                // var msgg="<html><body>";
                // msgg+="<b>Kayıt oldugunuz için teşekkürler</b>";
                // msgg+="<br>";
                // msgg+="<b>buraya tıklayarak kaydınızı aktif edebilirsiniz</b>";
                // msgg+="<br>";
                // msgg+=host+res[0].rcode;
                // msgg+="<hr>";
                // msgg+="<br>";
                // msgg+="<b>Tüm Haklar Gizlidir.</b>";
                // msgg+="</body></html>";
                MailService.sendmail({MN:"sendmail",maildata:[{subject:"KAYIT AKTİVİTASYONU",messega:msgg,mail:res[0].umail}]}).then(function (res) {
                if(res=="Succes"){
                  $scope.$apply(()=>{
                    $scope.registerdata = {
                      ad: "",
                      soyad: "",
                      email: "",
                      password: "",
                      cpassword: "",
                      phone: ""
                    };
                    $scope.fselect=null;
                    $scope.dselect=null;
                    $scope.cselect=null;
                    $scope.selected=null;
                    $scope.captchacode="";
                  })
                  $('.preloader').addClass('complete');
                  Component.showmessage("Bilgilendirme","Kayıt İşleminiz Başarı ile Gerçekleşti Lütfen Email Adresinizi Kontrol Ediniz")
                }

                else{
                  Component.showmessage("Uyaro","Mail Gönderilirken Bir Hata Meydana Geldi Lütfen Daha Sonra Tekrar Deneyiniz.")
                }
                })
              }else{
              //kayıt yok
              }
            })
          }else{
            Component.showmessage("Uyaro","Kaydınız Oluşturulurken Bir Promlem Gerçekleşti Lütfen Daha Sonra Tekrar Deneyiniz.")
          }
    })
  }
  $scope.createCode=()=>{
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      var index = Math.floor(Math.random() * charsArray.length + 1); 
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv);
  }
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
    }else if($scope.fselect==undefined){
      Component.showmessage("Uyarı", "Fakülte Seçiniz");
    }
    else if($scope.dselect==undefined){
      Component.showmessage("Uyarı", "Bölüm  Seçiniz");
    }else if($scope.cselect==undefined){
      Component.showmessage("Uyarı", "Şehir  Seçiniz");
    }
    else if ($scope.selected == undefined) {
      Component.showmessage("Uyarı", "Mezuniyet Yılı Seçiniz");
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
    }else if(code!=$scope.captchacode){
      Component.showmessage("Uyarı", "Güvenlik Kodu Geçersiz");
    }
    else {
      RegisterService.getblocklist({MN: "get", where: "email=? OR phone=?", param: [$scope.registerdata.email,$scope.registerdata.phone]}).then(function (res) {
        if(res=="None"){
          RegisterService.getusermail({MN:"get",where:"mail=?",param:[$scope.registerdata.email]}).then(function (res) {
                if(res=="None"){
                  RegisterService.getRegister({MN:"get",where:"umail=?",param:[$scope.registerdata.email]}).then(function (res) {
                        if(res=="None"){
                              $scope.addRegister( $scope.registerdata.ad.toUpperCase(),$scope.registerdata.soyad.toUpperCase(),$scope.registerdata.phone,$scope.registerdata.email,$scope.fselect.fid,$scope.dselect.blid, $scope.registerdata.password,$scope.cselect.cid,$scope.selected);
                        }else{
                          Component.showmessage("Uyarı","Bu Email Adresine Sahip Bir Üyelik Zaten Oluşturuldu Lütfen Email Adresinizi Kontrol Edin")
                        }
                  })
                }else{
                  Component.showmessage("Uyarı","Bu Email Adresine Sahip Bir Üyelik Mevcut")
                }
            })
        }else{
          Component.showmessage("Bu email adresi veya telefon numarası engellendi kayıt olamazsınız.")
        }
      })
    }
  };
});
