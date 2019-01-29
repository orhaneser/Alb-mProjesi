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
    }
}