var LoginControl={
    onLogin:function (param) {
        localStorage.clear();
        sessionStorage.clear();
        var deferred = new Promise(function (resolve, reject) {
            UserService.loginControl(param).then(function (res) {
                    if(res){
                        localStorage.setItem("UA", Base64.encode(JSON.stringify(res)));
                        sessionStorage.setItem("UA", Base64.encode(JSON.stringify(res)));
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