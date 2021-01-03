// 发送ajax请求
// 封装功能函数
import config from './config.js'
export default (url,data={},method='GET') => {
  return new Promise((resolve,reject) => {
    //new Promise初始化promise实例的状态为pending
    wx.request({
      url: config.mobilehost+url,
      data,
      method,
      success: (res) => {
        console.log('请求成功', res);
        resolve(res.data);
      },
      fail: (err) => {
        console.log('请求失败', err)
        reject(err);
      }
    })
  })
}























