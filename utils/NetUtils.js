/**
 * 网络工具类
 */
export default class NetUtils {

    /**
     * post请求调用
     */
    post = (url, params, onStart, onSuccess, onFailed)  => {
        this.request(url, params, "POST", onStart, onSuccess, onFailed);
    };

    /**
     * FIXME 根据具体服务器状况进行修改
     * get请求调用
     */
    get = (url, params, onStart, onSuccess, onFailed) => {
        this.request(url, params, "GET", onStart, onSuccess, onFailed);
    };

    /**
     * function: 封装网络请求
     * @url URL地址
     * @params 请求参数
     * @method 请求方式：GET/POST
     * @onStart 开始请求,初始加载loading等处理
     * @onSuccess 成功回调
     * @onFailed  失败回调
     */
    request = (url, params, method, onStart, onSuccess, onFailed) => {

        console.log("-----------------------网络信息onStart------------------------");
        console.log("url:" + url);

        onStart(); //request start
        wx.request({
            url: url,
            data: params,
            method: method,
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) { //若请求成功，返回请求信息res.data
                console.log("-----------------------网络信息onSuccess------------------------");
                console.log(res);
                if (res.statusCode !== 200 || res.errMsg !== "request:ok") onFailed("");
                else onSuccess(res.data)
            },

            fail: function (error) {  //若请求失败，则进入onFailed
                console.log("-----------------------网络信息onFailed------------------------");
                console.log(error);
                onFailed(error); //failure for another reasons
            }
        })
    };

    /**
     * 上传图片
     * @param path
     * @param start
     * @param success
     * @param fail
     * @param complete
     */
    uploadImage = (path, start, success, fail, complete) => {
        var url = 'https://api.laifit.com:4990/img_upload/';
        console.log("-----------------------文件上传onStart------------------------");
        console.log("url:" + url);
        console.log("file:" + path);
        var formData = {idd: getApp().globalData.userId};
        start();
        wx.uploadFile({
            url: url,
            filePath: path,
            name: 'txt_photo',
            formData: formData,
            success: function (res) {
                console.log("-----------------------文件上传onUpdate------------------------");
                console.log(res);
                success(res)
            },
            fail: function () {
                console.log("-----------------------文件上传onFailed------------------------");
                fail()
            },
            complete: function () {
                complete()
            }
        });
    };

    /**
     * 批量上传图片
     * @param filePaths
     * @param update
     * @param success
     * @param fail
     */
    uploadImages = (/*url, */filePaths, /*formData, */update, success, fail) => {
        console.log(filePaths, update, success, fail);
        if (filePaths.length === 0) {
            success();
            // complete();
            return;
        }
        var url = 'https://api.laifit.com:4990/img_upload/';
        var formData = {idd: getApp().globalData.userId};
        var temps = filePaths.slice();
        var temp = temps.pop();
        console.log("-----------------------文件上传onStart------------------------");
        console.log("url:" + url);
        console.log("file:" + temp);
        wx.uploadFile({
            url: url,
            filePath: temp,
            name: 'txt_photo',
            formData: formData,
            success: (res) => {
                console.log("-----------------------文件上传onUpdate------------------------");
                console.log(res, temp, temps);
                update(res);
                this.uploadImages(temps, update, success, fail)
            },
            fail: function () {
                console.log("-----------------------文件上传onFailed------------------------");
                fail()
            },
        });
    }
}