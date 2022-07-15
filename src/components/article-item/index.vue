<template>
  <!-- 首页图片内容 -->
  <div class="article-item">
    <van-cell :title="article.title" :to="`/art/${article.art_id}`">
      <!-- 如果是一张图片的话 就直接默认default为右边 -->
      <template #default v-if="article.cover.type === 1">
        <van-image class="img" :src="article.cover.images[0]"></van-image>
      </template>
      <!-- 如果是三张图片的话 标题下方 label 的内容就会走下面的逻辑 -->
      <template #label>
        <div class="img-container" v-if="article.cover.type === 3">
          <van-image
            class="img-three"
            v-for="(item, index) in article.cover.images"
            :key="index"
            :src="item"
          ></van-image>
        </div>
        <div class="laber-container">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.article-item {
  .img {
    width: 200px;
  }
}
.img-container {
  display: flex;
  justify-content: space-between;
}
.img-three {
  width: 200px;
  height: 200px;
}
</style>
