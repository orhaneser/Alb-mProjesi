var servicename="RegisterTemp/registertemp.php";
var cityservice="City/city.php";
var facultyservice="Faculty/faculty.php";
var departmentservice="Department/department.php";
var blocklist="BlockList/BlockList.php";
var usermail="UserMail/UserMail.php";
var  RegisterService={
    getRegister:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(servicename, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    addRegister:function(json){
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(servicename, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    delRegister:function(json){
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(servicename, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getcity:function (json) {
        var deferred = new Promise(function (resolve, reject) {
        Provider.AjaxPOST(cityservice,json).then(function (res) {
            resolve(res);
                 })
        })
        return deferred;
    },
    getfaculty:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(facultyservice,json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getdepartmant:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(departmentservice,json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getblocklist:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(blocklist,json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getusermail:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(usermail,json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;

    }
}