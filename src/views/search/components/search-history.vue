<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <!--1. 一开始为false -->
        <template v-if="idDeleStatus">
          <van-tag class="'btn" type="danger" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag class="'btn" type="success" @click="idDeleStatus = false"
            >完成</van-tag
          >
        </template>
        <!--1. 一开始为true 点击的时候idDeleStatus也就变成true 也就是其他为true就会显示 -->
        <van-icon name="delete" v-else @click="idDeleStatus = true"></van-icon>
      </template>
    </van-cell>
    <!-- 2.历史记录的内容 -->
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="clickHist(item, index)"
    >
      <template #default>
        <!-- 1.开始为false -->
        <van-icon name="clear" v-show="idDeleStatus"></van-icon>
      </template>
    </van-cell>
    <!-- <van-cell title="我是历史记录">
      <template #default> <van-icon name="clear"></van-icon> </template>
    </van-cell> -->
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      idDeleStatus: false,
    };
  },
  methods: {
    deleteAll() {
      // 2.通过父组件 让父组件删除
      this.$emit("deleteAll");
    },
    clickHist(item, index) {
      // 2。点击了历史，如果出于删除状态，点击就是删除当前项
      // 2.不处于删除状态，点击就是搜索
      if (this.idDeleStatus) {
        this.searchHistories.splice(index, 1);
      } else {
        // 2.去搜索
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin: 0 10px;
}
</style>
