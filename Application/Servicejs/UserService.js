var userservice="User/user.php";
var loginservice="Login/login.php";
var  UserService= {
    addUser: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(userservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    loginControl:function(json){
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(loginservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    setUser:function(json){
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(userservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getLayout:function(json){
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST("Layouts/layouts.php", json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getUser:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(userservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    }
}