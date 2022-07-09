<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="频道编辑"></van-cell>
    <van-cell title="我的频道">
      <template #default>
        <van-button class="edit-btn" plain round size="mini" type="danger"
          >编辑</van-button
        >
      </template>
    </van-cell>
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        icon="clear"
        class="channel-item"
        v-for="(value, index) in userCj"
        :key="value.id"
      >
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false"> </van-cell>
    <van-grid :gutter="10" class="re" direction="horizontal">
      <van-grid-item class="channel-item" v-for="value in 8" :key="value">
        <template #text>
          <van-icon name="plus" class="hu" />
          <span class="text">{{ value }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 1.把父组件的index传过来然后 再把导航的数组传过去 让汉堡index===父组件的index
// 2.推荐列表 是通过接口拿到所有的数据 在通过过滤和some达到他是否和我的频道相匹配 相匹配就不要 留下我的频道没有的
import { getAllChannels } from "@/api/channel.js";
// 引用鲁大师 也可以直接引入 也可以封装一个
import { differenceBy } from "lodash";
// import differenceBy from "lodash/differenceBy";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userCj: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      allChannels: [],
    };
  },
  computed: {
    recommendCh() {
      // 使用鲁大师
      return differenceBy(this.allChannels, this.userCj, "id");
      //   // 从所有的频道数据里面，找到我的频道数据看是否两个相同 相同就直接--》过滤掉
      //   return this.allChannels.filter((item) => {
      //     // some 这里取反 找不到就false 找到就是true，所以要不相同 推荐频道才会显示
      //     return !this.userCj.some((userItm) => userItm.id === item.id);
      //     // return this.userCj.some((userItm) => userItm.id != item.id);
      //   });
    },
  },
  watch: {},
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    // 加载所有频道
    async loadAllChannels() {
      const res = await getAllChannels();
      console.log(res);
      this.allChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 100px;
  }
}
.channel-item .text {
  font-size: 24px;
  color: #222;
  margin-top: 0;
  &.active {
    color: red;
  }
}
/deep/ .channel-item .van-grid-item__content {
  background-color: #f4f5f6;
}

/deep/ .van-icon-plus {
  color: #222;
  font-size: 28px;
  margin-right: 5px;
}
.my-channel {
  /deep/ .van-icon-clear {
    position: absolute;
    font-size: 20px;
    right: -10px;
    top: -10px;
    color: #cacaca;
  }
}
</style>
