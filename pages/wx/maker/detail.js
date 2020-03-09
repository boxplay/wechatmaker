const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detail: '',
		video: '',
		selectedIndex: 0,
		padPosterStyle: '',
		phoneStyle: '',
		posterStyle: '',
		imgLoad:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(typeof(options.index) == 'undefined')
		if(typeof(options.index) != 'undefined'){
			wx.removeStorageSync('item')
		}
		var that = this;
		var data = wx.getStorageSync('item');
		if(!data && typeof(options.index) != 'undefined'){
			console.log(options.index)
			console.log('没有缓存,开始请求数据')
			var that = this;
			var selectedIndex = options.index
			wx.showLoading('加载中...')
			wx.request({
				url: 'https://someetapi.someet.cc/poster.json',
				data: {},
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: function(res) {
					var list = res.data.makers
					var reqData = list.find((val,index)=>{
						return selectedIndex == val.index
					})
					that.setData({
						detail: reqData.detail,
						video: reqData.video,
						selectedIndex: reqData.index,
						padPosterStyle: res.data.padPosterStyle,
						phoneStyle: res.data.phoneStyle,
						posterStyle: res.data.posterStyle
					})
				}
			})
		}else{
			that.setData({
				detail: data.detail,
				video: data.video,
				selectedIndex: data.index,
				padPosterStyle: data.padPosterStyle,
				phoneStyle: data.phoneStyle,
				posterStyle: data.posterStyle
			})
		}
		wx.hideLoading()
	},
	posterLoad(e) {
		var index = e.currentTarget.dataset.index
		console.log(index)
		if (index == 0) {
			this.setData({
				imgLoad:true
			})
		}
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
