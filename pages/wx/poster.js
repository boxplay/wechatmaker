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
		product_type:1
	},
	checkImage() {
		var that = this;
		var userInfo = app.globalData.userInfo
		var shareBack = this.data.product_has === 1?'https://makercdn.someet.cc/wxapp/shareBack.jpg':'https://makercdn.someet.cc/wxapp/shareBack2.jpg'
		if (!userInfo) {
			userInfo = wx.getStorageSync('userInfo')	
		}
		if(!userInfo){
			wx.showToast({
			  title: '获取信息失败',
			})
			return false
		}
		wx.getImageInfo({
			src: shareBack, //下载微信头像获得临时地址
			success: res => {
				//将头像缓存在全局变量里
				app.globalData.shareBackTempPath = res.path;
				console.log(res)
				that.setData({
					imgw:res.width,
					imgh:res.height
				})
				that.drawImage(res.width,res.height);
			},
			fail: res => {
				//失败回调
				wx.showToast({
				  title: '获取图片2信息失败',
				})
			}
		});
	},
	drawImage(w,h) {
		var that = this;
		wx.showLoading({
		  title: '正在加载专属海报',
		})
		const ctx = wx.createCanvasContext('shareBox')
		var obj = {
			shareBack: { //背景图的位置和大小
				width: 750,
				height: 1334,
				x: 0,
				y: 0
			},
			// avatar: {
			// 	width: 80,
			// 	height: 80,
			// 	x: (this.data.w - 90) / 2,
			// 	y: 360
			// }
		}
		ctx.drawImage(app.globalData.shareBackTempPath, obj.shareBack.x, obj.shareBack.y, obj.shareBack.width, obj.shareBack
			.height); // 推进去图片

		ctx.save(); // 先保存状态 已便于画完圆再用
		ctx.beginPath(); //开始绘制
		// 先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
		// ctx.arc(obj.avatar.width / 2 + obj.avatar.x, obj.avatar.width / 2 + obj.avatar.y, obj.avatar.width / 2, 0, Math.PI *
		// 	2, false);
		// ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
		// ctx.drawImage(app.globalData.avatarUrlTempPath, obj.avatar.x, obj.avatar.y, obj.avatar.width, obj.avatar.heigth); // 推进去图片
		ctx.restore(); //恢复状态
		var name = this.data.userInfo.nickName+" :"
		console.log(this.data.userInfo)
		this.drawText(ctx, name, 100, 740,520)
		var str = "因为你的勇气和创造力，在”微信创客自荐计划“中，被认证为「微信创客」自荐作品:"+this.data.product_type+this.data.product_name+"已被收录";
		if(this.data.product_has == 0){
			str = "因为你的勇气和创造力，你在”微信创客自荐计划“中，我们看到了你成为「微信创客」的可能性。快用"+this.data.product_type+"实现你想法吧!";
		}
		this.drawText(ctx, str, 130, 800,480);
		ctx.draw(true, setTimeout(function() {
			wx.canvasToTempFilePath({
				x: 0,
				y: 0,
				destWidth: w,
				destHeight: h,
				canvasId: 'shareBox',
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
		}, 1000));
	},
	//文本换行 参数：1、canvas对象，2、文本 3、距离左侧的距离 4、距离顶部的距离 5、6、文本的宽度
	drawText: function(ctx, str, leftWidth, initHeight,canvasWidth) {
		ctx.font = 'normal 32px sans-serif';
		ctx.setFillStyle('black');
		var lineWidth = 18;
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
		tips[1] = '公众号'
		tips[2] = '小程序'
		tips[3] = '小游戏'
		tips[4] = '表情包'
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
