import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 用于全局状态数据
  state: {
    count: 0,
    userTnto: {
      name: "小郭",
    },
  },

  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    // 第一个参数就是仓库的状态（state）
    getsta(state) {
      // 修改state状态
      state.count++;
    },
    changeName(state) {
      state.userTnto.name = "大郭";
    },
    // 第二个接收参数
    changeCount(state, num) {
      console.log(state);
      state.count += num;
    },
  },
  // 异步状态修改
  actions: {},
  modules: {},
});
