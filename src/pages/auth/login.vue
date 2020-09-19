<template>
  <div id="login">
    <div class="header">
      <div class="login_img2">
        <img src="../../assets/img/logo.png" alt />
      </div>
    </div>
    <div class="flexBox">
      <div class="loginChoiceBox">
        <van-field v-model="mobile" label="" type="tel" placeholder="请输入手机号码" maxlength="11" />
        <van-field v-model="smscode" label="" type="number" placeholder="请输入验证码">
          <template #button>
            <span style="color:#3A3A3A" @click="getCode">{{getcode}}</span>
          </template>
        </van-field>
      </div>
      <div class="loginBtn" @click="login">登录</div>
      <div class="loginBtn1" @click="jumpTo('/register1')">注册</div>
      <div class="wxlogin" @click="wechatLogin" v-if="initData&&initData.wechatloginstatus==1">
        <img src="../../assets/img/auth/wechat.png" alt />
        <span>微信快捷登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
// import identify from "./identify";
import * as apiHttp from "../../api/index";
export default {
  name: "wechat_login",
  components: {
    Tab,
    TabItem,
    // identify
  },
  data() {
    return {
      mobile: "",
      code: "",
      smscode: "",
      isRegister: true, // 判断是否可以注册
      isRegisterText: "",
      nowIndex: 0, //默认选中的tabItem元素
      timerFlag: false, //重新发送验证码flag
      getcode: "获取验证码", //获取验证码
      identifyCode: "4568",
      identifyCodes: "",
      initData:null
    };
  },
  inject: ["reload"],
  methods: {
    login() {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      this.$http
      .post(
        "/auth/login",
        {
          mobile: this.mobile,
          code: this.smscode
        },
        true
      )
      .then(res => {
        if (res.code == 1) {
          this.$store.commit("setToken", res.data.userinfo.token);
          this.$store.commit("setUserInfo", res.data.userinfo);
          this.$router.push(this.$store.state.global.firstNav);
          this.saveInvitInfo()
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
    //存储邀请信息
    saveInvitInfo(){
      let inviteCode = localStorage.getItem("inviteCode");
      let ptid = localStorage.getItem("ptid");
      this.$http
          .post(
            "/task/userSpell",
            {
              inviteCode:inviteCode,
              ptid:ptid,
              type:1
            },
            true
          )
          .then(res => {
            if(res.code == 1){
              localStorage.removeItem("inviteCode");
              localStorage.removeItem("ptid");
            }
          });
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
              event:'login'
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
    //微信登陆
    wechatLogin() {
      let that = this;
      let wx = api.require("wxPlus");
      wx.auth(
        {
          apiKey: ""
        },
        function(ret, err) {
          if (ret.status) {
            localStorage.setItem("code", ret.code);
            that.$http
              .post(
                "/auth/wechatLogin",
                {
                  code: ret.code,
                },
                false)
              .then(res => {
                if (res.code === 1) {
                  if(res.data.userinfo.bind == 1){
                    that.jumpTo({
                      name: "register",
                      query: {}
                    });
                    localStorage.setItem("wechat", res.data.wechat);
                  }else{
                    that.$store.commit("setToken", res.data.userinfo.token);
                    that.$store.commit("setUserInfo", res.data.userinfo);
                    this.$router.push(this.$store.state.global.firstNav);
                  }
                }else {
                  that.$vux.toast.text(res.msg);
                }
              });
          } else {
            console.log(err.code);
          }
        }
      );
    },
  },
  created() {
    this.mobile = this.$route.query.mobile || "";
    this.initData = this.$store.state.global.initData?this.$store.state.global.initData:null
  },
  mounted: function() {
    const oHeight = window.innerHeight;
    window.onresize = () => {
      let oheight = document.body.clientHeight;
      let oH = oHeight - oheight;
      if (oH > 0) {
        this.$refs.botbg.style.bottom = "-4rem";
      } else {
        this.$refs.botbg.style.bottom = "-1.4rem";
      }
    };
  }
};
</script>

<style scoped lang="less">
.header {
  overflow: hidden;
  height: 6.46rem;
  position: relative;
  .bjimg {
    width: 120%;
    height: 100%;
    position: absolute;
    top: -1rem;
    left: -1rem;
    background: url("../../assets/img/login/shang.png");
    background-size: 115% 100%;
  }
  .backBox {
    display: block;
    margin-top: 0.6rem;
    margin-left: 0.3rem;
    position: absolute;
    z-index: 1;
    i {
      font-size: 0.4rem;
    }
  }
  .login_img2 {
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    z-index: 1;
    top: 2.3rem;
    left: 40%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
#login {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  .login_img1 {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 auto;
    margin-top: 0.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.flexBox {
  width: 100%;
  position: absolute;
  top: 5.1rem;
  background: #fff;
}
.loginChoiceBox {
  margin: 0 auto;
  width: 6rem;
  overflow: hidden;
}
.loginBtn {
  width: 6.58rem;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.32rem;
  border-radius: 0.4rem;
  color: #fff;
  background: linear-gradient(-12deg, #B01CCA, #7830F0);
  box-shadow: 1px 0.08rem 0.27rem 0px rgba(120, 48, 240, 0.45);
  margin: 0 auto;
  margin-top: 0.58rem;
}
.loginBtn1 {
  color: #333333;
  font-size: 0.3rem;
  margin-top: 0.38rem;
  margin-left: 6rem;
}
.wxlogin {
  width: 3.68rem;
  height: 0.78rem;
  line-height: 0.78rem;
  overflow: hidden;
  color: #666666;
  margin: 0 auto;
  margin-top: 0.7rem;
  font-size: 0.29rem;
  background-color: #F5F5F4;
  border-radius: 0.4rem;
  img{
    width: 0.54rem;
    height: 0.54rem;
    display: block;
    float: left;
    margin-left: 0.5rem;
    margin-top: 0.12rem;
  }
  span{
    float: left;
    margin-left: 0.2rem;
  }
}
.botbg {
  position: absolute;
  bottom: -1rem;
  width: 100%;
  height: 3.5rem;
  background: url("../../assets/img/login/xia.png") no-repeat;
  background-size: 100% 100%;
  p {
    width: 100%;
    text-align: center;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 0.22rem;
    color: #999;
    span {
      color: #e60013;
    }
  }
}
</style>
