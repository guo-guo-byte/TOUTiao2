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

// 已经登陆了的接口
export const fetchAdd = (channel) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    // 那边传的是一个对象
    data: {
      channels: [channel],
    },
  });
};
// 删除用户频道
export const deleteUser = (channel) => {
  return request({
    method: "DELETE",
    url: "v1_0/user/channels/${channelId}",
    // 那边传的是一个对象
    data: {
      channels: [channel],
    },
  });
};
