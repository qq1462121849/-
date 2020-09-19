<template>
  <div id="refund">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.24+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">选择售后类型</div>
    </div>
    <div class="page_wrap">
      <div class="refund_info" v-if="info">
        <img :src="info.image" alt="">
        <div class="cont">
          <div class="text1">商品{{info.statusTxt}}</div>
          <div class="text2">{{info.goodsName}}</div>
        </div>
      </div>
      <div class="refund_type" @click="jumpTo('/refund1?type=0')">
        <img src="../../assets/img/my/refund_type1.png" alt="">
        <div class="cont">
          <div class="text1">我要退货退款</div>
          <div class="text2">已收到货，需要退还已收到的货物</div>
        </div>
      </div>
      <div class="refund_type" @click="jumpTo('/refund1?type=1')">
        <img src="../../assets/img/my/refund_type2.png" alt="">
        <div class="cont">
          <div class="text1">我要退款（无需退货）</div>
          <div class="text2">未收到货，或与商家协商之后申请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from "../../utils";
export default {
  name: "refund",
  data() {
    return {
      statusH: 0,
      info: ''
    };
  },
  created() {
    let info = utils.storage.get("refund") || '';
    this.info = info;
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#refund {
  position: relative;
  height: 100%;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 0.88rem;
    background: url("../../assets/img/login/bj.png");
    background-size: 100% 100%;
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
      color: #222222;
      font-size: 0.36rem;
      font-weight: 700;
      margin: 0 auto;
    }
  }
  .page_wrap{
    width: 100%;
    margin-top: 0.88rem;
    margin-bottom: 1rem;
    overflow-y: auto;
    .refund_info{
      width: 100%;
      overflow: hidden;
      padding: 0.2rem;
      box-sizing: border-box;
      background-color: #ffffff;
      margin-top: 0.1rem;
      img{
        width: 0.8rem;
        height: 0.8rem;
        display: block;
        float: left;
        margin: 0.2rem 0;
        background-color: #dddddd;
      }
      .cont{
        width: calc(100% - 1rem);
        margin-left: 0.2rem;
        float: left;
        margin-top: 0.2rem;
        .text1{
          width: 100%;
          font-size: 0.28rem;
          color: #333333;
        }
        .text2{
          width: 100%;
          font-size: 0.26rem;
          color: #999999;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
    .refund_type{
      width: 6.9rem;
      overflow: hidden;
      padding: 0.2rem;
      box-sizing: border-box;
      background-color: #ffffff;
      margin: 0 auto;
      margin-top: 0.2rem;
      border-radius: 0.2rem;
      img{
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        float: left;
        margin: 0.2rem 0;
      }
      .cont{
        width: calc(100% - 1rem);
        margin-left: 0.2rem;
        float: left;
        margin-top: 0.1rem;
        .text1{
          width: 100%;
          font-size: 0.36rem;
          color: #333333;
        }
        .text2{
          width: 100%;
          font-size: 0.26rem;
          color: #999999;
        }
      }
    }
  }
}
</style>
