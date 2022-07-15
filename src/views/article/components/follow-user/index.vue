<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    v-if="!is_followed"
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    @click="follow"
    >关注</van-button
  >

  <van-button
    v-else
    class="follow-btn"
    round
    :loading="isFollowLoading"
    size="small"
    @click="follow"
    >已关注</van-button
  >
</template>

<script>
// 给组件一个v-model
//1.子组件通过value接受》》子组件可以props(value)属性接收
//2.提供子组件一个input事件--修改v-model后面的值
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "follow-user",
  model: {
    prop: "is_followed", // 定义属性名
    event: "update-follow", // 定义事件名
  },
  data() {
    return {
      isFollowLoading: false,
    };
  },

  props: {
    is_followed: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: [Number, String, Object],
      required: true,
    },
  },

  created() {},

  methods: {
    // 关注用户
    async follow() {
      this.isFollowLoading = true;
      try {
        // 如果已关注，则取消关注
        const authorId = this.user_id;
        if (this.is_followed) {
          await deleteFollow(authorId);
          this.$toast.success("取消关注");
        } else {
          // 否则添加关注
          await addFollow(authorId);
          this.$toast.success("关注成功");
        } // 让当前关注的状态取反 》界面响应式更新 就是点击之后他不会自己出来 需要更新 // 更新视图 // 通过自定义事件修改
        this.$emit("update-follow", !this.is_followed);
      } catch (err) {
        console.dir(err);
        if (err.response && err.response.status === 400) {
          return this.$toast.fail("不能关注自己");
        }
        this.$toast.fail("操作失败");
      } // 关闭按钮的 loading 状态

      this.isFollowLoading = false;
    },
  },
};
</script>

<style scoped lang="less"></style>
