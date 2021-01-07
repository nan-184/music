// 发送ajax请求
// 封装功能函数
import config from './config.js'
export default (url,data={},method='GET') => {
  return new Promise((resolve,reject) => {
    //new Promise初始化promise实例的状态为pending
    wx.request({
      url: config.host+url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item =>item.indexOf('MUSIC_U') !== -1):''
      },
      success: (res) => {
        // console.log('请求成功', res);
        if(data.isLogin){
          wx.setStorage({
            key:'cookies',
            data: res.cookies
          })
        }
        resolve(res.data);
      },
      fail: (err) => {
        console.log('请求失败', err)
        reject(err);
      }
    })
  })
}























