<template>
  <div class="comment-reply">
    <van-nav-bar title="回复">
      <template #left>
        <van-icon color="white" name="cross" @click="$emit('close')"></van-icon>
      </template>
    </van-nav-bar>
    <!-- 把评论整个页面拿过来 点击哪一个通过 comment参数渲染出哪一个-->
    <commentitem :comment="currentComment"></commentitem>
    <van-cell title="评论回复" :borde="false"></van-cell>
    <!-- 拿到参数传递下去 把当前的type 传递下去  list传递下去-->
    <CommentList
      type="c"
      :list="list"
      :source="currentComment.com_id"
    ></CommentList>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <posthi type="c" :target="currentComment.com_id"></posthi>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import commentitem from "./comment-item.vue";
import CommentList from "./index.vue";
import posthi from "./comment-post.vue";
export default {
  name: "CommentReply",
  components: {
    commentitem,
    CommentList,
    posthi,
  },
  props: {
    currentComment: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
      isPostShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
