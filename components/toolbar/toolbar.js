// components/toolbar/toolbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    //工具栏标题
    title: {
      type: String,
      value: "标题"
    },

    transparent: {
      type: Boolean,
      value: true
    },

    //地址文字
    locationText: {
      type: String,
      value: "地址"
    },

    //显示地址按钮
    showLocation: {
      type: Boolean,
      value: false
    },

    //显示搜索框
    showSearchBar: {
      type: Boolean,
      value: false
    },

    //显示返回按钮
    showAsUp: {
      type: Boolean,
      value: false
    },

    //风格
    isLight: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: Page.globalSize.capsuleHeight,
    statusBarHeight: Page.globalSize.statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 地址按钮点击事件
     */
    _tapLocation: function () {
      this.triggerEvent("taplocation")
    },

    /**
     * 点击搜索框
     */
    _tapSearch: function () {
      // this.triggerEvent("tapsearch")
      wx.navigateTo({  //跳转到搜索页
        url: '../search/search?type=default'
      })
    },

    /**
     * 点击返回键
     */
    _tapBack: function () {
      this.triggerEvent("tapback");
      wx.navigateBack()
    }
  }
});
