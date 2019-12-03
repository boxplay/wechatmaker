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
	product_id:0,
	product_has:'yes'
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
  changeProduct(e){
	  var product_id = e.currentTarget.dataset.id;
	  console.log(product_id)
	  this.setData({
		  product_id:product_id
	  })
  },
  changeHas(e){
	  var product_has = e.currentTarget.dataset.id;
	  console.log(product_has)
	  this.setData({
	  		  product_has:product_has
	  })
  },
  nextPage(){
	  if(!this.data.product_id || this.data.product_has == 'yes'){
		  wx.showToast({
		  		title: '请选择你的答案',
		  		icon: 'none',
		  		duration: 2000
		  })
	  }else{
		  var data = {
			  product_id:this.data.product_id,
			  product_has:this.data.product_has
		  }
		  //跳转下一页
		  wx.navigateTo({
		  	url:'subdata',
		  	events:{
		  	},
		  	success(res){
		  		res.eventChannel.emit('productTypeFunc', data)
		  	}
		  })
	  }
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