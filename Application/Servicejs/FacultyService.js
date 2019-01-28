var facultservice="Faculty/faculty.php";
var  FacultyService= {
    updatefaculty: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(facultservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getfaculty:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(facultservice,json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
}