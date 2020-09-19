<template>
  <div id="setting">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">邀好友 赚零花</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88 + 'rem'}">
      <img class="top_img" src="../../assets/img/my/invit/top_img.png" alt="">
      <div class="cont1">
        <div class="cont_li cont_li1">
          <img src="../../assets/img/my/invit/icon1.png" alt="">
          <div class="content">
            <div class="text1">每日签到</div>
            <div class="text2">
              <img src="../../assets/img/my/invit/icon3.png" alt="">
              <span>奖励：1-10元现金（可直接提现）</span>
            </div>
          </div>
          <div class="rg1">领取奖励</div>
        </div>
        <div class="cont_li">
          <img src="../../assets/img/my/invit/icon2.png" alt="">
          <div class="content">
            <div class="text1">邀请好友赚更多</div>
            <div class="text2">
              <img src="../../assets/img/my/invit/icon3.png" alt="">
              <span>奖励：10-100元现金（可直接提现）</span>
            </div>
          </div>
          <div class="rg2" @click="jumpTo('invite2')">去做任务</div>
        </div>
      </div>
      <div class="cont2">
        <van-cell title="当前余额" is-link value="余额明细" title-class="text1" class="cont_li1" @click="jumpTo('acountBalance?type=1')"/>
        <div class="text2">9999.00</div>
        <div class="line"></div>
        <van-cell title="选择提现金额" is-link value="提现记录" title-class="text1" @click="jumpTo('acountBalance?type=3')"/>
        <div class="price_wrap">
          <div class="price mr" :class="labelStatus==1?'active':''" @click="chooseLabel(1)">1元</div>
          <div class="price mr" :class="labelStatus==2?'active':''" @click="chooseLabel(2)">10元</div>
          <div class="price" :class="labelStatus==3?'active':''" @click="chooseLabel(3)">50元</div>
          <div class="price mr" :class="labelStatus==4?'active':''" @click="chooseLabel(4)">100元</div>
          <div class="price mr" :class="labelStatus==5?'active':''" @click="chooseLabel(5)">200元</div>
          <div class="price" :class="labelStatus==6?'active':''" @click="chooseLabel(6)">500元</div>
        </div>
        <div class="btn">立即提现</div>
      </div>
      <div class="btn2">
        <img src="../../assets/img/my/invit/btn.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "setting",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      labelStatus:1,
      inviteInfo:null
    };
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
    },
    
  },
  created() {
    this.getInviteInfo()
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#setting {
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
      width: 2.5rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    position: absolute;
    left: 0;
    background: url("../../assets/img/my/invit/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .top_img{
      position: absolute;
      top: 0.9rem;
      left: 2.2rem;
      width: 3.07rem;
      height: 1.66rem;
      display: block;
    }
    .cont1{
      width: 100%;
      height: 3.8rem;
      background: url("../../assets/img/my/invit/wrap1.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 2.7rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
      overflow: hidden;
      .cont_li{
        width: 100%;
        height: 1.2rem;
        overflow: hidden;
        img{
          width: 0.75rem;
          height: 0.75rem;
          display: block;
          float: left;
          margin-top: 0.2rem;
        }
        .content{
          float: left;
          margin-left: 0.1rem;
          margin-top: 0.1rem;
          .text1{
            font-size: 0.29rem;
            color: #343434;
          }
          .text2{
            font-size: 0.18rem;
            color: #ED2800;
            overflow: hidden;
            img{
              float: left;
              width: 0.2rem;
              height: 0.19rem;
              display: block;
              margin-top: 0.1rem;
            }
            span{
              float: left;
              margin-left: 0.1rem;
            }
          }
        }
        .rg1{
          width: 1.5rem;
          height: 0.4rem;
          float: right;
          line-height: 0.4rem;
          text-align: center;
          color: #ffffff;
          font-size: 0.24rem;
          border-radius: 0.2rem;
          background-color: #ED2800;
          margin-top: 0.4rem;
        }
        .rg2{
          width: 1.5rem;
          height: 0.4rem;
          float: right;
          line-height: 0.4rem;
          text-align: center;
          color: #ED2800;
          font-size: 0.24rem;
          border-radius: 0.2rem;
          border: 1px solid #ED2800;
          margin-top: 0.4rem;
        }
      }
      .cont_li1{
        margin-top: 1.2rem;
        border-bottom: 1px solid #EEEEEE;
      }
    }
    .cont2{
      width: 100%;
      height: 7.9rem;
      background: url("../../assets/img/my/invit/wrap2.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 0.3rem;
      padding: 0 0.3rem;
      box-sizing: border-box;
      overflow: hidden;
      .text1{
        font-size: 0.3rem;
      }
      .cont_li1{
        margin-top: 1.2rem;
      }
      .van-cell{
        background-color: transparent;
        padding-left: 0;
        padding-right: 0;
      }
      .van-cell::after{
        border-bottom: none;
      }
      .text2{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.6rem;
        font-weight: bold;
      }
      .line{
        margin-top: 0.2rem;
        border-bottom: 1px solid #EEEEEE;
      }
      .price_wrap{
        width: 100%;
        overflow: hidden;
        .price{
          width: 2.03rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-radius: 0.2rem;
          font-size: 0.36rem;
          float: left;
          border: 1px solid #dddddd;
          box-sizing: border-box;
          margin-bottom: 0.1rem;
        }
        .mr{
          margin-right: 0.2rem;
        }
        .active{
          border: none;
          background-color: #ED2800;
          color: #ffffff;
        }
      }
      .btn{
        width: 5.5rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.2rem;
        font-size: 0.36rem;
        font-weight: bold;
        color: #ffffff;
        margin: 0 auto;
        margin-top: 0.3rem;
        background-color: #ED2800;
      }
    }
    .btn2{
      width: 6.3rem;
      height: 0.93rem;
      margin: 0.5rem auto;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
