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
		isHuaWei: app.globalData.isHuaWei ? true : false,
		isPad: app.globalData.isPad ? true : false,
		vertical: false,
		autoplay: false,
		interval: 4500,
		duration: 500,
		imgHeight: 0,
		currentIndex: 0,
		posterList: [],
		isPlay: false,
		isLoad: false,
		padPosterStyle: '',
		phoneStyle: '',
		posterStyle: '',
		swiperH:0
	},
	goHome: function(e) {
		wx.redirectTo({
			url: '/pages/wx/maker/home',
		})
	},
	videoControl() {
		var vtx = wx.createVideoContext('wechatmaker')
		if (this.data.isPlay) {
			vtx.pause();
		} else {
			vtx.play();
		}
		this.setData({
			isPlay: !this.data.isPlay
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
	changeSlider(e) {
		var index = e.detail.current;
		this.setData({
			currentIndex: index
		})
	},
	imgH: function(e) {
		var index = e.currentTarget.dataset.index
		if (this.data.swiperH != 0) {
			return false
		}
		console.log('获取swiper高度')
		var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
		var imgh = e.detail.height; //图片高度
		var imgw = e.detail.width;
		// imgw = winWid - 140
		var realImgWidth = winWid - (60 + 240) / 2
		var radio = imgw / realImgWidth
		var swiperH = (imgh / radio) + 20
		// var swiperH = (winWid - 140)/imgw *imgh + 80
		if (app.globalData.isIpx) {
			swiperH = swiperH + 20
		}
		if (app.globalData.isPad) {
			swiperH = swiperH - 200
		}
		if (app.globalData.isHuaWei) {
			swiperH = swiperH + 20
		}
		console.log('屏幕宽度:'+winWid)
		console.log('显示图片宽度为:'+realImgWidth,'显示图片高度为:'+swiperH)
		this.setData({
			imgHeight: swiperH + 'px', //设置高度
			isLoad: true,
			swiperH:swiperH
		})
		wx.hideLoading()
	},
	goMakerDetail(e) {
		var index = e.currentTarget.dataset.index
		
		wx.navigateTo({
			url: '/pages/wx/maker/detail?index='+index
		})
		return false
		var item = this.data.posterList.find((val, key) => {
			return key == index
		});
		item.padPosterStyle = this.data.padPosterStyle
		item.phoneStyle = this.data.phoneStyle
		item.posterStyle = this.data.posterStyle
		wx.setStorageSync('item', item)
		if (wx.getStorageSync('item')) {
			wx.navigateTo({
				url: '/pages/wx/maker/detail'
			})
		}else{
			wx.navigateTo({
				url: '/pages/wx/maker/detail?index='+index
			})
		}

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
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
				wx.setStorageSync('imgList', res.data)
				that.setData({
					posterList: list,
					padPosterStyle: res.data.padPosterStyle,
					phoneStyle: res.data.phoneStyle,
					posterStyle: res.data.posterStyle
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		this.setData({
			autoplay:true
		})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.setData({
			autoplay:true
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {
		this.setData({
			autoplay:false
		})
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
		this.setData({
			autoplay:false
		})
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
