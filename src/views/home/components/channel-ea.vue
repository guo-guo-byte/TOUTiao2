<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="频道编辑"></van-cell>
    <van-cell title="我的频道">
      <template #default>
        <van-button
          @click="isEdit = !isEdit"
          class="edit-btn"
          plain
          round
          size="mini"
          type="danger"
        >
          <!-- 1-1.一开始是编辑所以点击的时候就变成了完成 就把isEdit变成true -->
          <!-- 1-2.判断编辑是完成还是编辑 -->
          {{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userCj"
        :key="value.id"
        @click="onMychannelClick(value, index)"
      >
        <!-- 2-2点击频道内容让他把父组件的导航的索引给复制 -->
        <!-- 1-3在点击时动态控制插件展示-->
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear" />
        </template>

        <template #text>
          <!-- 两个全等的时候就改变颜色 -->
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false"> </van-cell>
    <van-grid :gutter="10" class="re" direction="horizontal">
      <!-- 推荐列表的渲染 -->
      <van-grid-item
        class="channel-item"
        v-for="item in recommendCh"
        :key="item.id"
        @click="addChannel(item)"
      >
        <template #text>
          <van-icon name="plus" class="hu" />
          <span class="text">{{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 1.把父组件的index传过来然后 再把导航的数组传过去 让汉堡index===父组件的index
// 2.推荐列表 是通过接口拿到所有的数据 在通过过滤和some达到他是否和我的频道相匹配 相匹配就不要 留下我的频道没有的
// 3.点击编辑按钮就会把小x号改变
// 4.点击频道内容让他把父组件的导航的索引给赋值
// 5.我们再添加内容的时候 如果没有登陆的话 是不允许显示已经登陆页面的内容
// 如果未登录，则存储到本地 不支持同步功能 数据都是需要从接口拿的 这里不是从本地拿的
// 如果已登录，则存储到线上 支持同步功能

import { getAllChannels, fetchAdd, deleteUser } from "@/api/channel.js";
// 引用鲁大师 也可以直接引入 也可以封装一个
import { differenceBy } from "lodash";
// import differenceBy from "lodash/differenceBy";
// import _ from 'lodash' 这个是全部引入
import { Notify } from "vant";
import { mapState } from "vuex";
import { setLocal } from "@/utils/storage";
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
      isEdit: false, //当前为编辑
    };
  },
  computed: {
    // 这里通过先获取user的内容
    ...mapState(["user"]),
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
    //要删除的频道项
    async deleteUser(channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上 从接口删除
          await deleteUser(channel.id);
        } else {
          // 未登录 后台不会同步数据，将数据存储到本地 修改之后的数据存储本地
          setLocal("TOUTIAO_CHANNELS", this.userCj);
          this.$toast("删除频道成功");
        }
      } catch (err) {
        // console.log(err);
        this.$toast("删除频道失败，请稍后重试");
      }
    },
    // 删除操作
    onMychannelClick(channel, index) {
      console.log(channel);
      if (this.isEdit) {
        if (index === 0) return Notify({ type: "danger", message: "不让删除" });
        // 成功状态
        //当前点击的索引 如果小于高亮的索引 那就把高亮减去1 让前面的高亮，让他把高亮不要往后移动
        if (index <= this.active) {
          this.$emit("changeActio", this.active - 1, true);
        }
        //把自己干掉 所以不会往前走 而是往后走
        // 这是编辑状态
        this.userCj.splice(index, 1);
        // 持久化
        this.deleteUser(channel);
      } else {
        // 显示编辑
        this.$emit("changeActio", index, false);
      }
    },
    // 点击推荐频道添加到个人频道里面
    async addChannel(channel) {
      this.userCj.push(channel);
      if (this.user) {
        try {
          // 已登录，数据存储到线上 通过接口
          await fetchAdd({
            id: channel.id, // 频道 id
            seq: this.userCj.length, // 频道的 序号
          });
          this.$toast("添加成功");
        } catch (err) {
          this.$toast("保存失败");
        }
      } else {
        // 未登陆 把 修改个人的频道数据存到本地存储
        setLocal("TOUTIAO_CHANNELS", this.userCj);
      }
    },
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
.channel-item {
  /deep/.van-grid-item__icon-wrapper {
    position: unset;
  }
}
</style>
