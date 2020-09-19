<template>
  <div id="register">
    <div class="header" :style="{paddingTop: statusH + 'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">注册</div>
    </div>
    <div class="flexBox">
      <van-field v-model="mobile" type="tel" label="手机号码" placeholder="请输入手机号码" />
      <van-field
        v-model="smsCode"
        center
        clearable
        label="验证码"
        type="number"
        placeholder="请输入验证码">
        <template #button>
          <van-button size="small" class="btn" @click="getCode">{{getcode}}</van-button>
        </template>
      </van-field>
      <!-- <van-field v-model="password" label="设置密码" placeholder="请输入密码" />
      <van-field v-model="re_password" label="确认密码" placeholder="请再次输入密码" /> -->
      <van-field v-model="invite_code" label="邀请码" type="number" placeholder="请输入邀请码（选填）" />
      <div class="protocol" ref="protocol">
        <!-- <i @click="onPitch()" :class="imgSrcFlag?'selectd':'select'"></i> -->
        <van-icon class="icon" name="circle" size="20" color="#AC3EDA" v-if="!imgSrcFlag" @click="onPitch()"/>
        <van-icon class="icon" name="checked" size="20" color="#AC3EDA" v-if="imgSrcFlag" @click="onPitch()"/>
        <span>我已阅读并同意</span>
        <span class="text" @click="jumpTo({path:'protocolTxt',query:{type:1}})">
          《本APP企业用户注册协议》
        </span>
      </div>
      <div class="loginBtn" @click="send">注册</div>
      <div class="tologin" @click="jumpTo('login')">已有账户登录</div>
    </div>
  </div>
</template>

<script>
import { XDialog } from "vux";
// import identify from "./identify";
export default {
  name: "register",
  components: {
    XDialog,
    // identify
  },
  data() {
    return {
      mobile: "",
      smsCode: "",
      invite_code: "",
      imgSrcFlag: false, //协议是否选中
      getcode: "获取验证码",
      timerFlag: false, //重新发送验证码flag
      statusH: "", //状态栏
    };
  },
  methods: {
    onPitch() {
      this.imgSrcFlag = !this.imgSrcFlag;
    },
    //获取手机验证码
    getCode: function() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (this.timerFlag === false) {
        this.$http
          .post(
            "/auth/send",
            {
              mobile: this.mobile,
              event:'register'
            },
            true
          )
          .then(res => {
            this.timerFlag = !this.timerFlag;
            this.$vux.toast.text(res.msg);
            this.countDown(60);
          });
      } else {
        return "";
      }
    },
    // 每秒执行，验证码倒计时
    countDown(time) {
      let count = time;
      var timer = setTimeout(() => {
        count--;
        if (time <= 0) {
          this.getcode = "获取验证码";
          this.timerFlag = false;
          clearTimeout(timer);
        } else if (count !== time) {
          this.getcode = "重新获取" + count;
          this.countDown(count);
        }
      }, 1000);
    },
    send() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (!this.smsCode) {
        this.$vux.toast.text("请输入验证码");
        return;
      }
      if (!this.imgSrcFlag) {
        this.$vux.toast.text("请先勾选用户使用协议");
        return;
      }
      let wechat = localStorage.getItem("wechat")?localStorage.getItem("wechat"):''
      var info = {
        mobile: this.mobile,
        code: this.smsCode,
        inviteCode: this.invite_code,
        wechat: wechat,
      };
      this.$http.post("/auth/register", info, true).then(res => {
        if (res.code === 1) {
          this.$vux.toast.text(res.msg);
          this.$store.commit("setToken", res.data.userinfo.token);
          this.$store.commit("setUserInfo", res.data.userinfo);
          this.$router.push(this.$store.state.global.firstNav);
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
  },
  created() {
    this.mobile = this.$route.query.mobile?this.$route.query.mobile:''
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted() {
    const oHeight = window.innerHeight;
    window.onresize = () => {
      let oheight = document.body.clientHeight;
      let oH = oHeight - oheight;
      console.log(oH);
      if (oH > 0) {
        this.$refs.protocol.style.bottom = "-4rem";
      } else {
        this.$refs.protocol.style.bottom = "0.8rem";
      }
    };
  }
};
</script>

<style scoped lang='less'>
#register {
  position: relative;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: 0.88rem;
    background-color: #ffffff;
    .backBox {
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
      .iconfont {
        font-weight: 1000;
      }
    }
    .title {
      width: 2rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      color: #222222;
      font-size: 0.36rem;
      font-weight: 700;
      margin: 0 auto;
    }
  }
  .flexBox {
    width: 100%;
    position: absolute;
    top: 1.5rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .btn{
      width: 1.8rem;
      height: 0.68rem;
      line-height: 0.68rem;
      color: #B9B9B9;
      border-radius: 0.3rem;
      border: none;
      background: #F8F8F8;
    }
    .loginBtn {
      width: 6.48rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background: #AC3EDA;
      box-shadow: 0px 0.08rem 0.27rem 0px rgba(172, 62, 218, 0.42);
      border-radius: 0.5rem;
      color: #fff;
      font-size: 0.32rem;
      margin: 0 auto;
      margin-top: 1rem;
    }
    .protocol {
      width: 100%;
      height: 0.5rem;
      font-size: 0.22rem;
      line-height: 0.5rem;
      margin: 0 auto;
      text-align: center;
      margin-top: 1rem;
      .icon{
        float: left;
        margin-top: 0.02rem;
        margin-left: 0.8rem;
      }
      span{
        float: left;
      }
      .text{
        color: #AC3EDA;
      }
    }
    .tologin{
      width: 100%;
      text-align: center;
      font-size: 0.26rem;
      margin-top: 0.5rem;
    }
  }
}
</style>
