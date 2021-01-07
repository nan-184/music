// pages/video/video.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VideoGroupList:[],
    // 导航栏渲染
    NavId: '',
    // 视频列表数据
    VideoList:[],
    //视频播放id
    videoId:'',
    //视频播放的时长
    videoUpdateTime:[],
    //
    isTrigger:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData()
  },
  // 获取导航栏数据
  async getVideoGroupListData(){
  let VideoGroupListData = await request('/video/group/list');
  this.setData({
    VideoGroupList: VideoGroupListData.data.slice(0, 14),
    NavId: VideoGroupListData.data[0].id
  })
    this.getVideoList(this.data.NavId)
  },
async getVideoList(NavId){
  let videoListData = await request('/video/group',{id:NavId})
  //关闭消息提示
  wx.hideLoading()
  let index = 0;
  let VideoList = videoListData.datas.map(item => {
    item.id = index++;
    return item;
  })  
  this.setData({
    VideoList,
    isTrigger: false,
  })

  
},

  Navclick(event){
    let NavId = event.currentTarget.id;
    this.setData({
      NavId: NavId*1,
      VideoList: [],
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(this.data.NavId)
  },
  //当点击下一个视频时关闭上一个视频
  handlePlay(event){
    let vid = event.currentTarget.id;
    //this.vid !== vid && this.videoContext && this.videoContext.stop();
    // this.vid = vid;
    this.setData({
      videoId:vid
    });
    this.videoContext = wx.createVideoContext(vid);
    // 返回到上次播放的时间
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }
    this.videoContext.play()
  },
  //视频播放时间的记录
  handleTimeUpdate(event){
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime};
    let {videoUpdateTime} = this.data;
    
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem){
      videoItem.currentTime = event.detail.currentTime;
    }else{
      videoUpdateTime.push(videoTimeObj)
    }
    this.setData({
      videoUpdateTime
    })
  },
  // 播放结束时调用的回调
  handleEnded(event){
    console.log('播放结束')
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id),1)
    this.setData({
      videoUpdateTime
    })
  },
  //自定义下拉刷新
  handleFresh(){
    console.log('shuax');
    this.getVideoList(this.data.NavId)
  },
  //自定义底部刷新
  // handleTolower(){
  //   console.log('到底了')
  //   //模拟数据
  //   let newVideoList = [  ];
  //   let videoList = this.data.videoList;
  //   videoList.push(...newVideoList);
  //   this.setData({
  //     videoList
  //   })
  // },



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
  onShareAppMessage: function ({from}) {
    console.log(from)
    if(from === 'menu'){
      return{title:'来自menu的转发',
      page:'/page/video/video',
      imageUrl:'/static/images/nvsheng.jpg'
      }
    }
  }
})