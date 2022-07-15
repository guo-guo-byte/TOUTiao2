<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 把搜索结果拿到 使用接口
import { getSearch } from "@/api/search.js";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const res = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText, // 搜索关键字 传递来的值
      });
      console.log(res);
      this.list = [...this.list, ...res.data.data.results];
      // 3. 设置加载状态结束
      this.loading = false;

      // 4. 判断数据是否加载完毕 加载的时候把页码值++
      if (res.data.data.results.length) {
        this.page++; // 更新获取下一页数据的页码
      } else {
        this.finished = true; // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
