var LoginControl={
    onLoginCheck:function (param) {
        localStorage.clear();
        sessionStorage.clear();
        var deferred = new Promise(function (resolve, reject) {
            UserService.loginControl({
                MN: "get", param: [{
                    uname: param.usname,
                    upass: MD5(param.upass)
                }]
            }).then(function (res) {
                if(typeof res=="object"){
                    localStorage.setItem("UA", Base64.encode(JSON.stringify(res)));
                    sessionStorage.setItem("UA", Base64.encode(JSON.stringify(res)));
                    resolve(true);
                }else{
                    resolve(false);
                }
            })
        })
        return deferred;
    },
    delSession:function(){
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST("Session/session.php",{MN:"del"}).then(function (res) {
                if(res=="204"){
                    localStorage.clear();
                    sessionStorage.clear();
                    resolve(true)
                }else{
                    resolve(false);
                }
            })
        })
        return deferred
    },
    outLogin: function () {
        localStorage.clear();
        sessionStorage.clear();
        window.open("#!","_self")
        LoginControl.delSession();
    },
    SessionControl: function () {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST("Session/session.php",{MN:"get"}).then(function (res) {
                if(res=="200"){
                    resolve(true)
                }else{
                    resolve(false);
                }
            })
        })
        return deferred
    },
    UserControl:function(data){
        var deferred=new Promise((resolve,reject)=>{
            UserService.getUser({MN:"get",where:"ulgnname=?",param:[data[0].mail]}).then((res)=>{
                if(typeof res=="object"){
                    resolve(res);
                }else{
                    resolve(false);
                }
            })
        })
        return deferred;
    },
    BlockListControl:function(data){
        debugger
    var deferred=new Promise(function (resolve, reject) {
        RegisterService.getblocklist({MN:"get",where:"email=? ",param:[data[0].mail]}).then(res=>{
            if(res=="None"){
                resolve(true);
            }else{
                resolve(false);
            }
        })
    })
        return deferred;
    },
    onLogin: function () {
        var deferred = new Promise(function (resolve, reject) {
            var st = sessionStorage.getItem("UA");
            var ls = localStorage.getItem("UA")
            if (st && ls) {
                if (st == ls) {
                    LoginControl.UserControl(JSON.parse(Base64.decode(localStorage.getItem("UA")))).then(function (res) {
                    if(res==false){
                        Component.showmessage("Uyarı","Bu Hesap Mevcut Değildir.")
                        LoginControl.outLogin();
                    }else{
                        LoginControl.BlockListControl(res).then(function (res) {
                            if(res==false){
                                Component.showmessage("Uyarı","Bu Hesap Askıya Alınmıştır.")
                                LoginControl.outLogin();
                            }else{
                                LoginControl.SessionControl().then(function (res) {
                                    if(res==false){
                                        LoginControl.outLogin();
                                    }else{
                                        resolve(true);
                                    }
                                })
                            }
                        })
                    }
                })
                }
            } else {
                LoginControl.outLogin()
            }
        })
        return deferred;
    },
}