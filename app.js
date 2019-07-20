//app.js
import Strings from "./assets/resource/Strings";  //常用字符串保存类，用# Page.string[变量名] 来获取字符串
import GlobalData from "./assets/resource/GlobalData";  //全局数据，用来接替globalData，同时增加 # Page.globalData 方式来获取
import GlobalSize from "./assets/resource/Digits";  //常用数值保存类，用# Page.sizes[变量名] 来获取字符串
import Utils from "./utils/Utils";  //工具类

App({
    onLaunch: function () {
        this._init(); //初始化
        // console.log(Page)
    },

    /**
     * 初始化数据
     * @private
     */
    _init: function () {
        this._insertFunction(); //为Page.js 注入辅助方法

        wx.getSystemInfo({  //获取机身信息并存储
            success: res => {
                console.log(res);
                this.globalSize.screenHeight = res.screenHeight;
                this.globalSize.screenWidth = res.screenWidth;
                this.globalSize.statusBarHeight = res.statusBarHeight;
                this.globalSize.windowHeight = res.windowHeight;
                this.globalSize.windowWidth = res.windowWidth;
                this.globalSize.capsuleHeight = res.windowHeight / 10;  //胶囊高度近似为窗口高度的十分之一
            }
        });

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.login({  //先登录，刷新登录状态
                        success: () => {
                            wx.getUserInfo({
                                withCredentials: true,  //返回的userInfo中将会包含加密的信息
                                success: res => {
                                    // 可以将 res 发送给后台解码出 unionId
                                    this.globalData.userInfo = res.userInfo;
                                    this.globalData.encryptedData = res.encryptedData;
                                    this.globalData.iv = res.iv;

                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(true, res)   //成功则返回true和用户信息
                                    }
                                },
                                fail: () => {
                                    this.userInfoReadyCallback(false)   //失败则返回false
                                }
                            })
                        }
                    })
                } else console.error('app.js: 获取用户信息失败')
            }
        });
    },

    /**
     * 为Page类注入工具
     */
    _insertFunction: function () {
        Page.strings = Strings; //全局通用文字
        Page.globalData = this.globalData;  //全局数据
        Page.sizes = GlobalSize; //全局通用尺寸

        Page.utils = new Utils(); //工具类

        /**
         * 封装跳转
         * @param path  路径
         * @param params    跳转传参，object
         */
        Page.navigateTo = (path, params) => {
            const paramsArray = [];
            let url = '';
            if (params) {
                Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
                let tail = paramsArray.join('&');
                if (tail[1]) tail = '?' + tail;
                url = `${path}${tail}`
            } else url = path;
            wx.navigateTo({url})
        };
    },

    globalData: GlobalData,
    globalStrings: Strings,
    globalSize: GlobalSize,
});