export default class PopupUtil {

  /**
   * 弹窗
   * @param cont 内容
   * @param flag 是否显示取消按钮
   * @param fnConfirm
   * @param fnComplete
   */
  static showModal = (cont, flag, fnConfirm, fnComplete) => {
    wx.showModal({
      title: '提示',
      content: cont,
      showCancel: flag,
      success(res) {
        if (res.confirm) {
          if(fnConfirm != null){
            fnConfirm()
          }
        }
        else if (res.cancel) {

        }
      },
      complete() {
        if(fnComplete != null){
          fnComplete()
        }
      }
    })
  };

  /**
   * 显示提示文本
   */
  static showToast = (cont, icon) => {
    wx.showToast({
      title: cont,
      icon: icon || 'none'
    })
  };
}