import request from "@/utils/request";
export const getSearchSuggestion = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};
//  获取搜索结果
export function getSearch(params) {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params,
  });
}

/**
 * 收藏文章
 */
export const addCollect = (target) => {
  return request({
    method: "POST",
    url: "/v1_0/article/collections",
    data: {
      target,
    },
  });
};

/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/collections/${target}`,
  });
};
