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
    outLogin: function () {
        localStorage.clear();
        sessionStorage.clear();
    },
    CheckSession: function () {

    },
    onLogin: function () {
        var deferred = new Promise(function (resolve, reject) {
            var st = sessionStorage.getItem("UA");
            var ls = localStorage.getItem("UA")
            if (st && ls) {
                if (st == ls) {

                }
            } else {
                UseronLogin.outLogin()
            }
        })
        return deferred;
    },
}