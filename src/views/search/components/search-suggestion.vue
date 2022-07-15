<template>
  <div>
    <van-cell
      @click="hanClick(item)"
      icon="search"
      v-for="(item, index) in list"
      :key="index"
    >
      <!-- 3.上面写的事件 是输入内容出来后  点击搜索出来的内容 把内容传进去 -->
      <template #title>
        <!--2。用事件是因为我们点击搜索的内容前面用了标签 后面需要用点击事件 所以也要用事件 因为小面写的是HTML字符串 这边必须用v-html -->
        <div v-html="higu(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search.js";
import { debounce } from "lodash";
export default {
  name: "suggestion",
  data() {
    return {
      list: [],
    };
  },
  props: {
    searchText: String,
  },

  // 1.监听搜索内容的变化，发送请求获取搜索建议列表数据
  watch: {
    searchText: {
      immediate: true,
      // value是输入框的值
      // 3.防抖debounce（fun(){},500)
      handler: debounce(function (value) {
        this.getSearchSuggestion(value);
      }, 500),
    },
  },
  methods: {
    higu(item) {
      // 2.搜索数据 下面展示的搜索内容，会变红 就把搜索的内容替换成有颜色的内容 所以用正则表达式
      // map是返回一个新数组 不会改变原数组 内容不变
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      );
    },
    hanClick(value) {
      console.log(value);
      // 4.点击搜索出来的内容，传递给父组件 把输入框里面的值变成点击的值
      this.$emit("onSearch", value);
    },
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q);
      console.log(res);

      this.list = res.data.data.options;
    },
  },
};
</script>

<style></style>
