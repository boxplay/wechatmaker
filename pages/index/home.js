// pages/index/home.js
const app = getApp()

Page({
  data: {
    imgUrls:[],
    currentSwiper: 0,
    newsUrls:[],
    storiesUrls:[],
    title: 'Wechat Maker',
    isIpx: app.globalData.isIpx ? true : false,
    menu_icon: 'menu',
    menu_show: "",
    open: '',
    prev_m: '',
    next_m: '',
    s_index: '2',
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
  onSlideChange: function (e) {
    this.setData({
      s_index: e.detail.current
    })
  },

  swiperChange: function (e) {
    // console.log(e.detail.current)
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  detail:function(e){
    // console.log(e.currentTarget.dataset.url)
    var detail_id = e.currentTarget.dataset.id;
    var detail_title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'detail?id=' + detail_id + "&title=" + detail_title,
    })
  },
  detail_img: function (e) {
    // console.log(e.currentTarget.dataset.url)
    var detail_id = e.currentTarget.dataset.id;
    var detail_title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'detail_img?id=' + detail_id + "&title=" + detail_title,
    })
  },
  banner_detail: function (e) {
    // console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
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
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res.windowWidth);
        var win_w = res.windowWidth;
        var win_img_w = win_w * .533 + 40;
        var p_m = (win_w - win_img_w);
        // console.log(win_img_w)
        that.setData({
          prev_m: p_m + "rpx",
          next_m: p_m + "rpx"
        })
      },
    })
    //banner
    wx.request({
      url: 'https://makerforwx.someet.cc/v3/banners.json',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        var pics = res.data.data;
        that.setData({
          imgUrls:pics
        })
      }
    })
    //news
    wx.request({
      url: 'https://makerforwx.someet.cc/v3/topics.json',
      data: {
        gener:"合作相关内容报道"
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var list = res.data.data;
        // console.log(list)
        that.setData({
          newsUrls: list
        })
      }
    })

    //stories
    wx.request({
      url: 'https://makerforwx.someet.cc/v3/topics.json',
      data: {
        gener: '微信创客快报'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var list = res.data.data;
        // console.log(list)
        that.setData({
          storiesUrls: list
        })
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