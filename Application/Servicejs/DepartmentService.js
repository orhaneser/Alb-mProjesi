var departmentservice="Department/department.php";
var  departmentService= {
    updateDepartment: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(departmentservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
    getdepartment:function (json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(departmentservice, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    }
}