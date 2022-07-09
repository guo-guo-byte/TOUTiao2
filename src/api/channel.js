import request from "@/utils/request";
// 获取频道数据的接口
export const getUser = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

// 获取所有频道数据
export const getAllChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/channels",
  });
};
