var sendmail="MailService/sendmail.php";
var  MailService= {
    sendmail: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(sendmail, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
}