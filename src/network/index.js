import axios from 'axios';
import { message } from 'antd'

const service = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    // withCredentials: true
})

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      // Do something with request error
      console.error("error:", error); // for debug
      Promise.reject(error);
    }
  );


// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
    (res) => {
        // Some example codes here:
        // code == 0: success
        if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
                return res;
            } else {
                message.error(data.message)
                if (window.localStorage.userInfo) {
                    // setTimeout(() => window.location.reload(), 500)
                    window.localStorage.userInfo = "";
                    // return Promise.reject(new Error(res.data.message || "Error"));
                }
                // return Promise.reject(new Error(res.data.message || "Error"));
            }
        } else {
            message.error("网络错误!");
            return Promise.reject(new Error(res.data.message || "Error"));
        }
    },
    (error) => Promise.reject(error)
);

export default service