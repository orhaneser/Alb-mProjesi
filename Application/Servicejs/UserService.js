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
    getUser:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(userservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    }
}