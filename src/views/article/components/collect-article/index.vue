<template>
  <van-button class="btn">
    <template #icon>
      <van-icon
        @click="changeCollected"
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
        :loading="loading"
      >
      </van-icon>
    </template>
  </van-button>
</template>

<script>
import { deleteCollect, addCollect } from "@/api/search.js";
export default {
  name: "collectArticle",
  // 第一种写法
  //   props: {
  //   value: {
  //     type: Number,
  //     required: true,
  //   },
  //   input: {
  //     type: String,
  //   },
  // },
  // 第二种写法
  model: {
    prop: "isCollected", // 定义属性名
    event: "changeCollected", // 定义事件名
  },
  props: {
    isCollected: {
      type: Boolean,
    },
    aut_id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async changeCollected() {
      this.loading = true; // 请求接口修改收藏的状态 // 判断是否已经收藏
      try {
        if (this.isCollected) {
          // true
          // 已经收藏 》取消收藏
          await deleteCollect(this.aut_id);
        } else {
          // 没有收藏 》去收藏
          await addCollect(this.aut_id);
        } // 修改父组件的收藏状态 》界面更新
        this.$emit("changeCollected", !this.isCollected); // isCollected 修改前的状态
        this.$toast(this.isCollected ? "取消收藏" : "收藏成功");
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
