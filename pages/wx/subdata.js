// pages/index/home.js
const app = getApp()

Page({
	data: {
		zjTextShow:[true],
		newsUrls: [],
		title: 'Wechat Maker',
		isIpx: app.globalData.isIpx ? true : false,
		home: wx.T.locales["home"],
		develop: wx.T.locales["develop"],
		scrollHeight: '88rpx',
		tips: '微信公众号',
		tipsAction:'开通',
		nickname: '',
		phone: '',
		wechat_id: '',
		why_description: '',
		product_id: 0,
		product_has: 'yes',
		challenge: '',
		dataList: [{
			product_name: '',
			description: '',
			fans_count:'',
			emoji_type:'',
			game_lighter:'',
		}],
		fansCount:[],
		fansCountList: [{
				id: 1,
				name: '100以下'
			},
			{
				id: 2,
				name: '100-1000'
			},
			{
				id: 3,
				name: '1001-10000'
			},
			{
				id: 4,
				name: '10001-100000'
			},
			{
				id: 5,
				name: '100000+'
			}
		],
		gameLighter:[],
		gameLighterList: [{
				id: 10,
				name: '玩法'
			},
			{
				id: 11,
				name: '美术'
			},
			{
				id: 12,
				name: '剧情'
			},
			{
				id: 13,
				name: '音乐'
			}
		],
		buttonDisable:false
	},
	oHome: function(e) {
		wx.redirectTo({
			url: 'home',
		})
	},
	//提交表单
	formSubmit() {
		console.log('开始提交')
		var  that = this
		this.setData({
			buttonDisable:true
		})
		var formData = new Object();
		formData.nickname = this.data.nickname
		formData.wechat_id = this.data.wechat_id
		formData.phone = this.data.phone
		formData.why_description = this.data.why_description
		formData.product_id = this.data.product_id
		formData.product_has = this.data.product_has
		formData.desc = JSON.stringify(this.data.dataList)
		formData.challenge = this.data.challenge
		app.globalData.nickName = formData.nickname
		var errorTips ='';
		if(!formData.challenge){
			errorTips = '请勾选是否参加神秘挑战'
		}
		if(!formData.why_description){
			errorTips = '为什么参加这次自荐计划'
		}
		if(formData.why_description.length <10){
			errorTips = '文字描述最少填写10个字'
		}
		var dataList = this.data.dataList
		if(formData.product_has == 1){
			for(let i =0;i<dataList.length;i++){
				
				if(formData.product_id == 4){
					if(!dataList[i].product_name || !dataList[i].emoji_type || !dataList[i].description){
						errorTips = '请填完后提交'
						break;
					}
				}else if(formData.product_id == 1 || formData.product_id == 3){
					if(!dataList[i].product_name || !dataList[i].fans_count || !dataList[i].description || !dataList[i].game_lighter){
						errorTips = '请填完后提交'
						break;
					}
				}else{
					if(!dataList[i].product_name || !dataList[i].fans_count || !dataList[i].description){
						errorTips = '请填完后提交'
						break;
					}
				}
				if(dataList[i].description && dataList[i].description.length <10){
					errorTips = '文字描述最少填写10个字'
				}
			}
		}else{
			for(let i =0;i<dataList.length;i++){
				dataList[i].product_name = '无'
				if(!dataList[i].description){
					errorTips = '请填完后提交'
					break;
				}
			}
		}
		if(!(/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(formData.wechat_id)) && !(/^1[3|4|5|6|7|8|9][0-9]\d{8}$$/.test(formData.wechat_id))){
			errorTips='微信ID格式不正确'
		}
		if(!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$$/.test(formData.phone))){
			errorTips = '请正确填写手机号码'
		}
		if(!formData.nickname || !formData.wechat_id){
			errorTips = '请填完后提交'
		}
		if(errorTips !== '' || errorTips){
//			if(errorTips != '请正确填写手机号码' && errorTips != '微信ID只允许输入数字和字母') errorTips = '请填完后提交'
			wx.showToast({
			  title: errorTips,
			  icon:'none',
			  duration: 2000
			})
			this.setData({
				buttonDisable:false
			})
			return false
		}
		
		wx.showLoading({
			title: '正在提交',
		})
		var data = formData
		wx.request({
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			url: 'https://someetapi.someet.cc/save.php',
			// url:'http://127.0.0.1/index.php',
			success: (res) => {
				wx.hideLoading()
				
				if(res.data.status == 1){
					wx.showToast({
					  title: '自荐成功,请稍后',
					  icon: 'none',
					  duration: 2000
					})
					setTimeout(function(){
						wx.redirectTo({
						 	url:'poster?p='+that.data.product_has+'&id='+formData.product_id+'&name='+that.data.dataList[0].product_name
						 })
					},500)
					
				}else{
					wx.showToast({
					  title: '信息存储失败',
					  icon: 'success',
					  duration: 2000
					})
					that.setData({
						buttonDisable:false
					})
				}
			},
			fail: (err) => {
				console.log(err)
			}
		})
	},
	checkRule(e){
		var str = e.detail.value
		var type =e.currentTarget.dataset.type
		if(type == 'wechat_id'){
			if(!(/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(str)) && !(/^1[3|4|5|6|7|8|9][0-9]\d{8}$$/.test(str))){
				wx.showToast({
				  title: '微信ID格式错误',
				  icon: 'none',
				  duration: 1500
				})
			}
		}else if(type == 'phone'){
			if(!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$$/.test(str))){
				wx.showToast({
					title:'请正确填写手机号码',
					icon:'none',
					duration:1500
				})
			}
			
		}
	},
	Textblur(e){
		var str = e.detail.value
		if(str.length <10){
			wx.showToast({
			  title: '至少填写10个字',
			  icon: 'none',
			  duration: 1500
			})
		}
	},
	getShareBack(){
		var that = this
		var img = 'https://makercdn.someet.cc/wxapp/shareBack1.jpg'
		if(that.data.isIpx){
			img = 'https://makercdn.someet.cc/wxapp/shareBackX.jpg'
		}
		var realPath = 'https://makercdn.someet.cc/wxapp/realPath.jpg'
	    wx.getImageInfo({
			src: img, //下载微信头像获得临时地址
			success: res => {
				//将头像缓存在全局变量里
				app.globalData.shareBack1 = res.path;
				app.globalData.shareBack1W = res.width;
				app.globalData.shareBack1H = res.height;
				wx.getImageInfo({
					src: realPath, //下载微信头像获得临时地址
					success: res => {
						//将头像缓存在全局变量里
						app.globalData.realPath = res.path;
						app.globalData.realPathW = res.width;
						app.globalData.realPathH = res.height;
					},
					fail: res => {
						//失败回调
						wx.showToast({
						  title: '获取图片2信息失败',
						})
					}
				});
			},
			fail: res => {
				//失败回调
				wx.showToast({
				  title: '获取图片2信息失败',
				})
			}
		});
	},
	changeTextAreaInput(e){
		var res = e.detail.value
		var type =e.currentTarget.dataset.type
		switch (type){
			case 'why_description':
				this.setData({
					why_description:res
				})
			break;
			case 'nickname':
				this.setData({
					nickname:res
				})
			break;
			case 'wechat_id':
				this.setData({
					wechat_id:res
				})
			break;
			case 'phone':
				this.setData({
					phone:res
				})
			break;
		}
	},
	changeTipsTextShow(e){
		var index = e.currentTarget.dataset.index
		var showOrHidden = this.data.zjTextShow
		showOrHidden[index] = false
		this.setData({
			zjTextShow:showOrHidden
		})
	},
	//
	descriptionChange(res) {
		var index = res.currentTarget.dataset.index
		var dataList = this.data.dataList
		dataList[index].description = res.detail.value
		this.setData({
			dataList: dataList
		})
	},
	wnameChange(res) {
		var index = res.currentTarget.dataset.index
		var dataList = this.data.dataList
		dataList[index].product_name = res.detail.value
		this.setData({
			dataList: dataList
		})
	},
	//粉丝数量
	changeFansCount(e) {
		var fansCount = e.currentTarget.dataset.id
		var index = e.currentTarget.dataset.index
		var dataList = this.data.dataList
		dataList[index].fans_count = fansCount
		var fansList = this.data.fansCount
		fansList[index] = fansCount
		this.setData({
			dataList: dataList,
			fansCount: fansList
		})
	},
	//粉丝数量
	changegameLighter(e) {
		var fansCount = e.currentTarget.dataset.id
		var index = e.currentTarget.dataset.index
		var dataList = this.data.dataList
		dataList[index].game_lighter = fansCount
		var fansList = this.data.gameLighter
		fansList[index] = fansCount
		this.setData({
			dataList: dataList,
			gameLighter: fansList
		})
	},
	goIndex: function(e) {
		wx.redirectTo({
			url: 'index',
		})
	},
	//是否愿意参加神秘挑战
	clickFunc(e) {
		var id = e.currentTarget.dataset.id;
		var type = e.currentTarget.dataset.ctype;
		var index = e.currentTarget.dataset.index;
		var data;
		switch (type) {
			case 'challenge':
				data = {
					challenge: id
				}
				this.setData(data)
				break;
			case 'emojitype':
				var dataList = this.data.dataList
				dataList[index].emoji_type = id
				this.setData({
					dataList: dataList,
				})
		}
	},
	//移除公众号
	removeWxProduct(e) {
		var index = e.currentTarget.dataset.index;
		var zjTextShow = this.data.zjTextShow
		var list = this.data.dataList
		zjTextShow.splice(index,1);
		list.splice(index, 1)
		this.setData({
			dataList: list,
			zjTextShow:zjTextShow
		})
	},
	//增加公众号
	addWxProduct() {
		var list = this.data.dataList
		var zjTextShow = this.data.zjTextShow
		var index = list.length - 1;
		if (!list[index]['product_name'] || !list[index]['description']) {
			wx.showToast({
				title: '请完整填写后添加',
				icon: 'none',
				duration: 2000
			})
		} else {
			list.push({
				product_name: '',
				description: '',
				fans_count: '',
				emoji_type:'',
				game_lighter:''
			})
			zjTextShow.push(true)
			this.setData({
				dataList: list,
				zjTextShow:zjTextShow
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		var tips = new Array(),
			fansCountList = new Array(),tipsAction = new Array(),gameLighterList = new Array();
		tips[1] = '微信公众号'
		tips[2] = '微信小程序'
		tips[3] = '微信小游戏'
		tips[4] = '微信表情'
		tipsAction = ['开通','开发','开发','设计']
		fansCountList = [{
				id: 6,
				name: '1000以下'
			},
			{
				id: 7,
				name: '1001-10000'
			},
			{
				id: 8,
				name: '10001-100000'
			},
			{
				id: 9,
				name: '100000+'
			}
		]
		gameLighterList = [{
				id: 14,
				name: '互动创意'
			},
			{
				id: 15,
				name: '视频创意'
			},
			{
				id: 16,
				name: '图片创意'
			},
			{
				id: 17,
				name: '文字创意'
			}
		]
		const eventChannel = that.getOpenerEventChannel()
		//保存是否从活动报名提醒完善信息过来，详情页可能是 跳转而不是二级页面，暂时不用 
		eventChannel.on('productTypeFunc', function(data) {
			var index = Number(data.product_id), tindex = Number(data.product_id)
			if (index > 1) {
				that.setData({
					fansCountList: fansCountList
				})
			}
			if(index == 1){
				that.setData({
					gameLighterList:gameLighterList
				})
			}
			tindex -=1
			that.setData({
				product_id: data.product_id,
				product_has: data.product_has,
				tips: tips[index],
				tipsAction:tipsAction[tindex]
			})
		});
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
		this.getShareBack()
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
