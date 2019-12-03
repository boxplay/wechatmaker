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
  },
  oHome: function (e) {
    wx.redirectTo({
      url: 'home',
    })
  },
  goIndex: function (e) {
    wx.redirectTo({
      url: 'index',
    })
  },  
  goSubPage(){
	  wx.redirectTo({
		  url:'subpage'
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
		if(app.globalData.isIpx){
			that.setData({
				scrollHeight:Number(win_h*2 - 156) + 'rpx'
			})
			console.log(that.data.scrollHeight)
		}
      },
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