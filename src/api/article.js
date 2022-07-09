// 获取文章列表
import request from "@/utils/request";
export const fexchAr = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};
