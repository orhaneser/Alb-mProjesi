var Provider = {
    AjaxPOST: function (servicename,json) {
        debugger
        var deferred = new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "http://localhost/electrotest/Services/"+servicename,
                datatype: 'application/json',
                data: json,
                success: function (data, status, xhr) {
                    if (!data.length) {
                        resolve(data.status);
                    } else {
                        resolve(data);
                    }
                },
                error: function (data, status, xhr) {
                    resolve("")
                }
            });
        });
        return deferred;
    },
    AjaxGET: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "/electrotest/Services/ServicesRequests.php",
                datatype: 'application/json',
                data: json,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                success: function (data, status, xhr) {
                    if (!data.length) {
                        resolve(data.status);
                    } else {
                        resolve(data);
                    }
                },
                error: function (data, status, xhr) {
                    resolve("")
                }
            });
        });
        return deferred;
    }
}