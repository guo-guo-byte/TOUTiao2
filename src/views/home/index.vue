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
            to="/search"
            >搜索</van-button
          >
        </template>
      </van-nav-bar>
    </div>
    <div>
      <!-- 头部的导航1 v-model="active"是相当于选中哪一块就会在这里面显示索引 传递给汉堡-->
      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab v-for="item in userCj" :key="item.id" :title="item.name">
          <!-- 频道的列表 把数据传过去-->
          <Aarticle :channel="item" />
        </van-tab>
        <template #nav-right>
          <div class="placeholder"></div>
          <div class="hamburger-btn" @click="showp = true">
            <i class="toutiao toutiao-gengduo"></i>
          </div>
        </template>
      </van-tabs>
    </div>

    <!-- 弹层结构 -->
    <van-popup
      v-model="showp"
      position="bottom"
      close-icon-position="top-left"
      closeable
      :style="{ height: '90%' }"
    >
      <!-- <van-cell style="text-align: center" title="编辑频道"></van-cell> -->
      <!-- 给汉堡传值 让汉堡里面的数据显示出来  active相当于导航的索引 把导航索引传递过去和汉堡相匹配-->
      <channel :userCj="userCj" :active="active" @changeActio="changeActio" />
    </van-popup>
  </div>
</template>

<script>
import { getUser } from "@/api/channel.js";
import Aarticle from "@/views/home/components/article.vue";
import channel from "@/views/home/components/channel-ea";
import { getLocal } from "@/utils/storage";
import { TOUTIAO_CHANNELS } from "@/constanta";
// import channel from '@/views/home/components/channel'
export default {
  name: "HomePage",
  components: {
    Aarticle,
    channel,
  },
  props: {},
  data() {
    return {
      active: "",
      userCj: [],
      showp: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUser();
  },
  mounted() {},
  // 1.获取头部导航数据 正确的获取首页频道列表数据
  // 用户登录情况 || 本地存储没有数据 >> 接口拿数据
  // 其他情况 >> 获取本地存储数据 就是没有登录的时候添加或者删除在刷新就是之前的增改的内容
  methods: {
    async getUser() {
      // const res = await getUser();
      // console.log(res.data.data.channels);
      // this.userCj = res.data.data.channels;
      try {
        // 获取用户token
        const token = this.$store.state.user?.token;
        //获取本地错处频道数据
        let channels = getLocal(TOUTIAO_CHANNELS);
        if (token || !channels) {
          const res = await getUser();
          channels = res.data.data.channels;
        }
        this.userCj = channels;
      } catch (error) {
        this.$toast("失败");
      }
    },
    changeActio(index, sttus) {
      // 两个索引相等点击就会一样，点击任何一个另一个就会高亮
      this.active = index;
      // 弹层关闭
      this.showp = sttus;
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
