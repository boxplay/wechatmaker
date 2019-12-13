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
		tips: '微信公众号',
		tipsAction:'开通',
		nickname: '',
		phone: '',
		wechat_id: '',
		why_description: '',
		product_id: 0,
		product_has: 'yes',
		challenge: '',
		emoji_type: '',
		emoji_admire: '',
		dataList: [{
			product_name: '',
			description: '',
			fans_count:'',
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
		buttonDisable:false
	},
	oHome: function(e) {
		wx.redirectTo({
			url: 'home',
		})
	},
	//提交表单
	formSubmit(e) {
		var  that = this
		this.setData({
			buttonDisable:true
		})
		var formData = e.detail.value
		formData.product_id = this.data.product_id
		formData.product_has = this.data.product_has
		formData.desc = JSON.stringify(this.data.dataList)
		formData.emoji_admire = this.data.emoji_admire
		formData.emoji_type = this.data.emoji_type
		formData.challenge = this.data.challenge
		app.globalData.nickName = formData.nickname
		var errorTips ='';
		if(!formData.why_description){
			errorTips = '为什么参加这次自己自荐计划'
		}
		if(!formData.description){
			errorTips = '描述你的ideal'
		}
		if(!formData.challenge){
			errorTips = '参不参加神秘挑战呢'
		}
		if(!formData.why_description){
			errorTips = '为什么参加这次自己按计划'
		}
		if(formData.product_has == 1){
			var dataList = this.data.dataList
			for(let i =0;i<dataList.length;i++){
				if(dataList[i].product_name || dataList[i].fans_count || dataList[i].description){
					errorTips = '请完善信息'
					break;
				}
			}
			if(formData.product_id == 4){
				if(formData.emoji_admire === '' || formData.emoji_type === ''){
					errorTips = '请完善信息'
				}
			}
		}
		if(!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$$/.test(formData.phone))){
			errorTips = '请正确填写手机号码'
		}
		if(!formData.nickname || !formData.wechat_id){
			errorTips = '请完善信息'
		}
		if(errorTips !== '' || errorTips){
			errorTips = '请填完后提交'
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
				
				console.log(res.data)
				if(res.data.status == 1){
					wx.showToast({
					  title: '自荐成功',
					  icon: 'success',
					  duration: 2000
					})
					wx.redirectTo({
						url:'poster'
					})
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
		console.log(index)
		var dataList = this.data.dataList
		dataList[index].fans_count = fansCount
		var fansList = this.data.fansCount
		fansList[index] = fansCount
		this.setData({
			dataList: dataList,
			fansCount: fansList
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
		var data;
		switch (type) {
			case 'challenge':
				data = {
					challenge: id
				}
				break;
			case 'emojitype':
				data = {
					emoji_type: id
				}
				break;
			case 'emojiadmire':
				data = {
					emoji_admire: id
				}
				break;
		}
		this.setData(data)
	},
	//移除公众号
	removeWxProduct(e) {
		var index = e.currentTarget.dataset.index;
		var list = this.data.dataList
		list.splice(index, 1)
		this.setData({
			dataList: list
		})
	},
	//增加公众号
	addWxProduct() {
		var list = this.data.dataList
		var index = list.length - 1;
		if (!list[index]['product_name'] || !list[index]['description'] || !list[index]['fans_count']) {
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
			})
			console.log(list);
			this.setData({
				dataList: list
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		var tips = new Array(),
			fansCountList = new Array(),tipsAction = new Array();
		tips[1] = '微信公众号'
		tips[2] = '微信小程序'
		tips[3] = '微信小游戏'
		tips[4] = '微信表情'
		tipsAction = ['开通','开发','开发','设计']
		fansCountList = [{
				id: 6,
				name: '5000以下'
			},
			{
				id: 7,
				name: '5000-10000'
			},
			{
				id: 8,
				name: '10000-100000'
			},
			{
				id: 9,
				name: '100000+'
			}
		]
		const eventChannel = that.getOpenerEventChannel()
		//保存是否从活动报名提醒完善信息过来，详情页可能是 跳转而不是二级页面，暂时不用 
		eventChannel.on('productTypeFunc', function(data) {
			console.log(data)
			var index = data.product_id
			if (index > 1) {
				that.setData({
					fansCountList: fansCountList
				})
			}
			that.setData({
				product_id: data.product_id,
				product_has: data.product_has,
				tips: tips[index],
				tipsAction:tipsAction[index + 1]
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
					console.log(that.data.scrollHeight)
				}
			},
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
