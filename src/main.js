import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// vuex配置
import store from "./store";
import "@/styles/index.less";
//注册Vant
import Vant from "vant";
// 引入Vant样式
import "vant/lib/index.less";
// 引入flexible REM 基准值（html 标签的字体大小）
import "amfe-flexible";
import "./utils/dayjs";
// // 测试接口
// import request from "@/utils/request";
// request.get("/v1_0/channels").then((res) => {
//   console.log(res.data.data.channels);
// });
Vue.use(Vant);

// 引用组件
import TouTiao from "@/components/TouTiao";
// 注册全局组件
Vue.component("TouTiao", TouTiao);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
