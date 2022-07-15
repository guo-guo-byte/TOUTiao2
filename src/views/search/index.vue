<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
      <!-- 1.上面是输入框获取焦点我们的搜索结果隐藏 -->
    </form>
    <!-- 搜索结果页 -->
    <searchRrsult v-if="isShowResult" :searchText="searchText"></searchRrsult>
    <!-- 搜索建议组件 和子组件传递输入框里的内容 发送请求-->
    <searchsuggest
      v-else-if="searchText"
      :searchText="searchText"
      @onSearch="onSearch"
    ></searchsuggest>
    <!--搜索历史  -->
    <searchHistory
      v-else
      :searchHistories="searchHistories"
      @deleteAll="searchHistories = []"
      @onSearch="onSearch"
    ></searchHistory>
  </div>
</template>

<script>
// 1.一开始进入页面 是搜索历史展示出来 输入框里有字体就是搜索建议 按回车就是搜索结果
// 2.在建议中的子组件传递输入框里的内容 监听搜索内容的变化，发送请求获取搜索建议列表数据
// 3.当点击建议的时候，把搜索结果拿到，再然后把结果去搜索
// 4.展示搜索历史记录 判断搜索历史 设置空数组 往里面添加内容 当我们搜索的内容时候 添加到搜索历史头部
// 5。删除历史记录 利用v-if控制显示 再然后 利用点击事件 把我们的你内容删除掉 如果是点击就是在输入框里搜索
// 6.持久化 存储到本地存储里面
import searchsuggest from "@/views/search/components/search-suggestion.vue";
import searchHistory from "@/views/search/components/search-history.vue";
import searchRrsult from "@/views/search/components/search-resule.vue";
import { setLocal, getLocal } from "@/utils/storage.js";
export default {
  name: "SearchPage",
  components: {
    searchHistory,
    searchsuggest,
    searchRrsult,
  },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false,
      // 3.初始化的时候从本地存储获取数据
      searchHistories: getLocal("histary") || [], //搜索历史留下记录
    };
  },
  computed: {},
  // 3.持久化利用 watch 监视统一存储数据
  watch: {
    searchHistories(val) {
      console.log(val);
      setLocal("histary", val);
    },
  },
  created() {},
  methods: {
    // 搜索建议传递过来的传进来的值
    onSearch(value) {
      // 输入框赋值
      this.searchText = value;
      // 展示搜索页
      this.isShowResult = true;
      // 添加完成之前，先判断value是否已经在搜索历史列表里面 index=-1就是不存在
      const index = this.searchHistories.indexOf(value);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(value);
    },
    onCancel() {
      console.log("取消");
      this.$router.push("/home");
    },
  },
};
</script>
