var userservice="User/user.php";
var  UserService= {
    addUser: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(userservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
}