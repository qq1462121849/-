<template>
  <div id="addPayment">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">收款方式</div>
    </div>
    <div class="page_wrap">
      <div class="title">添加</div>
      <div class="cont_li" @click="jumpTo('editeBank')">
        <img src="../../assets/img/my/bank.png" alt="">
        <span class="text1">银行卡</span>
      </div>
      <div class="cont_li" @click="jumpTo('editeZfb')">
        <img src="../../assets/img/my/zfb.png" alt="">
        <span class="text1">支付宝</span>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "addPayment",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
    };
  },
  methods: {
    chooseType(){
      if(this.payType==1&&this.account1&&this.money){
        this.isOutStatus = true
      }else if(this.payType==2&&this.account2&&this.money){
        this.isOutStatus = true
      }
    },
  },
  created() {
    
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#addPayment {
  position: relative;
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 0.88rem;
    background: #ffffff;
    background-size: 100% 100%;
    // border-bottom: 1px solid #EEEEEE;
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
      ;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    // position: absolute;
    // left: 0;
    margin-top: 0.88rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    background-color: #ffffff;
    .title{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      color: #333333;
      border-bottom: 1px solid #EEEEEE;
    }
    .cont_li{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;
      img{
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        float: left;
        margin-top: 0.3rem;
      }
      .text1{
        float: left;
        font-size: 0.28rem;
        color: #333333;
        margin-left: 0.2rem;
      }
      .text2{
        float: right;
        font-size: 0.28rem;
        color: #FF0000;
        margin-left: 0.2rem;
      }
      .text3{
        float: right;
        font-size: 0.28rem;
        color: #333333;
      }
    }
  }
}
</style>
