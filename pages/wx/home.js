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
	userInfo:{'nickName':''}
  },
  onGotUserInfo(e){
	  var that = this
  	  wx.setStorageSync('userInfo',e.detail.userInfo)
  	  app.globalData.userInfo = e.detail.userInfo
	  if(e.detail.userInfo.nickName){
		  wx.getImageInfo({
			  src: e.detail.userInfo.avatarUrl,//下载微信头像获得临时地址
			  success: res => {
				  //将头像缓存在全局变量里
				  app.globalData.avatarUrlTempPath = res.path;
				  wx.navigateTo({
				  	url:'subpage'
				  })
			  },
			  fail: res => {
				  wx.navigateTo({
				  	url:'subpage'
				  })
			  }
		  });
	  }else{
		  wx.showToast({
		  	title: '获取用户信息失败',
		  	icon: 'none', 
		  	duration: 2000
		  })
	  }
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
	  wx.navigateTo({
		  url:'subpage'
	  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
	var userInfo = wx.getStorageSync('userInfo')
	console.log(userInfo)
	if(userInfo){
		this.setData({
			userInfo:userInfo
		})
		app.globalData.avatarUrlTempPath = userInfo.avatarUrl
	}else{
		this.setData({
			userInfo:null
		})
	}
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