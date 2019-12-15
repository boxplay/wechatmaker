// pages/index/home.js
const app = getApp()

Page({
	data: {
		newsUrls: [],
		title: 'Wechat Maker',
		isIpx: app.globalData.isIpx ? true : false,
		home: wx.T.locales["home"],
		develop: wx.T.locales["develop"],
		scrollHeight: '88rpx',
		userInfo: {
			'nickName': ''
		},
		w: 750,
		h: 1334,
		imgw:0,
		imgh:0,
		posterTempPath: '',
		dpr: 2,
		product_id:0,
		product_name:'无',
		product_has:1,
		product_type:1,
		backPath:app.globalData.shareBack1,
		realPath:app.globalData.realPath
	},
	checkImage() {
		var that = this;
		var userInfo = app.globalData.userInfo
		var shareBack = this.data.backPath
		if (!userInfo) {
			userInfo = wx.getStorageSync('userInfo')	
		}
		if(!userInfo){
			wx.showToast({
			  title: '获取信息失败',
			})
			return false
		}
		this.drawImage(app.globalData.shareBack1W,app.globalData.shareBack1H,app.globalData.shareBack1);
//		wx.getImageInfo({
//			src: shareBack, //下载微信头像获得临时地址
//			success: res => {
//				//将头像缓存在全局变量里
//				app.globalData.shareBackTempPath = res.path;
//				that.setData({
//					imgw:res.width,
//					imgh:res.height
//				})
//				that.drawImage(res.width,res.height,res.path);
//			},
//			fail: res => {
//				//失败回调
//				wx.showToast({
//				  title: '获取图片2信息失败',
//				})
//			}
//		});
	},
	drawImageForRealPath(w,h,path){
		var that = this;
		var obj = {
			shareBack: { //背景图的位置和大小
				width: 750,
				height: 1334,
				x: 0,
				y: 0
			},
			textPos:{
				leftWidth:140,
				height:790,
				nameHeight:720,
				heightY:910
			}
		}
		const ctx = wx.createCanvasContext('realShareBox')
		var t = "因你的勇气和创造力，你提交的"+this.data.product_type+this.data.product_name+"已被收录。"
		var str ={
			x:t,
			y:"你就是我们要找的微信创客！"
		}
		if(this.data.product_has == 0){
			t = "快用"+this.data.product_type+"实现你的想法吧！"
			var str ={
				x:"因你的勇气和创造力，我们看到了你成为「微信创客」的可能性。",
				y:t
			}
		}
		this.startDraw(path,w,h,obj,ctx,str)
		ctx.draw(true, setTimeout(function() {
			wx.canvasToTempFilePath({
				x: 0,
				y: 0,
				destWidth: 666,
				destHeight: 945,
				canvasId: 'realShareBox',
				success(res) {
					that.setData({
						posterTempPath: res.tempFilePath
					})
					wx.hideLoading()
				},
				fail(res) {
					console.log(11111)
				}
			})
		}, 400));
	},
	drawImage(w,h,path) {
		console.log('start')
		var that = this;
		var obj = {
			shareBack: { //背景图的位置和大小
				width: 750,
				height: 1334,
				x: 0,
				y: 0
			},
			textPos:{
				leftWidth:140,
				height:690,
				nameHeight:620,
				heightY:810
			}
		}
		if(this.data.isIpx){
			obj.textPos ={
				leftWidth:140,
				height:560,
				nameHeight:500,
				heightY:690
			}
		}
		const ctx = wx.createCanvasContext('shareBox')
		wx.showLoading({
		  title: '正在生成证书',
		})
		var t = "因你的勇气和创造力，你提交的"+this.data.product_type+this.data.product_name+"已被收录。"
		var str ={
			x:t,
			y:"你就是我们要找的微信创客！"
		}
		if(this.data.product_has == 0){
			t = "快用"+this.data.product_type+"实现你的想法吧！"
			var str ={
				x:"因你的勇气和创造力，我们看到了你成为「微信创客」的可能性。",
				y:t
			}
		}
		this.startDraw(path,w,h,obj,ctx,str)
		ctx.draw(true, setTimeout(function() {
			wx.canvasToTempFilePath({
				x: 0,
				y: 0,
				destWidth: w,
				destHeight: h,
				canvasId: 'shareBox',
				success(res) {
					console.log(res.tempFilePath)
					that.setData({
						backPath:res.tempFilePath
					})
					that.cutCanvas(w,h,obj)
				},
				fail(res) {
					console.log(11111)
				}
			})
		}, 300));
	},
	startDraw(path,w,h,obj,ctx,str){
		console.log(path)
		ctx.drawImage(path, obj.shareBack.x, obj.shareBack.y, obj.shareBack.width, obj.shareBack
			.height); // 推进去图片
		ctx.save(); // 先保存状态 已便于画完圆再用
		ctx.beginPath(); //开始绘制
		ctx.restore(); //恢复状态
		var name = app.globalData.nickName+" :"
		this.drawText(ctx, name, 140, obj.textPos.nameHeight,450)
		this.drawText(ctx, str.x, 140, obj.textPos.height,450);
		this.drawText(ctx, str.y, 140, obj.textPos.heightY,450);
	},
	//文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、6、文本的宽度
	drawText: function(ctx, str, leftWidth, initHeight,canvasWidth) {
		ctx.setFontSize(32);
		ctx.setFillStyle('black');
//		var lineWidth = 32;
		var chr = str.split(""); //这个方法是将一个字符串分割成字符串数组
		var temp = "";
		var row = [];
		var lastIndex = 0;
		for (var a = 0; a < chr.length-1; a++) {
			if (ctx.measureText(temp).width < canvasWidth) {
				temp += chr[a];
			} else {
				a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				row.push(temp);
				temp = "";
				lastIndex = a+1;
			}
		}
		temp = "";
		for (var a = lastIndex; a < chr.length; a++){
			temp += chr[a];	
		}
		row.push(temp);
		for (var b = 0;b<row.length;b++) {
			ctx.fillText(row[b],leftWidth,initHeight)
			initHeight += 60;
		}
	},
	//裁剪图片
	cutCanvas(w,h,obj){
		var that = this
		this.drawImageForRealPath(app.globalData.realPathW,app.globalData.realPathH,app.globalData.shareBack1);
//		wx.getImageInfo({
//			src: this.data.realPath, //下载微信头像获得临时地址
//			success: res => {
//				//将头像缓存在全局变量里
//				app.globalData.shareBackTempPath = res.path;
//				that.setData({
//					imgw:res.width,
//					imgh:res.height
//				})
//				that.drawImageForRealPath(res.width,res.height,res.path);
//			},
//			fail: res => {
//				//失败回调
//				wx.showToast({
//				  title: '获取图片2信息失败',
//				})
//			}
//		});
	},
	saveFile() {
		var that = this
		if (!wx.saveImageToPhotosAlbum) return wx.showModal({
			title: "提示",
			content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
		}), console.log("version low");
		wx.getSetting({
			success: function(res) {
				res.authSetting["scope.writePhotosAlbum"] ? (console.log("1-已经授权《保存图片》权限"), that.saveimgfn()) : wx.authorize({
					scope: "scope.writePhotosAlbum",
					success: function() {
						console.log("用户对相册-授权成功"), that.saveimgfn();
					},
					fail: function() {
						wx.showModal({
							title: "提示",
							content: "请您授权保存到系统相册",
							showCancel: !1,
							success: function(res) {
								res.confirm && wx.openSetting({
									success: function(res) {
										res.authSetting["scope.writePhotosAlbum"] ? setTimeout(function() {
											that.saveimgfn();
										}, 500) : wx.showModal({
											title: "提示",
											content: "您未授权，无法将海报保存到相册，你可以截屏得到海报，或者再次点击'保存海报'按钮并授权",
											showCancel: !1
										});
									}
								});
							}
						});
					}
				});
			}
		});
	},
	saveimgfn() {
		var filePath = this.data.posterTempPath;
		wx.saveImageToPhotosAlbum({
			filePath: filePath,
			success: function(res) {
				wx.showToast({
					title: "保存成功",
					icon: "success",
					duration: 1500
				});
			},
			fail: function() {
				wx.showToast({
					title: "保存失败",
					icon: "fail",
					duration: 1500
				});
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		console.log(options);
		var tips = new Array();
		tips[1] = '微信公众号'
		tips[2] = '微信小程序'
		tips[3] = '微信小游戏'
		tips[4] = '微信表情包'
		this.setData({
			product_id:options.id,
			product_name:options.name,
			product_has:options.p,
			product_type:tips[options.id]
		})
		wx.getSystemInfo({
			success: function(res) {
				// console.log(res.windowWidth);
				var win_w = res.windowWidth;
				var win_img_w = win_w * .533 + 40;
				var win_h = res.windowHeight
				if (app.globalData.isIpx) {
					that.setData({
						scrollHeight: Number(win_h * 2 - 156) + 'rpx'
					})
				}
			},
		})
		var userInfo = wx.getStorageSync('userInfo');
		this.setData({
			userInfo:userInfo
		})
		var backPath ='https://makercdn.someet.cc/wxapp/shareBack1.jpg';
		if(app.globalData.isIpx){
			var backPath ='https://makercdn.someet.cc/wxapp/shareBackX.jpg';//x的背景图
		}
		this.setData({
			backPath:backPath
		})
		that.checkImage()
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
