<template>
  <van-button class="like-btn" @click="onCommentLike(item)">
    <template #icon>
      <van-icon
        :color="dianzan_id ? 'red' : ''"
        :name="dianzan_id ? 'good-job' : 'good-job-o'"
      ></van-icon>
    </template>
    <!-- {{ comment.like_count || "赞" }} -->
  </van-button>
</template>

<script>
export default {
  model: {
    prop: "dianzan_id",
    event: "up-atitude",
  },

  props: {
    dianzan_id: {
      type: Number,
      required: true,
    },
    user_id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods() {},
};
</script>

<style></style>
