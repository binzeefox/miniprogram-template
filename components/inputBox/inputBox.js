// components/common/inputBox/inputBox.js

/**
 * 用于底部贴边的可隐藏输入框
 * FIXME 回车换行后，textarea高度不变
 */
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //是否显示
        show: {
            type: Boolean,
            value: false
        },
        //按钮上的文字
        button: {
            type: String,
            value: '确定'
        },

        placeholder: {
            type: String,
            value: '回复'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        input: '',
        value: ''
    },

    /**
     * 生命周期
     */
    lifetimes: {
        ready() {
            // 在组件实例进入页面节点树时执行
            this.setData({
                value: '',
                input: ''
            });
        }
    },

    /**
     * 组件的方法列表
     * bindtapbutton: 绑定按钮
     */
    methods: {

        /**
         * 获得焦点
         */
        _onFocus: function(e) {

        },

        /**
         * 点击弹窗外部
         */
        _dismiss: function () {
            // this.triggerEvent("dismiss");
            if (this.data.input !== undefined && this.data.input != null && !this.data.input.match(/^\s*$/)) {
                wx.showModal({
                    title: '提示',
                    content: '您的输入框内有输入内容，是否取消输入？',
                    showCancel: true,
                    success: res => {
                        if (res.confirm) {
                            this.setData({
                                show: false,
                                value: '',
                                input: ''
                            })
                        }
                    }
                });
            } else {
                this.setData({
                    show: false,
                    value: '',
                    input: ''
                })
            }
        },

        /**
         * 文字输入
         */
        _input: function (e) {
            var input = e.detail.value;
            this.setData({
                input: input
            })
        },

        /**
         * 点击按钮
         */
        _tapButton: function () {
            if (this.data.input !== undefined && this.data.input != null && !this.data.input.match(/^\s*$/)) {
                this.triggerEvent("tapbutton", {value: this.data.input});
            }
            this.setData({
                show: false,
                value: '',
                input: ''
            })
        }
    }
});
