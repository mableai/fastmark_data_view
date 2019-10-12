import axios from 'axios'
import { Message, Modal } from 'iview'
import { getToken } from '@/utils/auth'
//import store from '../store'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url, 生产模式(dev)的时候,拿的config/dev.env.js的BASE_API
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 1000 * 60 * 5, // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    let time = new Date().getTime();
    config.headers['timeStamp'] = time;
    if (getToken()) {
      //store.getters.token
      let token;
      let t = time.toString();
      token = Base64.encode(t.slice(0, 6) + getToken() + t.slice(6, 13));
      // token = Base64.encode(t.slice(0,6) + "7DBB4D3B0F58A015FC71808B078A8579" + t.slice(6,13));
      config.headers['requestId'] = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.head.code === '0') {
      return res;
    } else if (res.head.code === '22') {
      // Token 过期了;
      Message.error("登录信息过期,请重新登陆");
      // setTimeout(() => {
      //   let base = process.env.BASE_API;
      //   axios.get(`${base}v1/fastmarkedit/activity/getLogoutInfo`).then((response) => {
      //     if (response.data.head.code === '0') {
      //       window.location.href = response.data.body.expireTokenUrl
      //     }
      //   }).catch((error) => {
      //     console.log('error=====', error);
      //   });
      // }, 1000)
    } else {
      Message.error(res.head.message);
    }
  },
  error => {
    // for debug
    console.log('调试打印', error)
    Message.error('服务器开小差,请稍后再试!');
    return Promise.reject(error)
  }
)

export default service
