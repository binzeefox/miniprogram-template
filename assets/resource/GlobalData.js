/**
 * 全局数据保存，接替App.js中的globalData
 */
export default {
    baseUrl: "",  //基础网络请求路径
    openId: '', //登陆用户的openId
    userId: 0,   //登陆用户的用户ID，独立于微信，属于业务自己的ID
    location: null  //位置信息
}