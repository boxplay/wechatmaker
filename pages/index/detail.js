// pages/index/detail.js
var WxParse = require('../../utils/wxParse/wxParse.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // title:'',
    // content:'',
    // topic_from:'',
    // topic_date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.title)
    // wx.setNavigationBarTitle({
    //   title:options.title
    // })
    var that = this;

    //details
    wx.request({
      url: 'https://makerforwx.someet.cc/v3/topic?id=' + options.id,
      data: {
        
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var topic = res.data.data;
        // console.log(topic)
        var content = topic.content;
        content: WxParse.wxParse('content', 'html', content, that, 5)
        that.setData({
          title:topic.title,
          topic_from:topic.from_type,
          topic_date:topic.created_at
        })
      }
    })
    // var content = content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
    //   .replace(/<section/g, '<div')
    //   .replace(/\/section>/g, '\div>');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})