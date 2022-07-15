<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了，点击重试"
    >
      <!-- 2.把子组件的内容在这里接受 再把参数传递给父组件 -->
      <ArticleCommentItem
        @rely-click="$emit('rely-click', $event)"
        v-for="item in list"
        :comment="item"
        :key="item.com_id"
      />
      <!-- <ArticleCommentItem
        v-for="item in list"
        :comment="item"
        :key="item.art_id"
      /> -->
      <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.content" /> -->
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>
<script>
import { getComments } from "@/api/comment.js";
import ArticleCommentItem from "@/views/article/components/pinglun/comment-item.vue";
export default {
  components: {
    ArticleCommentItem,
  },
  name: "ArticleComment",
  props: {
    source: {
      type: [String, Number],
    },
    // 1.实时更新添加到最上面的评论接受父组件的list
    list: {
      type: Array,
    },
    type: {
      type: String, //传递进来的有的话 就用这个 没有数据就用下面的默认
      default: "a",
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null, // 请求下一页数据的页码

      error: false,
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10, // 每页大小
        });
        this.list.push(...res.data.data.results);
        this.loading = false;
        if (res.data.data.results.length) {
          // 更新获取下一页数据的页码
          this.offset = res.data.data.last_id;
        } else {
          this.finished = true; // 没有数据了，关闭加载更多
        }
      } catch (error) {
        this.e = true;
        this.finished = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
