// 使用在Login组件里面
// 引入request请求方法
import request from "@/utils/request";
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

// 获取验证码的接口
export const getSnsCode = (mobile) => {
  return request({
    method: "GET",
    // ${mobile}后面是动态的 不固定 所以用``来写
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
