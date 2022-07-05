<template>
  <!-- 抽取公共的iconfont在这里 相当于把class换成表达式 以数组的形式去写两个变量就要加逗号 -->
  <!-- <i class="toutiao toutiao-sousuo"></i> -->
  <i :class="['toutiao', `toutiao-${icon}`]"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
  },
};
</script>

<style></style>
