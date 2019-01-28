aplication.controller("registerctrl", function($scope, $location,$http) {
  $scope.facultylist=[];
  $scope.registerdata = {
    ad: "",
    soyad: "",
    email: "",
    password: "",
    cpassword: "",
    phone: ""
  };
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
      RegisterService.addRegister({MN:"add",
      registerdata:[{
        uname:name.toUpperCase(),
        ulastname:lastname.toUpperCase(),
        uphone:phone,
        umail:mail,
        ufaculty:faculty,
        udepartment:department,
        upass:md5(pass),
        rcode:md5($scope.makeid())+"+"+ new Date().toLocaleDateString().split(".")[0] + new Date().toLocaleDateString().split(".")[1] + new Date().toLocaleDateString().split(".")[2],
        ucity:city,
        uyear:year
      }]
    }).then(function (res) {
          if(res=="Succes"){

            RegisterService.getRegister({ MN:"get",where:"umail=?",param:[$scope.registerdata.email]}).then(function (res) {
              if(typeof res =="object"){
                var host="http://localhost/electrotest/#!/RegisterCheck?"
                var msgg="<html><body>";
                msgg+="<b>Kayıt oldugunuz için teşekkürler</b>";
                msgg+="<br>";
                msgg+="<b>buraya tıklayarak kaydınızı aktif edebilirsiniz</b>";
                msgg+="<br>";
                msgg+=host+res[0].rcode;
                msgg+="<hr>";
                msgg+="<br>";
                msgg+="<b>Tüm Haklar Gizlidir.</b>";
                msgg+="</body></html>";
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
                  })
                }
                else{
                  //mail gitmedi
                }
                })
              }else{
              //kayıt yok
              }
            })


          }else{
            //kayıt eklenemedi
          }
    })
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
