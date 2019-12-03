// pages/index/article.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'Wechat Maker',
    menu_icon: 'menu',
    isIpx: app.globalData.isIpx ? true : false,
    menu_show: "",
    open: '',
    iphonex: '',
    noscroll:'',
    toView: 'p_2',
    list_open1: '',
    list_open2: '',
    list_open3: '',
    up1: '',
    up2: '',
    up3: '',
    lang:'',
    home: wx.T.locales["home"],
    develop: wx.T.locales["develop"],
    news: wx.T.locales["news"],
    stories: wx.T.locales["stories"],
    next: wx.T.locales["next"],
    platforms: wx.T.locales["platforms"],
    wxmp: wx.T.locales["wxmp"],
    wxopen: wx.T.locales["wxopen"],
    wxpay: wx.T.locales["wxpay"],
    wxad: wx.T.locales["wxad"],
    wxai: wx.T.locales["wxai"],
    wxemo: wx.T.locales["wxemo"],
    wxgame: wx.T.locales["wxgame"],
    wxmini: wx.T.locales["wxmini"],
    wxent: wx.T.locales["wxent"],
    wxread: wx.T.locales["wxread"],
    slogan: wx.T.locales["slogan"],
    list_1: wx.T.locales["list_1"],
    list_2_1: wx.T.locales["list_2_1"],
    list_2_2: wx.T.locales["list_2_2"],
    list_2_3: wx.T.locales["list_2_3"],
    list_2_4: wx.T.locales["list_2_4"],
    list_2_1_1: wx.T.locales["list_2_1_1"],
    list_2_1_2: wx.T.locales["list_2_1_2"],
    list_2_1_3: wx.T.locales["list_2_1_3"],
    list_2_2_1: wx.T.locales["list_2_2_1"],
    list_2_2_2: wx.T.locales["list_2_2_2"],
    list_2_2_3: wx.T.locales["list_2_2_3"],
    list_2_3_1: wx.T.locales["list_2_3_1"],
    list_2_3_2: wx.T.locales["list_2_3_2"]

  },
  toViewClick: function (e) {
    console.log(e.target.dataset.hash)
    this.setData({
      menu_show:'hide',
      toView: e.target.dataset.hash,
      open: '',
    })
  },
  openMenu: function (e) {
    var that = this

    if (that.data.open == '1') {
      that.setData({
        open: '',
        menu_show: 'left:-100vw;box-shadow:none;',
      })
    } else {
      that.setData({
        open: '1',
        menu_show: 'left:0;box-shadow:0 50rpx 50rpx rgba(0,0,0,.5);',
      })
    }
  },
  toggleClick1: function (e) {
    console.log(this.data.list_open1)
    console.log(this.data.list_open2)
    console.log(this.data.list_open3)
    var that = this
    if (that.data.list_open1 == '') {
      that.setData({
        list_open1: '1',
        list_open2: '',
        list_open3: '',
        up1: "up",
        up2: "",
        up3: "",
      })
    } else {
      that.setData({
        list_open1: '',
        list_open2: '',
        list_open3: '',
        up1: "",
        up2: "",
        up3: "",
      })
    }
  },
  toggleClick2: function (e) {
    console.log(this.data.list_open1)
    console.log(this.data.list_open2)
    console.log(this.data.list_open3)
    var that = this
    if (that.data.list_open2 == '') {
      that.setData({
        list_open2: '1',
        list_open1: '',
        list_open3: '',
        up1: "",
        up2: "up",
        up3: "",
      })
    } else {
      that.setData({
        list_open2: '',
        list_open1: '',
        list_open3: '',
        up1: "",
        up2: "",
        up3: ""
      })
    }
  },
  toggleClick3: function (e) {
    console.log(this.data.list_open1)
    console.log(this.data.list_open2)
    console.log(this.data.list_open3)
    var that = this
    if (that.data.list_open3 == '') {
      that.setData({
        list_open3: '1',
        list_open2: '',
        list_open1: '',
        up1: "",
        up2: "",
        up3: "up"
      })
    } else {
      that.setData({
        list_open3: '',
        list_open2: '',
        list_open1: '',
        up1: "",
        up2: "",
        up3: ""
      })
    }
  },
  gohome: function (e) {
    wx.redirectTo({
      url: 'home',
    })
  },
  goarticle: function (e) {
    wx.redirectTo({
      url: 'article',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.toView != undefined){
      this.setData({
        toView: options.toView
      })
    }
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          lang:res.language
        })
        // if (app.globalData.language == "zh_CN"){
        //   wx.setNavigationBarTitle({
        //     title: '微信创客',
        //   })
        // }else{
        //   wx.setNavigationBarTitle({
        //     title: 'WeChat Maker',
        //   })
        // }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})