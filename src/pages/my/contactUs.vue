<template>
  <div id="contactUs">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH+0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">联系我们</div>
      <div class="h_cont">
        <img src="../../assets/img/auth/kefu.png" alt="">
        <div class="rg">
          <div class="text1">Hi，有问题联系我们</div>
          <div class="text2">在线时间：</div>
          <div class="text2">{{kefyInfo.kftime}}</div>
        </div>
      </div>
    </div>
    <div class="page_wrap">
      <div class="cont_li">
        <img src="../../assets/img/auth/qq.png" alt="">
        <div class="center">
          <div>平台客服QQ</div>
          <div>{{kefyInfo.qq}}</div>
        </div>
        <div class="btn">去咨询</div>
      </div>
      <div class="cont_li">
        <img src="../../assets/img/auth/wx.png" alt="">
        <div class="center">
          <div>平台客服微信</div>
          <div>{{kefyInfo.wechat}}</div>
        </div>
        <div class="btn">去咨询</div>
      </div>
      <div class="cont_li">
        <img src="../../assets/img/auth/mobile1.png" alt="">
        <div class="center">
          <div>平台客服手机号</div>
          <div>{{kefyInfo.mobile}}</div>
        </div>
        <div class="btn">去咨询</div>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "contactUs",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      kefyInfo:null
    };
  },
  methods: {
    //获取客服信息
    getKFinfo(){
      this.$http
        .post(
          "/mc/kfInfo",
        )
        .then(res => {
          if(res.code == 1){
            this.kefyInfo = res.data
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
  },
  created() {
    this.getPayType()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#contactUs {
  position: relative;
  height: 100%;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 4.7rem;
    color: #ffffff;
    background: url("../../assets/img/kefu_banner.png") no-repeat;
    background-size: 100% 100%;
    .backBox {
      position: absolute;
      // top: 0.2rem;
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
      ;
      font-size: 0.36rem;
      margin: 0 auto;
    }
    .h_cont{
      width: 100%;
      padding: 0.3rem 0.3rem 0;
      box-sizing: border-box;
      overflow: hidden;
      img{
        width: 1.54rem;
        height: 1.54rem;
        display: block;
        float: left;
        border-radius: 50%;
        background-color: #dddddd;
      }
      .rg{
        float: left;
        margin-left: 0.2rem;
        .text1{
          font-size: 0.4rem;
          font-weight: bold;
        }
        .text2{
          font-size: 0.24rem;
        }
      }
    }
  }
  .page_wrap{
    width: 100%;
    position: absolute;
    z-index: 1000;
    top: 3.7rem;
    left: 0;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .cont_li{
      width: 100%;
      height: 1.74rem;
      background-color: #ffffff;
      border-radius: 0.2rem;
      overflow: hidden;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin-bottom: 0.3rem;
      img{
        width: 0.62rem;
        height: 0.62rem;
        display: block;
        float: left;
        margin-top: 0.5rem;
      }
      .center{
        float: left;
        margin-top: 0.4rem;
        margin-left: 0.5rem;
        div:first-child{
          font-size: 0.26rem;
          color: #666666;
        }
        div:last-child{
          font-size: 0.22rem;
          color: #999999;
        }
      }
      .btn{
        width: 1.71rem;
        height: 0.55rem;
        line-height: 0.55rem;
        text-align: center;
        float: right;
        border: 1px solid #7E38D2;
        border-radius: 0.28rem;
        margin-top: 0.5rem;
        color: #7E38D2;
      }
    }
  }
}
</style>
