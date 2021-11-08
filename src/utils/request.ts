/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import { getToken } from '.';

// axios.defaults.baseURL = 'http://1.116.75.166:3000';
axios.defaults.baseURL = 'http://localhost:3000';

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      break;
    // 404请求不存在
    case 404:
      break;
    default:
  }
};

// 创建axios实例
const request = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
request.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
request.interceptors.request.use(
  (config: any) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = getToken();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.token = token;
    }
    return config;
  },
  (error) => console.error(error),
);

// 响应拦截器
request.interceptors.response.use(
  // 请求成功
  (res) => {
    return [200, 201].includes(res.status) ? Promise.resolve(res.data) : Promise.reject(res);
  },
  // 请求失败
  // eslint-disable-next-line consistent-return
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在200, 201的范围
      errorHandle(response.status);
      return Promise.reject(response);
    }
    if (!window.navigator.onLine) {
      console.log('无连接');
    } else {
      return Promise.reject(error);
    }
  },
);

export default request;
