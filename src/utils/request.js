// 配置axios实例
import axios from "axios";

// 创建一个axios实例
const request = axios.create({
  baseURL: "http://42.192.129.12:8000/",
});
export default request;
