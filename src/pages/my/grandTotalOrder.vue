<template>
  <div id="grandtotal">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">累计成交订单</div>
    </div>
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="top_title">
        <span class="text1">总计收入：</span>
        <span class="text2">¥90</span>
      </div>
      <div class="info_li">
        <div class="title">
          <span class="text">一级团队用户158****2345购买</span>
          <span class="time">2020.8.14</span>
        </div>
        <div class="content">
          <img src="" alt="">
          <div class="cont_right">
            <div class="title">李宁防雾泳镜李宁防雾泳镜李宁防雾泳镜李宁防雾泳镜李宁防雾泳镜</div>
            <div class="rg_bt">
              <span class="text1">实付：</span>
              <span class="text2">¥299</span>
            </div>
          </div>
        </div>
        <div class="li_bt">
          <span class="text1">收益比例：10%</span>
          <span class="text2">¥90</span>
          <span class="text3">我的收益：</span>
        </div>
      </div>
      <div class="info_li">
        <div class="title">
          <span class="text">一级团队用户158****2345购买</span>
          <span class="time">2020.8.14</span>
        </div>
        <div class="content">
          <img src="" alt="">
          <div class="cont_right">
            <div class="title">李宁防雾泳镜李宁防雾泳镜李宁防雾泳镜李宁防雾泳镜李宁防雾泳镜</div>
            <div class="rg_bt">
              <span class="text1">实付：</span>
              <span class="text2">¥299</span>
            </div>
          </div>
        </div>
        <div class="li_bt">
          <span class="text1">收益比例：10%</span>
          <span class="text2">¥90</span>
          <span class="text3">我的收益：</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem  } from "vux";
export default {
  name: "grandtotal",
  components: {
    XDialog,
    Tab,
    TabItem
  },
  data() {
    return {
      nowIndex:1,
      statusH:0
    };
  },
  methods: {
    chooseType(){

    }
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
#grandtotal {
  position: relative;
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
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
      width: 2.5rem;
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
    position: absolute;
    left: 0;
    right: 0;
    overflow-y: auto;
    width: 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .top_title{
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #fff;
      border-radius: 0.1rem;
      margin: 0.2rem 0;
      text-indent: 0.2rem;
      .text1{
        font-size: 0.25rem;
        font-weight: 600;
        color: rgba(32,32,32,1);
      }
      .text2{
        font-size: 0.36rem;
        font-weight: 600;
        color: rgba(224,46,36,1);
      }
    }
    .info_li{
      width: 100%;
      margin-bottom: 0.2rem;
      background-color: #fff;
      border-radius: 0.1rem;
      >.title{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        overflow: hidden;
        padding: 0 0.2rem;
        box-sizing: border-box;
        .text{
          float: left;
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(32,32,32,1);
          margin-left: 0.1rem;
        }
        .time{
          float: right;
          color: rgba(153,153,153,1);
        }
      }
      .content{
        width: 100%;
        height: 1.6rem;
        overflow: hidden;
        padding: 0 0.2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        img{
          float: left;
          width: 1.1rem;
          height: 1.1rem;
          border: 1px solid #dddddd;
          margin-top: 0.3rem;
        }
        .cont_right{
          float: left;
          width: 5.2rem;
          height: 1.5rem;
          margin-left: 0.2rem;
          .title{
            width: 100%;
            height: 0.9rem;
            line-height: 0.4rem;
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(32,32,32,1);
            margin-top: 0.2rem;
          }
          .rg_bt{
            width: 100%;
            overflow: hidden;
            .text1{
              float: left;
              font-size: 0.26rem;
              font-weight: 500;
              color: rgba(153,153,153);
            }
            .text2{
              float: left;
              font-size: 0.26rem;
              font-weight: 500;
              color: rgba(32,32,32);
            }
          }
        }
      }
      .li_bt{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        overflow: hidden;
        padding: 0 0.2rem;
        box-sizing: border-box;
        .text1{
          float: left;
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(153,153,153);
        }
        .text2{
          float: right;
          font-size: 0.36rem;
          font-weight: 600;
          color: rgba(224,46,36,1);
        }
        .text3{
          float: right;
          font-size: 0.26rem;
          font-weight: 500;
          color: rgba(153,153,153);
        }
      }
    }
  }
}
</style>
