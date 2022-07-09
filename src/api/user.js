// import store from "@/store";
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
// 获取用户信息接口
export const fetchUser = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // 下面直接用请求拦截器了
    // headers: {
    //   // vuex里面的token  $store原型上有store 可以直接用token
    //   // 注意：该接口需要授权才能访问
    //   //token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state?.user?.token}`,
    // },
  });
};
