<template>
  <div>
    <h1>demo</h1>
    <!--1第一个写法. 获取上个组建的内容 -->
    <h4>{{ count }}</h4>
    <!--1第二个写法. 获取上个组建的内容 -->
    <h3>{{ $store.state.userTnto.name }}</h3>
    <!-- 修改 -->
    <van-field type="number" v-model.number="num"></van-field>
    <van-button @click="onSubmit">点击conunt++</van-button>
    <van-button @click="onSubmit2">点击名字更改</van-button>
    <!-- <van-button @click="count">点击增加</van-button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      num: 0,
    };
  },

  mounted() {
    console.log(this.$store);
  },
  //  1. 修改数据
  methods: {
    onSubmit() {
      this.$store.commit("getsta");
    },
    onSubmit2() {
      this.$store.commit("changeName");
    },
    // 2.可以传递参数 那边接受
    // count() {
    //   this.$store.commit("changeCount", this.num);
    // },
  },
  computed: {
    // 1.store仓库的状态通过mapState映射到前组件可以直接使用 可以直接拿到数据
    ...mapState(["count"]),
  },
};
</script>

<style></style>
