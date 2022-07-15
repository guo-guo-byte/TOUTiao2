// 配置axios实例
import axios from "axios";
import store from "@/store";
// 创建一个axios实例
const request = axios.create({
  baseURL: "http://42.192.129.12:8000/",
});

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // config ：本次请求的配置对象 也就是发送请求配置
    // config 里面有一个属性：headers
    //判断，当本地存储是否有user，与user底下是否有token
    // const token = store.state?.user?.token;
    const token = store.state.user && store.state.user.token;

    // user && user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 这里就是拦截错误的 如果是错误就不会走回调的try
    return Promise.reject(error);
  }
);
// request.interceptors.response.use();
// request.get("http://localhost:3000/name").then(() => {
//   console.log(res);
// });
// 响应拦截器
export default request;
