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
		realPath:app.globalData.realPath,
		isStart:false
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
		this.cutCanvas(app.globalData.shareBack1W,app.globalData.shareBack1H,app.globalData.shareBack1);
//		this.drawImage(app.globalData.shareBack1W,app.globalData.shareBack1H,app.globalData.shareBack1);
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
				width: 625,
				height: 888,
				x: 0,
				y: 0
			},
			textPos:{
				leftWidth:140,
				heightA:490,
				nameHeight:450,
				heightB:530,
				heightC:570,
				IpxLeftW:90,
				IpxWidth:460,
			}
		}
		const ctx = wx.createCanvasContext('realShareBox')
		var t = "因你的勇气和创造力，你提交的"+this.data.product_type
		var str ={
			a:t,
			b:"作品"+this.data.product_name+"已被收录。",
			c:'你就是我们要找的微信创客！'
		}
		if(this.data.product_has == 0){
			t = "快用"+this.data.product_type+"实现你的想法吧！"
			var str ={
				a:"因你的勇气和创造力，我们看到了你成为",
				b:'「微信创客」的可能性。',
				c:t,
				aRed:"「微信创客」"
			}
			obj.textPos = {
				leftWidth:140,
				heightA:490,
				nameHeight:450,
				heightB:530,
				heightC:570,
				IpxLeftW:90,
				IpxWidth:420
			}
		}
		this.startDraw(path,w,h,obj,ctx,str)
		ctx.draw(true, setTimeout(function() {
			wx.canvasToTempFilePath({
				x: 0,
				y: 0,
				destWidth: 625,
				destHeight: 888,
				canvasId: 'realShareBox',
				success(res) {
					that.setData({
						posterTempPath: res.tempFilePath
					})
					wx.hideLoading()
					that.setData({
							isStart:false
						})
				},
				fail(res) {
					console.log(11111)
				}
			})
		}, 600));
	},
	drawImage(w,h,path) {
		console.log('start')
		var that = this;
		var obj = {
			shareBack: { //背景图的位置和大小
				width: app.globalData.shareBack1W,
				height: app.globalData.isIpx?'1624':'1344',
				x: 0,
				y: 0
			},
			textPos:{
				leftWidth:140,
				heightA:650,
				nameHeight:600,
				heightB:690,
				heightC:730,
				IpxLeftW:140,
				IpxWidth:500
			}
		}
		if(this.data.isIpx){
			if(this.data.product_has == 0){
				obj.textPos ={
					leftWidth:140,
					heightA:650,
					nameHeight:600,
					heightB:690,
					heightC:730,
					IpxLeftW:140,
					IpxWidth:480
				}
			}else{
				obj.textPos ={
					leftWidth:140,
					heightA:650,
					nameHeight:600,
					heightB:690,
					heightC:730,
					IpxLeftW:140,
					IpxWidth:480
				}
			}
		}
		const ctx = wx.createCanvasContext('shareBox')
		wx.showLoading({
		  title: '正在生成证书',
		})
		var t = "因你的勇气和创造力，你提交的"+this.data.product_type
		var str ={
			a:t,
			b:"作品"+this.data.product_name+"已被收录。",
			c:"你就是我们要找的微信创客！"
		}
		if(this.data.product_has == 0){
			t = "快用"+this.data.product_type+"实现你的想法吧！"
			var str ={
				a:"因你的勇气和创造力，我们看到了你成为",
				b:'「微信创客」的可能性。',
				c:t
			}
		}
		this.startDraw(path,w,h,obj,ctx,str)
		ctx.draw(true, setTimeout(function() {
			wx.canvasToTempFilePath({
				x: 0,
				y: 0,
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
		}, 400));
	},
	startDraw(path,w,h,obj,ctx,str){
		ctx.drawImage(path, obj.shareBack.x, obj.shareBack.y, obj.shareBack.width, obj.shareBack
			.height); // 推进去图片
		ctx.save(); // 先保存状态 已便于画完圆再用
		ctx.beginPath(); //开始绘制
		ctx.restore(); //恢复状态
		var name = app.globalData.nickName+" :"
		this.drawText(ctx, name, obj.textPos.IpxLeftW, obj.textPos.nameHeight,obj.textPos.IpxWidth,'black')
		this.drawText(ctx, str.a, obj.textPos.IpxLeftW, obj.textPos.heightA,obj.textPos.IpxWidth,'black');
		this.drawText(ctx, str.b, obj.textPos.IpxLeftW, obj.textPos.heightB,obj.textPos.IpxWidth,'black');
		this.drawText(ctx, str.c, obj.textPos.IpxLeftW, obj.textPos.heightC,obj.textPos.IpxWidth,'black');
//		var redLeft = ctx.measureText(str.c).width + obj.textPos.IpxLeftW
//		this.drawText(ctx, str.aRed, redLeft, obj.textPos.heightC,obj.textPos.IpxWidth,'red');
	},
	//文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、6、文本的宽度
	drawText: function(ctx, str, leftWidth, initHeight,canvasWidth,color) {
		if(!str) return false;
		ctx.setFontSize(24);
		ctx.setFillStyle(color);
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
			if(app.globalData.isIpx && this.data.product_has == 0){
				initHeight += 35;
			}else{
				if(this.data.product_has == 0){
					initHeight += 40;
				}else{
					initHeight += 35;
				}
				
			}
		}
	},
	//裁剪图片
	cutCanvas(w,h,obj){
		if(this.data.isStart){
			return false
		}
		this.setData({
			isStart:true
		})
		var that = this
		this.drawImageForRealPath(app.globalData.realPathW,app.globalData.realPathH,app.globalData.realPath);
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
		var tips = new Array();
		tips[1] = '微信公众号'
		tips[2] = '微信小程序'
		tips[3] = '微信小游戏'
		tips[4] = '微信表情'
		this.setData({
			product_id:options.id,
			product_name:options.name,
			product_has:options.p,
			product_type:tips[options.id],
			userInfo:{
				nickName:app.globalData.nickName
			}
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
		var backPath ='https://makercdn.someet.cc/wxapp/shareBack1.jpg';
		if(app.globalData.isIpx){
			var backPath ='https://makercdn.someet.cc/wxapp/shareBackX.jpg';//x的背景图
		}
		this.setData({
			backPath:app.globalData.shareBack1?app.globalData.shareBack1:backPath
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
