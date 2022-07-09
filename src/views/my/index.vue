<template>
  <div class="my-container">
    <!-- 未登录头部 -->
    <!-- 1.v-if显示哪一个登录框 有tuken就显示登录成功 -->
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- /未登录头部 -->
    <!-- 已登录头部 -->
    <div class="header user-info" v-else>
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <van-image
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            class="avatar"
            round
          />
          <span class="name">{{ userU.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userU.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userU.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userU.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userU.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->
    <van-grid class="grid-nav" clickable :column-num="2">
      <van-grid-item>
        <template #icon>
          <TouTiao icon="shoucang" />
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <TouTiao icon="lishi" />
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="grid-nav"></div>
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="实名认证" is-link url="" />
    <van-cell title="用户反馈" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell title="系统设置" is-link url="" />
    <van-cell class="logout" @click="logOut" title="退出登录" v-if="user" />
  </div>
</template>

<script>
// 1.
import { mapState } from "vuex";
import { Dialog } from "vant";
import { fetchUser } from "@/api/user.js";
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userU: {},
    };
  },

  computed: {
    // 有没有token
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    // 判断，当本地存储是否有user，与user底下是否有token
    // if (this.$store.state?.user?.token) {
    this.fetchUser();
    // }
  },
  mounted() {},
  // 通过请求拦截器 拿到token获取数据 并且这次请求数据出错请求拦截器会走err 在这里会走catch
  methods: {
    async fetchUser() {
      try {
        const res = await fetchUser();
        console.log(res.data.data);
        this.userU = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    logOut() {
      Dialog.confirm({
        title: "标题",
        message: "弹窗内容",
      })
        .then(() => {
          console.log("成功了");
          // 点击确定按钮Token直接为空 也就是没有数据了
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("失败了");
        });
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  padding-bottom: 100px;
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}
.user-info {
  //background: red;
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 2px solid #fff;
      }
      .name {
        font-size: 30px;
        color: #fff;
        margin-left: 30px;
      }
    }
  }
}
.data {
  display: flex;
  justify-content: space-around;
  .data-item {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    span:nth-child(1) {
      font-size: 36px;
      margin-bottom: 15px;
    }
    span:nth-child(2) {
      font-size: 23px;
    }
  }
}
.grid-nav {
  background: #fff;
  .toutiao {
    font-size: 45px;
  }
  .toutiao-shoucang {
    color: #eb5253;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
}
.logout {
  text-align: center;
  color: red;
}
</style>
