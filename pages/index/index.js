//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    title:'Wechat Maker',
    isIpx: app.globalData.isIpx ? true : false,
    menu_icon:'menu',
    menu_show:"",
    open:'',
    iphonex: '',
    toView: 'p_2',
    top_bar:'',
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
  //事件处理函数
  toViewClick: function (e) {
    wx.redirectTo({
      url: 'article?toView=' + e.target.dataset.hash,
    })
  },

  // openMenu:function(e){
  //   var that = this

  //   if (that.data.open == '1'){
  //     that.setData({
  //       open: '',
  //       menu_show:'left:-100vw;box-shadow:none;',
  //       top_bar:'filter:invert(100%);'
  //     })
  //   }else{
  //     that.setData({
  //       open: '1',
  //       menu_show:'left:0;box-shadow:0 50rpx 50rpx rgba(0,0,0,.5);',
  //       top_bar: 'filter:invert(0);'
  //     })
  //   }
  // },
  gohome:function(e){
    wx.redirectTo({
      url: 'home',
    })
  },
  goarticle: function (e) {
    wx.redirectTo({
      url: 'article',
    })
  },

  onLoad: function () {
    var that = this;
    
    

  }
})
