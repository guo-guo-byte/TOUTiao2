<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了，点击重新加载"
      >
        <!-- 文章列表 -->
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        />
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
//error-text 加载失败后的提示文案
// error是否加载失败，加载失败后点击错误提示可以重新
//sync 触发load事件，必须使用sync修饰符
import { fexchAr } from "@/api/article.js";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组,渲染数据拿得到数据
      loading: false, // 控制加载中 loading 状态 一刷新就会变成true
      finished: false, // 控制数据加载结束的状态
      timetamp: null,
      error: false,
      refreshLoading: false,
      successText: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 1.初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad() {
      try {
        const res = await fexchAr({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        console.log(...res.data.data.results);
        // 2.如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。基于上面加载之后 在后面继续加载数据 这样就会铺满整个屏幕
        this.list = [...this.list, ...res.data.data.results];
        // 上面的数据请求完成后 手动关闭
        this.loading = false;
        // 3.当数据一开始等于0的时候 就是没有数据 我们就把数据打开，
        // 没有等于0就是有数据 那就是每次初始化或滚动到底部的时候就会有新的时间戳
        if (res.data.data.results.length === 0) {
          this.finished = true;
        } else {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (error) {
        this.error = true; // 开启错误提示
        this.loading = false; // 关闭 loading 效果
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const res = await fexchAr({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1,
        });
        console.log(this.list);
        // 将数据追加到列表的顶部
        this.list = [...res.data.data.results, ...this.list];
        // 数据会一刷新就会自动变为true，拿到后就把refreshLoading设置为false就返回原来的
        this.refreshLoading = false;
        // 数据拿到后返回false就会显示了更新了多少条数据
        this.successText = `更新了${res.data.data.results.length}条数据`;
      } catch (error) {
        this.refreshLoading = false;
        this.$toast.fail("请求失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
