<template>
  <div id="register1">
    <div class="header" :style="{paddingTop: statusH + 'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
    </div>
    <div class="flexBox" :style="{top: statusH+0.88+'rem'}">
      <div class="text1">手机号注册</div>
      <div class="text2">您好，欢迎注册账号</div>
      <van-field v-model="mobile" type="tel" placeholder="请输入手机号码" />
      <div class="loginBtn" @click="jumpTo({path:'register',query:{mobile:mobile}})">同意协议并注册</div>
      <div class="protocol">
        <span>已阅读并同意以下协议：</span>
        <span @click="jumpTo({path:'protocolTxt',query:{type:1}})">用户协议</span>、
        <span @click="jumpTo({path:'protocolTxt',query:{type:2}})">隐私政策</span>
        <!-- <span>法律声明</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog } from "vux";
// import identify from "./identify";
export default {
  name: "register1",
  components: {
    XDialog,
    // identify
  },
  data() {
    return {
      mobile:'',
      statusH: "", //状态栏
    };
  },
  methods: {
    
  },
  created() {
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
#register1 {
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
    background: #ffffff;
    z-index: 2000;
    color: #000;
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
    // top: 1.5rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    .text1{
      font-size: 0.6rem;
    }
    .text2{
      font-size: 0.3rem;
      color: #A7A7A7;
    }
    .van-cell{
      padding-left: 0;
      padding-right: 0;
      margin-top: 0.5rem;
    }
    .van-cell::after{
      left: 0;
    }
    .loginBtn {
      width: 6rem;
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
    .protocol {
      width: 100%;
      font-size: 0.26rem;
      margin: 0 auto;
      margin-top: 1rem;
      span{
        color: #909090;
      }
    }
  }
}
</style>
