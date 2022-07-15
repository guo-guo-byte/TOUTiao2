// 获取文章列表
import request from "@/utils/request";
export const fexchAr = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};
// 获取频道的文章列表
export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: "/v1_0/articles/" + articleId,
  });
};
