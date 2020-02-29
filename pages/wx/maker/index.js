// pages/index/home.js
const app = getApp()

Page({
	data: {
		newsUrls: [],
		title: 'Wechat Maker',
		isIpx: app.globalData.isIpx ? true : false,
		home: wx.T.locales["home"],
		develop: wx.T.locales["develop"],
		articleList: wx.T.locales["articleList"],
		scrollHeight: '88rpx',
		isSmall: app.globalData.isSmall ? true : false,
		vertical: false,
		autoplay: false,
		interval: 2000,
		duration: 500,
		imgHeight: 0,
		currentIndex:1,
		posterList:[111]
	},
	goHome: function(e) {
		console.log('12312')
		wx.redirectTo({
			url: '/pages/wx/maker/home',
		})
	},
	detail: function(e) {
		// console.log(e.currentTarget.dataset.url)
		var detail_id = e.currentTarget.dataset.id;
		var detail_title = e.currentTarget.dataset.title;
		wx.navigateTo({
			url: 'detail?id=' + detail_id + "&title=" + detail_title,
		})
	},
	goIndex: function(e) {
		wx.redirectTo({
			url: '/pages/wx/index',
		})
	},
	goMaker: function(e) {
		wx.redirectTo({
			url: '/pages/wx/maker/index',
		})
	},
	changeSlider(e){
		var index = e.detail.current;
		this.setData({
			currentIndex:index
		})
	},
	imgH: function(e) {
		var index = e.currentTarget.dataset.index 
		if(index >0){
			return false
		}
		var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
		var imgh = e.detail.height; //图片高度
		var imgw = e.detail.width;
		// imgw = winWid - 140
		var swiperH = (winWid - 140)/imgw *imgh +'px'
		console.log(swiperH)
		this.setData({
			imgHeight: swiperH //设置高度
		})
	},
	goMakerDetail(e){
		var index = e.currentTarget.dataset.index 
		wx.navigateTo({
			url:'/pages/wx/maker/detail?index='+index
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		wx.request({
			url: 'https://someetapi.someet.cc/poster.json',
			data: {
			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				var list = res.data.makers
				wx.setStorageSync('imgList',res.data)
				that.setData({
					posterList:list
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
