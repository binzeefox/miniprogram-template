//app.js
import Strings from "./assets/resource/Strings";
import GlobalData from "./assets/resource/GlobalData";
import GlobalSize from "./assets/resource/Digits";
import Utils from "./utils/Utils";

App({
  onLaunch: function () {
    this._init();
    console.log(Page)
  },

  /**
   * 初始化数据
   * @private
   */
  _init: function () {
    this._insertFunction();

    wx.getSystemInfo({
      success: res => {
        console.log(res);
        this.globalSize.screenHeight = res.screenHeight;
        this.globalSize.screenWidth = res.screenWidth;
        this.globalSize.statusBarHeight = res.statusBarHeight;
        this.globalSize.windowHeight = res.windowHeight;
        this.globalSize.windowWidth = res.windowWidth;
        this.globalSize.capsuleHeight = res.windowHeight / 10;
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },

  /**
   * 为Page类注入工具
   */
  _insertFunction: function(){
    Page.strings = Strings; //全局通用文字
    Page.globalData = this.globalData;  //全局数据
    Page.globalSize = GlobalSize; //全局通用尺寸

    Page.utils = new Utils(); //工具类
    //封装跳转
    Page.navigateTo = (path, params) => {
      const paramsArray = [];
      let url = '';
      if (params) {
        Object.keys(params)
            .forEach(key => paramsArray.push(key + '=' + params[key]));
        url = path + (params ? ( '?' + paramsArray.join('&')) : '');
      } else url = path;
      wx.navigateTo({url})
    };
  },

  globalData: GlobalData,
  globalStrings: Strings,
  globalSize: GlobalSize,
});