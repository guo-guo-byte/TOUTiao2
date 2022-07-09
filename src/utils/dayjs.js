import Vue from "vue";
import dayjs from "dayjs";
// 默认英文改正中文版
import "dayjs/locale/zh-cn.js";
// 引入相对时间的包
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
// 当前时间
// console.log(dayjs().format("YYYY-MM-DD"));
// 多少年前
console.log(dayjs().to(dayjs("2021-01-01")));
Vue.filter("relativeTime", (value) => {
  console.log(value);
  return dayjs().to(dayjs("2021-01-01"));
});
