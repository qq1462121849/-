<template>
  <div id="setMobile">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">修改手机号码</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <van-field v-model="mobile" label="手机号码" placeholder="请输入手机号码" />
      <van-field
        v-model="sms"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码">
        <template #button>
          <van-button size="small" class="btn" @click="getCode">{{getcode}}</van-button>
        </template>
      </van-field>
      <van-field v-model="newMobile" label="新手机" placeholder="请输入新的绑定手机号码" />
      <van-field v-model="againMobile" label="号码确认" placeholder="请再次输入新的绑定手机号码" />
      <div class="btn1" @click="send">下一步</div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "setMobile",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      shangji:false,
      mobile:'',
      sms:'',
      newMobile:'',
      againMobile:'',
      getcode: "获取验证码", //获取验证码
      timerFlag: false, //重新发送验证码flag
    };
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
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
              event:'update'
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
      if (!/[0-9]{11}/.test(this.newMobile) && !/[0-9]{11}/.test(this.againMobile)) {
        this.$vux.toast.text("请输入正确的手机号");
        return;
      }
      if (!this.sms) {
        this.$vux.toast.text("请输入验证码");
        return;
      }
      if (this.newMobile != this.againMobile) {
        this.$vux.toast.text("新绑定手机号两次输入不一致");
        return;
      }
      var info = {
        mobile: this.newMobile,
        code: this.sms,
      };
      this.$http.post("/mc/updateMobile", info, true).then(res => {
        if (res.code === 1) {
          this.$vux.toast.text(res.msg);
          this.$router.push({
            name:'setting',
            query:{}
          });
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
  },
  created() {
    this.mobile = this.$route.query.mobile?this.$route.query.mobile:''
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#setMobile {
  position: relative;
  height: 100%;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 0.88rem;
    background: #ffffff;
    background-size: 100% 100%;
    border-bottom: 1px solid #EEEEEE;
    .backBox {
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
      .iconfont {
        font-weight: 1000;
      }
    }
    .title {
      width: 3rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      ;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .page_wrap{
    position: absolute;
    bottom: 0;
    width: 100%;
    // height: calc(100% - 0.88rem);
    // margin-top: 0.88rem;
    background: #ffffff;
    .btn{
      width: 2.2rem;
      height: 0.68rem;
      color: #B9B9B9;
      border-radius: 0.3rem;
      border: none;
      background: #F8F8F8;
    }
    .btn1{
      width: 6.48rem;
      height: 1rem;
      line-height: 1rem;
      color: #ffffff;
      text-align: center;
      font-size: 0.32rem;
      border-radius: 0.5rem;
      background: #F8F8F8;
      margin: 0 auto;
      margin-top: 4rem;
      box-shadow: 1px 0.08rem 0.27rem 0px rgba(172, 62, 218, 0.44);
      background: #AC3EDA;
    }
  }
}
</style>
