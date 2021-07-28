import axios from 'axios';
// axios 配置
axios.defaults.timeout = 1800000;

axios.defaults.baseURL="/dldsj";
global.urlhead = axios.defaults.baseURL;


// http request 拦截器
axios.interceptors.request.use(
  config => {
    //config.headers={'X-User-Token':'llR1emfd7qgL8btBY2DoVgB54KiImjMLrTJ1JgAf7rkcvafWjkNeCOwHiHyVyEMZLLWEq19FOds1BEmz'}
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  }
);

export default axios;
