<template>
  <div class="home-container">
    <div>
      <van-nav-bar fixed>
        <template #title>
          <van-button
            class="search-btn"
            icon="search"
            size="small"
            round
            type="info"
            >搜索</van-button
          >
        </template>
      </van-nav-bar>
    </div>
    <div>
      <!-- 头部的导航1 -->
      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab v-for="item in userCj" :key="item.id" :title="item.name">
          <!-- 频道的列表 把数据传过去-->
          <Aarticle :channel="item" />
        </van-tab>
        <template #nav-right>
          <div class="placeholder"></div>
          <div class="hamburger-btn">
            <i class="toutiao toutiao-gengduo"></i>
          </div>
        </template>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUser } from "@/api/channel.js";
import Aarticle from "@/views/home/components/article.vue";
export default {
  name: "HomePage",
  components: {
    Aarticle,
  },
  props: {},
  data() {
    return {
      active: "",
      userCj: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUser();
  },
  mounted() {},
  // 1.获取头部导航数据
  methods: {
    async getUser() {
      const res = await getUser();
      console.log(res.data.data.channels);
      this.userCj = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 110px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/ .channel-tabs {
  padding-top: 10%;
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
  }
}
</style>
