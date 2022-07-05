<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <!-- 6.ref拿到表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <!--required是自带星号  -->
        <!-- 1.利用插槽定义字体图标 -->
        <template #left-icon> <TouTiao icon="shouji" /> </template>
      </van-field>
      <!-- 3.让密码不显示 type="password" -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入密码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <!--5.type  maxlength 是限制只能输入是数字 最大能输入6位-->
        <!-- 1。利用插槽定义字体图标  left-icon	自定义输入框头部图标 就要放在上template-->
        <template #left-icon> <TouTiao icon="yanzhengma" /> </template>
        <!--2.验证码 native-type="button"设置不跳转  -->
        <template #button>
          <!-- 7.倒计时一开始 先展示获取验证的按钮，倒计时隐藏 点击按钮的时候 倒计时展示，并通过@finish="isShowCountDown = false"在让按钮显示 -->
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="5000"
            format=" ss s"
          />
          <!-- size="small“更改大小 -->
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            size="small"
            @click="sendSms"
            :loading="isDisabled"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSnsCode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LogonPage",
  data() {
    return {
      // 7.一开始设置为关闭
      isShowCountDown: false,
      isDisabled: false,
      // username: "",
      // password: "",
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      //4. 检测用户名和密码校验规则
      rules: {
        mobile: [
          {
            // 是否为必选字段
            required: true,
            // 校验规则如果不满足的提示消息
            message: "请输入手机号",
          },
          {
            // \d是数字的意思
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码错误",
          },
        ],
      },
    };
  },

  // 3。发送请求
  methods: {
    // 点击提交表单
    async onSubmit() {
      // 第一种写法 直接传参数
      //  async onSubmit(values) {
      // const res = await login(values);
      // / console.log(values);}
      // 第二种直接把密码 账号写死
      // 点击按钮 提示登录成功还是错误
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登录成功");
      } catch (error) {
        // ？号是代表&&的意思 检验是否都为真
        Toast.fail(error?.resoonse?.data?.message || "服务端错误");
      }
    },
    // 6.发送验证码 校验手机号async await后面的内容执行完毕后 如果成功才会往下进行 不成功下面打印的东西不会显示
    // validate("mobile"); 验证表单，支持传入 name 来验证单个或部分表单项
    // 9.点击验证码校验手机号是否格式正确
    async sendSms() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (error) {
        console.log(error);
        return;
      }
      try {
        // await this.$refs.form.validate("mobile");
        // 9.按钮禁用-》发送请求-》拿到结果-》接触禁用
        this.isDisabled = true;
        // 8.把mobile手机号发到后台
        await getSnsCode(this.user.mobile);
        // 7.点击按钮后 倒计时显示
        this.isShowCountDown = true;
        console.log("发送验证码中");

        // 8.提示验证码发送成功
        Toast.success("发送验证码成功");
      } catch (error) {
        // console.log(error); //这里面有下面的代码 message是提示的数据
        Toast.fail(error.response.data.message || "出错了");
        // console.log(error);
        // 报错后 不要展示倒计时
        this.isShowCountDown = false;
      } finally {
        // 9.不管成功或者失败都会执行的逻辑
        this.isDisabled = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
.send-sma-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
