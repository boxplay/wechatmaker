// pages/index/home.js
const app = getApp()

Page({
  data: {
    newsUrls:[],
    title: 'Wechat Maker',
    isIpx: app.globalData.isIpx ? true : false,
	home: wx.T.locales["home"],
	develop: wx.T.locales["develop"],
	scrollHeight:'88rpx',
  isSmall: app.globalData.isSmall ? true : false,
  },
  goHome: function (e) {
    wx.redirectTo({
      url: '/pages/wx/home',
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
  goMaker: function(e) {
  	wx.redirectTo({
  		url: '/pages/wx/maker/index',
  	})
  },
  goIndex: function (e) {
    wx.redirectTo({
      url: '/pages/wx/index',
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
		var win_h = res.windowHeight
        var p_m = (win_w - win_img_w);
        // console.log(win_img_w)
        that.setData({
          prev_m: p_m + "rpx",
          next_m: p_m + "rpx"
        })
		if(app.globalData.isIpx){
			that.setData({
				scrollHeight:Number(win_h*2 - 168) + 'rpx'
			})
			
		}else if(app.globalData.isSmall){
      that.setData({
        scrollHeight:Number(win_h*2 + 48) + 'rpx'
      })
      
    }else{
			that.setData({
				scrollHeight:Number(win_h*2 - 240) + 'rpx'
			})
			
		}
      },
    })
	//预加载图片
    //banner
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
        console.log(list)
        that.setData({
          newsUrls: list
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