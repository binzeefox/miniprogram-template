// components/common/imageSwiper/imageSwiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //图片源
    images: {
      type: Array,
      value: [
        {
          img: "http://xxx.xxx/xxx.jpg",  //图片路径
          action: "http://xxx.xxx/xxx.html"   //动作，检索路径，若为html结尾则进入html页面，否则作为字符串进行判断，若为“class://”开头，则后面的内容是课程ID，若为“shop://”则后面的内容是商铺ID
        }
      ],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0  //当前Index
  },

  /**
   * 组件的方法列表
   * bindimagechange: 绑定图片变化监听  e.detail.index 当前脚标
   * bindtapimage: 图片点击事件 e.detail.index 当前脚标; e.detail.action 活动
   */
  methods: {

    /**
     * 图片改变监听
     * @param e  e.detail.current 为当前idx
     * @private
     */
    _changeImage: function (e) {
      var idx = e.detail.current;
      this.setData({
        current: idx
      });
      // this.triggerEvent("imagechange", {index: idx})
    },

    /**
     * 图片点击事件
     * @param e
     * @private
     */
    _tapImage: function (e) {
      const action = e.currentTarget.id;
      const idx = this.data.current;
      const url = this.data.images[idx].img;
      this.triggerEvent("tapimage", {action: action, index: idx, url: url})
    }
  }
});
