<template>
  <div id="leaderboard">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">排行榜</div>
    </div>
    <div class="page_wrap" :style="{top: statusH +0.88+'rem'}">
      <div class="rule">
        <div class="title">规则说明</div>
        <div class="cont" :class="showRuleStatus?'cont1':''">
          <p class="text1">1.当订单付款后,也会显示在商品详情页中,如果有其他的用户点击这个商品详情页,可查看未成团订单,点击去参团,就可参团购买了。 </p>
          <p class="text2">2.发起拼单点击并进入需要购买的产品界面, 可选择单独购买付款成功。或者选择2-10人团（这里具体商品而定）付款成功后,即可分享拼团邀请好友参加。
            若成团后,商家会在规定的时间安排发货,如果想查看自己未成团的订单,就需要进入到千品app里,之后进入个人中心—我的团—找到想拼团的订单,点击进入“查看团详情”,
            右上角选择发送给朋友或微信群邀请他人参团。
          </p>
        </div>
        <div class="btn" @click="showRule">
          <img src="../../assets/img/task/down_show.png" alt="">
        </div>
      </div>
      <div class="tab_wrap">
        <div :class="labelStatus==1?'active':''" @click="chooseLabel(1)">日榜</div>
        <div :class="labelStatus==2?'active':''" @click="chooseLabel(2)">周榜</div>
      </div>
      <div class="countdown">
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
      <div class="winner">
        <div class="info1">
          <div class="bac_img">
            <img src="" alt="">
          </div>
          <div class="text1">春暖花开</div>
          <div class="text2">158****8888</div>
          <div class="text3"><span class="text4">¥</span>6666</div>
        </div>
        <div class="info2">
          <div class="bac_img">
            <img src="" alt="">
          </div>
          <div class="text1">春暖花开</div>
          <div class="text2">158****8888</div>
          <div class="text3"><span class="text4">¥</span>6666</div>
        </div>
        <div class="info3">
          <div class="bac_img">
            <img src="" alt="">
          </div>
          <div class="text1">春暖花开</div>
          <div class="text2">158****8888</div>
          <div class="text3"><span class="text4">¥</span>6666</div>
        </div>
      </div>
      <div class="info_li">
        <div class="title">
          <div class="text1">排名</div>
          <div class="text2">用户</div>
          <div class="text3">累计收益</div>
        </div>
        <div class="cont">
          <div class="cont_li" v-for="(item,index) in 5" :key="index">
            <div class="text1">1</div>
            <img src="" alt="">
            <div class="text2">
              <div>婷婷</div>
              <div>169****1112</div>
            </div>
            <div class="text3">¥8888</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="text1">我的当前排名：109名</div>
      <div class="text2">收益：¥8888</div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "leaderboard",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      showRuleStatus:false,
      labelStatus:1,
      time: 30 * 60 * 60 * 1000,
    };
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
    },
    showRule(){
      this.showRuleStatus = !this.showRuleStatus
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
#leaderboard {
  position: relative;
  height: 100%;
  background: url("../../assets/img/task/bg.png") no-repeat;
  background-size: 100% 100%;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 0.88rem;
    // background: #ffffff;
    color: #ffffff;
    background-size: 100% 100%;
    // border-bottom: 1px solid #EEEEEE;
    background: url("../../assets/img/task/bg.png") no-repeat;
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
    position: absolute;
    overflow-y: auto;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .rule{
      width: 100%;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      background: url("../../assets/img/task/bg2.png") no-repeat;
      background-size: 100% 100%;
      // margin: 0 auto;
      margin-top: 0.2rem;
      border-radius: 0.2rem;
      .title{
        font-size: 0.3rem;
        font-weight: 600;
      }
      .cont{
        width: 100%;
        // height: 2.55rem;
        max-height: 2.55rem;
        overflow: hidden;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
        p{
          font-size: 0.28rem;
          font-weight: 500;
          color:rgba(51,51,51,1);
        }
      }
      .cont1{
        max-height: 9999px;
        height: auto;
        overflow: auto;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
      }
      .btn{
        width: 100%;
        overflow: hidden;
        img{
          width: 0.35rem;
          height: 0.28rem;
          display: block;
          margin: 0 auto;
          margin-top: 0.1rem;
        }
      }
    }
    .tab_wrap{
      width: 100%;
      overflow: hidden;
      margin: 0.6rem 0 0.4rem;
      div{
        width: 1.8rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 0.3rem;
        color: #ffffff;
        float: left;
        font-size: 0.32rem;
        border: 2px solid #FFFFFF;
      }
      div:first-child{
        margin-left: 1rem;
      }
      div:last-child{
        margin-left: 1rem;
      }
      .active{
        background-color: #ffffff;
        color: #F20226;
      }
    }
    .countdown{
      margin: 0 auto;
      margin-bottom: 0.5rem;
      .van-count-down{
        padding-left: 1.8rem;
        box-sizing: border-box;
      }
      .colon {
        display: inline-block;
        margin: 0 4px;
        color: #ffffff;
      }
      .block {
        display: inline-block;
        width: 0.8rem;
        color: #F20226;
        font-size: 0.36rem;
        text-align: center;
        background-color: #ffffff;
        border-radius: 0.1rem;
      }
    }
    .winner{
      width: 100%;
      height: 3.48rem;
      background: url("../../assets/img/task/bg1.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      .info1{
        width: 2rem;
        text-align: center;
        position: absolute;
        top: 0.3rem;
        left: 2.45rem;
        .bac_img{
          width: 0.96rem;
          height: 1rem;
          margin: 0 auto;
          margin-bottom: 0.1rem;
          background: url("../../assets/img/task/icon1.png") no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
          img{
            width: 0.75rem;
            height: 0.75rem;
            display: block;
            border-radius: 50%;
            margin-top: 0.2rem;
            margin-left: 0.15rem;
            background-color: #dddddd;
          }
        }
        .text1{
          font-size: 0.24rem;
          color: #333333;
        }
        .text2{
          font-size: 0.2rem;
          color: #999999;
        }
        .text3{
          font-size: 0.36rem;
          color: #F20226;
          .text4{
            font-size: 0.24rem;
          }
        }
      }
      .info2{
        width: 1.8rem;
        text-align: center;
        position: absolute;
        top: 0.9rem;
        left: 0.12rem;
        .bac_img{
          width: 0.81rem;
          height: 0.84rem;
          margin: 0 auto;
          margin-bottom: 0.1rem;
          background: url("../../assets/img/task/icon2.png") no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
          img{
            width: 0.6rem;
            height: 0.6rem;
            display: block;
            border-radius: 50%;
            margin-top: 0.18rem;
            margin-left: 0.14rem;
            background-color: #dddddd;
          }
        }
        .text1{
          font-size: 0.24rem;
          color: #333333;
        }
        .text2{
          font-size: 0.2rem;
          color: #999999;
        }
        .text3{
          font-size: 0.36rem;
          color: #F20226;
          .text4{
            font-size: 0.24rem;
          }
        }
      }
      .info3{
        width: 1.8rem;
        text-align: center;
        position: absolute;
        top: 1.1rem;
        left: 4.97rem;
        .bac_img{
          width: 0.67rem;
          height: 0.72rem;
          margin: 0 auto;
          margin-bottom: 0.1rem;
          background: url("../../assets/img/task/icon3.png") no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
          img{
            width: 0.5rem;
            height: 0.5rem;
            display: block;
            border-radius: 50%;
            margin-top: 0.17rem;
            margin-left: 0.11rem;
            background-color: #dddddd;
          }
        }
        .text1{
          font-size: 0.24rem;
          color: #333333;
        }
        .text2{
          font-size: 0.2rem;
          color: #999999;
        }
        .text3{
          font-size: 0.36rem;
          color: #F20226;
          .text4{
            font-size: 0.24rem;
          }
        }
      }
    }
    .info_li{
      width: 100%;
      background: #ffffff;
      border-radius: 0.2rem;
      padding-bottom: 0.2rem;
      margin-top: 0.2rem;
      margin-bottom: 1.2rem;
      .title{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        overflow: hidden;
        border-bottom: 1px solid #EEEEEE;
        .text1{
          width: 25%;
          float: left;
        }
        .text2{
          width: 50%;
          float: left;
        }
        .text3{
          width: 25%;
          float: left;
        }
      }
      .cont{
        width: 100%;
        .cont_li{
          width: 100%;
          height: 1.12rem;
          overflow: hidden;
          padding: 0 0.2rem;
          box-sizing: border-box;
          border-bottom: 1px solid #EEEEEE;
          .text1{
            float: left;
            line-height: 1.12rem;
            font-size: 0.36rem;
            color: #666666;
            margin-left: 0.1rem;
          }
          img{
            width: 0.72rem;
            height: 0.72rem;
            display: block;
            border-radius: 50%;
            float: left;
            margin-left: 0.2rem;
            margin-top: 0.2rem;
            background-color: #dddddd;
          }
          .text2{
            float: left;
            margin-left: 0.2rem;
            margin-top: 0.15rem;
            div:first-child{
              font-size: 0.29rem;
              color: #333333;
            }
            div:last-child{
              font-size: 0.2rem;
              color: #999999;
            }
          }
          .text3{
            float: right;
            line-height: 1.12rem;
            font-size: 0.32rem;
            color: #FF0229;
            margin-right: 0.7rem;
          }
        }
        .cont_li:last-child{
          border-bottom: none;
        }
      }
    }
  }
  .footer{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    .text1{
      float: left;
      font-size: 0.29rem;
      color: #F20226;
    }
    .text2{
      float: right;
      font-size: 0.29rem;
      color: #F20226;
    }
  }
}
</style>
