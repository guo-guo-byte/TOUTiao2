import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const tokenKey = "tputiao_token";
import { getLocal, setLocal } from "@/utils/storage";
export default new Vuex.Store({
  // 用于全局状态数据
  state: {
    user: getLocal(tokenKey), //存储token数据的
  },

  getters: {},

  mutations: {
    setUser(state, user) {
      // 接受了参数
      console.log(user);
      state.user = user;
      // 本地存储 直接传递数据到storage检测
      setLocal(tokenKey, user);
    },
  },
  // 异步状态修改
  actions: {},
  modules: {},
});
