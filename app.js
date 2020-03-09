const utils = require("/utils/util.js")
wx.Utils = utils;
import T from './utils/i18n.js';

wx.T = T;

//app.js
App({
	onLaunch: function() {
		console.log('loaded')
		const updateManager = wx.getUpdateManager()

		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate)
		})

		updateManager.onUpdateReady(function() {
			wx.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				}
			})
		})

		updateManager.onUpdateFailed(function() {
			// 新版本下载失败
		})
		var posterList = [
			"https://makercdn.someet.cc/wxapp/makers/wechat/1.jpg",
			"https://makercdn.someet.cc/wxapp/makers/wechat/2.jpg",
			"https://makercdn.someet.cc/wxapp/makers/wxapp/1.jpg",
			"https://makercdn.someet.cc/wxapp/makers/wxapp/2.jpg",
			"https://makercdn.someet.cc/wxapp/makers/wxemoji/1.jpg",
			"https://makercdn.someet.cc/wxapp/makers/wxemoji/2.jpg",
			"https://makercdn.someet.cc/wxapp/makers/wxgame/1.jpg",
			"https://makercdn.someet.cc/wxapp/makers/wxgame/2.jpg",
			'https://makercdn.someet.cc/wxapp/makers/poster/10/poster.png!poster_750',
			'https://makercdn.someet.cc/wxapp/makers/poster/19/poster.png!poster_750',
			'https://makercdn.someet.cc/wxapp/makers/poster/7/poster.png!poster_750',
			'https://makercdn.someet.cc/wxapp/makers/poster/17/poster.png!poster_750',
			'https://makercdn.someet.cc/wxapp/makers/poster/20/poster.png!poster_750',
		];
		var preload = new Promise(function(resolve, reject) {
			console.log('start new Promise...');
			return posterList.map(row => {
				wx.getImageInfo({
					src: row,
					success: resolve('加载完成'),
					fail: reject('加载失败')
				})
			})
		})
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		wx.getSystemInfo({
			success: function(res) {
				wx.T.registerLanguage(res.language);
			}
		})

		var _this = this
		wx.getSystemInfo({
			success: function(res) {
				console.log(res.windowHeight)
				console.log(res.windowWidth)
				if (res.windowHeight >= '724') {
					_this.globalData.isIpx = true;
				} else if (res.windowHeight < '640') {
					_this.globalData.isSmall = true;
				}
				if (res.windowHeight / res.windowWidth >= 1.8 && res.windowHeight / res.windowWidth < 1.9) {
					_this.globalData.isIpx = false;
					_this.globalData.isHuaWei = true;
				}
				if (res.windowHeight / res.windowWidth >= 1.25 && res.windowHeight / res.windowWidth < 1.30) {
					_this.globalData.isPad = true;
					_this.globalData.isIpx = false;
				}
				_this.globalData.language = res.language
			}
		})

		// 登录
		// wx.login({
		// 	success: res => {
		// 		// 发送 res.code 到后台换取 openId, sessionKey, unionId
		// 	}
		// })
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})
		preload.then(function(r) {
			console.log('已加载')
		}).catch(function(reason) {
			console.log('加载失败')
		});
	},
	globalData: {
		userInfo: null,
		isIpx: false,
		isSmall: false,
		isPad: false,
		isHuaWei: false,
		language: '',
		avatarUrlTempPath: '',
		nickName: '',
		shareBack1: 'https://img.someet.cc/phpXa5xyY',
		realPath: 'https://makercdn.someet.cc/wxapp/realPath.jpg',
		shareBack1W: 0,
		shareBack1H: 0,
		realPathW: 0,
		realPathH: 0,
		shareBackX: '',
	},
	onShow(options) {
		wx.getSystemInfo({
			success: function(res) {
				wx.T.registerLanguage(res.language);
			}
		})
	}
})
