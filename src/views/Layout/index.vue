<template>
  <div class="layout-container">
    <router-view />

    <van-tabbar v-model="active" class="lay-tabbba" route>
      <van-tabbar-item to="/home">
        <template #icon>
          <TouTiao icon="shouye"></TouTiao>
        </template>
        首页</van-tabbar-item
      >
      <van-tabbar-item to="/wenda"
        ><template #icon> <TouTiao icon="wenda"></TouTiao> </template
        >问答</van-tabbar-item
      >
      <van-tabbar-item to="/video"
        ><template #icon> <TouTiao icon="shipin"></TouTiao> </template
        >视频</van-tabbar-item
      >
      <van-tabbar-item to="/my"
        ><template #icon> <TouTiao icon="wode"></TouTiao> </template
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang="less">
.layout-container {
  .lay-tabbba {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
