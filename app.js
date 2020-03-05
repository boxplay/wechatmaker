const utils = require("/utils/util.js")
wx.Utils = utils;
import T from './utils/i18n.js';

wx.T = T;

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      success: function (res) {
        wx.T.registerLanguage(res.language);
      }
    })

    var _this = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        console.log(res.windowWidth)
        if (res.windowHeight >= '724') {
          _this.globalData.isIpx = true;
        }else if(res.windowHeight < '640'){
			_this.globalData.isSmall = true;
		}
		if(res.windowHeight/res.windowWidth >=1.8 && res.windowHeight/res.windowWidth < 1.9){
			_this.globalData.isIpx = false;
			_this.globalData.isHuaWei = true;
		}
		if(res.windowHeight/res.windowWidth >=1.25 && res.windowHeight/res.windowWidth < 1.30){
			_this.globalData.isPad = true;
			_this.globalData.isIpx = false;
		}
        _this.globalData.language = res.language
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
  },
  globalData: {
    userInfo: null,
    isIpx: false,
	isSmall:false,
	isPad:false,
	isHuaWei:false,
    language:'',
		avatarUrlTempPath:'',
		nickName:'',
		shareBack1:'https://img.someet.cc/phpXa5xyY',
		realPath:'https://makercdn.someet.cc/wxapp/realPath.jpg',
		shareBack1W:0,
		shareBack1H:0,
		realPathW:0,
		realPathH:0,
		shareBackX:'',
  },
  onShow(options) {
    wx.getSystemInfo({
      success: function (res) {
        wx.T.registerLanguage(res.language);
      }
    })
    
  }
})