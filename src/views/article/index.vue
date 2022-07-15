<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- <van-button
            v-if="!article.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="Follow"
            >关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            @click="Follow"
            >已关注</van-button
          > -->
          <FollowUser
            :user_id="article.aut_id"
            v-model="article.is_followed"
          ></FollowUser>
          <!-- v-model里面有一个属性名 value和input（这是会传递的事件给到他）对的都是同一个article.is_followed
           -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="content"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 发布评论 -->
        <!-- 1.实时更新 因为更新是一开始父组件是直接接受的 list直接传递过去 子组件就可以接受 -->
        <ArticleComment
          :list="commentList"
          @rely-click="onRep"
          :source="article.art_id"
        ></ArticleComment>
        <van-popup v-model="isPostShow" position="bottom"
          ><Comment :target="article.art_id" @postSuccess="postSuccess"
        /></van-popup>
      </div>
      <!-- 回复弹层 -->

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFind">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="article.comm_count" color="#777" />
      <!-- 收藏 -->
      <CollectArticle v-model="article.is_collected" :aut_id="article.aut_id" />
      <van-icon color="#777" name="good-job-o" />
      <!-- <diaqnzan v-model="article.attitude" :aut_id="article.aut_id"></diaqnzan> -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <!-- v-if让组件销魂 -->
      <repoly
        v-if="isReplyShow"
        :currentComment="currentComment"
        @close="isReplyShow = false"
      ></repoly>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>
<script>
import { getArticleById } from "@/api/article.js";
// 下载yarn add github-markdown-css -S
import "github-markdown-css";
import { ImagePreview } from "vant";
import FollowUser from "@/views/article/components/follow-user";
import CollectArticle from "@/views/article/components/collect-article";
import ArticleComment from "@/views/article/components/pinglun";
import Comment from "@/views/article/components/pinglun/comment-post.vue";
import repoly from "./components/pinglun/comment-reoly";
// import diaqnzan from "@/views/article/components/dianzan";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    ArticleComment,
    Comment,
    repoly,
  },
  // 数据传递给子组件 任意一个组件都可以用这个 这里是post用
  provide() {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      // 1.实时更新
      commentList: [],
      article: {},
      loading: false, //文章加载状态 加载中
      isNptFound: false, //标识当前是不是404状态
      isFollowLoading: false,
      isPostShow: false,
      isReplyShow: false, //回复信息 通过子组件传递过来，在父组件直接使用
      currentComment: {}, //当前点击回复的评论项 把接收的参数传递给回复评论的列表里面
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById();
  },
  mounted() {},
  methods: {
    // 2.父组件接受内容把我们的点击回复的参数拿过来
    onRep(comment) {
      console.log(comment);
      this.isReplyShow = true;
      this.currentComment = comment;
      console.log(111);
    },
    //遍历dom获取图片结构
    postSuccess(data) {
      console.log("成功了");
      // 发布评论传递过来的内容添加到更新评论中
      this.commentList.unshift(data);
      this.isPostShow = false;
    },
    previewImg() {
      const imgs = this.$refs.content.querySelectorAll("img");
      const images = [];
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.addEventListener("click", function () {
          ImagePreview({
            images: images,
            startPosition: index, //指定图片的初始位置
          });
        });
      });
      console.log(images);
    },
    async getArticleById() {
      this.loading = true; //加载成功，显示文章详情
      try {
        const res = await getArticleById(this.articleId);
        console.log(res);
        this.article = res.data.data;
        this.loading = false; //加载中
        // 这里异步的是更新后直接更新 不是全部执行完再去执行
        // 上面是所有内容执行完毕后 获取图片
        this.$nextTick(() => {
          this.previewImg();
        });
      } catch (error) {
        console.log(error);
        // 显示错误再把loding关闭
        this.loading = false;
        this.isNptFound = error.response.status === 404;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
