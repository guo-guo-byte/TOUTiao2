<template>
  <div class="home-container">
    <van-nav-bar title="测试">
      <template #title>
        <van-button
          icon="search"
          block
          class="sea"
          size="small"
          type="info"
          round
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  props: {},
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
.home-container {
  /deep/.van-nav__title {
    width: 80%;
    max-width: unset;
  }
  .van-nav__bar .van-icon {
    color: #fff;
  }
  .search-btn {
    background-color: #5babfb;
  }
}
</style>
