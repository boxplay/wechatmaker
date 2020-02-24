const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
	index:0,
	video:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
	var index = options.index
	this.setData({
		index:index
	})
	console.log(index)
    //details
    wx.request({
      url: 'https://someetapi.someet.cc/poster.json',
      data: {
        
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
		var list = res.data.makers
		for (var [key,row] of list.entries()) {
			if(key == that.data.index){
				that.setData({
					detail:row.detail,
					video:row.video
				})
			}
		}
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