// pages/personal/personal.js
import request from "../../utils/request.js"

let startY = 0; //手指起始坐标
let moveY = 0; //手指移动坐标
let moveDistance = 0; //手指移动距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coveTransition: '',
    userInfo: {},
    recentPlayList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)

      })
      //获取用户播放记录的功能函数
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
  },
  //获取用户播放记录的函数
  async getUserRecentPlayList(userId) {
    let rencentPLayListData= await request('/user/record', {
      uid: userId,
      type: 0
    });
    let index = 0;
    let recentPlayList = rencentPLayListData.allData.splice(0, 10).map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      recentPlayList
    })
  },
  // 滑动屏幕效果
  handleTouchStart(event) {
    //获取手指起始坐标
    this.setData({
      coveTransition: ''
    })
    startY = event.touches[0].clientY

  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    console.log(moveDistance);
    if (moveDistance <= 0) {
      return
    }
    if (moveDistance >= 80) {
      moveDistance = 80
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },




  // 跳转到login页面
  toLogin() {
    wx.navigateTo({
      url: '/pages/logs/logs',
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