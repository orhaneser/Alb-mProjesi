var  PluginService= {
    pluginService: function (SN,json) {
        var deferred = new Promise(function (resolve, reject) {
            Provider.AjaxPOST(SN, json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
}