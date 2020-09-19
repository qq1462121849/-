<template>
  <div id="my">
    <div class="header" :style="{paddingTop: statusH + 'rem'}">
      <!-- <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a> -->
      <div class="title">个人中心</div>
    </div>
    <div class="page_wrap" :style="{marginTop: statusH +0.88 + 'rem'}">
      <div class="header_task" v-if="userInfo">
        <img :src="userInfo.avatar" alt="">
        <div class="cont">
          <div class="title">
            <div class="text1">{{userInfo.nickname}}</div>
            <div class="text2" @click="jumpTo({path:'acountBalance',query:{money:userInfo.money}})">
              <span>¥</span>
              <span>{{userInfo.money}}</span>
            </div>
            <div class="text3">账户余额</div>
          </div>
          <div class="cont_wrap">
            <div class="cont_lf">
              <div v-if="userInfo.mobile">{{userInfo.mobile}}</div>
              <div class="text1" v-if="userInfo.agent.status==1">{{userInfo.agent.title}} 团队收益：{{userInfo.agent.percent}}%</div>
              <div v-if="userInfo.referee">我的邀请人：{{userInfo.referee}}</div>
            </div>
            <div class="cont_rg">
              <div @click="jumpTo('withdraw')">提现</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ps_wrap">
        <div class="title">
          <p class="text1">我的订单</p>
          <p class="text2" @click="goOrder(1)">查看全部  ></p>
        </div>
        <div class="entrance">
          <div class="entrance_li" @click="goOrder(2)">
            <img src="../../assets/img/my/index/pay.png" alt="">
            <div>待付款</div>
          </div>
          <div class="entrance_li" @click="goOrder(3)">
            <img src="../../assets/img/my/index/join_group.png" alt="">
            <div>拼团中</div>
          </div>
          <div class="entrance_li" @click="goOrder(4)">
            <img src="../../assets/img/my/index/group_success.png" alt="">
            <div>拼团成功</div>
          </div>
          <div class="entrance_li" @click="goOrder(5)">
            <img src="../../assets/img/my/index/received.png" alt="">
            <div>待收货</div>
          </div>
          <div class="entrance_li" @click="goOrder(6)">
            <img src="../../assets/img/my/index/evaluate.png" alt="">
            <div>待评价</div>
          </div>
        </div>
      </div>
      <!-- <div class="ranking">
        <img src="" alt="">
        <div class="text1">还差1人，人满发货</div>
        <div class="text2">邀请好友</div>
      </div> -->
      <div class="banner entrance2" @click="jumpTo('upgradeAgent')">
        <img v-if="poster" :src="poster.image" alt="">
      </div>
      <!-- <div class="banner1">
        <img src="" alt="">
        <img src="" alt="">
      </div> -->
      <div class="entrance1 ">
        <div class="entrance_li" @click="jumpTo('taskEarnings')">
          <img src="../../assets/img/my/index/pay.png" alt="">
          <div>任务赚</div>
        </div>
        <div class="entrance_li" @click="jumpTo('upgradeAgent')" v-if="userInfo && userInfo.agent.status!=1">
          <img src="../../assets/img/my/index/join_group.png" alt="">
          <div>成为代理商</div>
        </div>
        <div class="entrance_li" @click="jumpTo('myTeam')" v-if="userInfo && userInfo.agent.status==1">
          <img src="../../assets/img/my/index/join_group.png" alt="">
          <div>我的团队</div>
        </div>
        <div class="entrance_li" @click="jumpTo('collect')">
          <img src="../../assets/img/my/index/group_success.png" alt="">
          <div>收藏</div>
        </div>
        <div class="entrance_li" @click="jumpTo('browseLog')">
          <img src="../../assets/img/my/index/received.png" alt="">
          <div>历史浏览</div>
        </div>
        <div class="entrance_li" @click="jumpTo('refundList')">
          <img src="../../assets/img/my/index/evaluate.png" alt="">
          <div>退款/售后</div>
        </div>
      </div>
      <div class="entrance1" style="margin-bottom:0.5rem">
        <div class="entrance_li" @click="jumpTo('share')">
          <img src="../../assets/img/my/index/invite.png" alt="">
          <div>邀请好友</div>
        </div>
        <div class="entrance_li" @click="toTalk">
          <img src="../../assets/img/my/index/customer.png" alt="">
          <div>官方客服</div>
        </div>
        <div class="entrance_li" @click="jumpTo('addAddress')">
          <img src="../../assets/img/my/index/address.png" alt="">
          <div>收货地址</div>
        </div>
        <div class="entrance_li" @click="jumpTo({path:'paymentList'})">
          <img src="../../assets/img/my/index/payment.png" alt="">
          <div>收款方式</div>
        </div>
        <div class="entrance_li" @click="jumpTo('setting')">
          <img src="../../assets/img/my/index/setting.png" alt="">
          <div>设置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog,} from "vux";
import * as utils from "../../utils";
export default {
  name: "lockup",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      userInfo:null,
      kefyInfo:null,
      poster:null
    };
  },
  watch:{
    $route (to,from) {
      if(to.name=="setting"){
        this.getUserInfo()
      }
    }
  },
  methods: {
    //获取用户信息
    getUserInfo(){
      this.$http
        .post(
          "/mc/userInfo",
        )
        .then(res => {
          if(res.code == 1){
            console.log(res.data)
            this.userInfo = res.data
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
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
    toTalk(){
      api.openWin({
        name: 'badidu',
        url: this.kefyInfo.bdsqurl
      });
    },
    goOrder(num) {
      utils.storage.set("orderTab", num);
      this.jumpTo('/order');
    },
    getCategory(){//获取海报
      this.$http.get("/index/getIndexCategory",{type:''},true).then(res => {
        if (res.code == 1) {
          this.poster = res.data.mc[0]
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
  },
  created() {
    this.getUserInfo()
    this.getKFinfo()
    this.getCategory()
  },
  mounted() {
    
  },
  beforeMount() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
};
</script>

<style scoped lang='less'>
#my{
  overflow: hidden;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    overflow: hidden;
    height: 0.88rem;
    color: #ffffff;
    background: linear-gradient(90deg,rgba(201,63,203,1) 0%,rgba(119,47,239,1) 100%);
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
      font-size: 0.32rem;
      font-weight: 700;
      margin: 0 auto;
    }
  }
  .page_wrap{
    width: 100%;
    margin-bottom: 2.2rem;
    margin-top: 0.88rem;
    position: relative;
    .header_task{
      width: 100%;
      height: 3.6rem;
      overflow: hidden;
      background: linear-gradient(90deg,rgba(201,63,203,1) 0%,rgba(119,47,239,1) 100%);
      img{
        float: left;
        width: 1rem;
        height: 1rem;
        background-color: #dddddd;
        border-radius: 50%;
        margin-top: 0.2rem;
        margin-left: 0.3rem;
      }
      .cont{
        width: calc(100% - 1.8rem);
        float: left;
        margin-top: 0.2rem;
        margin-left: 0.2rem;
        color: #ffffff;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          .text1{
            float: left;
            font-size: 0.34rem;
          }
          .text2{
            float: right;
            margin-left: 0.1rem;
            span:first-child{
              font-size: 0.24rem;
            }
            span:last-child{
              font-size: 0.36rem;
              font-weight: 600;
            }
          }
          .text3{
            float: right;
          }
        }
        .cont_wrap{
          width: 100%;
          overflow: hidden;
          .cont_lf{
            width: 65%;
            float: left;
            div{
              width: 100%;
              height: 0.5rem;
              line-height: 0.5rem;
              font-size: 0.24rem;
            }
            .text1{
              font-size: 0.28rem;
            }
          }
          .cont_rg{
            width: 35%;
            float: left;
            div{
              width: 1.2rem;
              height: 0.5rem;
              line-height: 0.5rem;
              text-align: center;
              background-color: #ffffff;
              color: #F20226;
              font-size: 0.24rem;
              margin: 0 auto;
              border-radius: 0.2rem;
            }
          }
        }
      }
    }
    .ps_wrap{
      width: 6.9rem;
      height: 2.3rem;
      background-color: #fff;
      padding: 0 0.2rem;
      box-sizing: border-box;
      position: absolute;
      top: 2.9rem;
      left: 0.3rem;
      border-radius: 0.2rem;
      box-shadow:2px 2px 0px 0px #dddddd;
      .title{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        overflow: hidden;
        .text1{
          float: left;
          font-size: 0.26rem;
          color: #666666;
        }
        .text2{
          float: right;
          font-size: 0.26rem;
          color: #999999;
        }
      }
      .entrance{
        width: 100%;
        overflow: hidden;
        .entrance_li{
          width: 1rem;
          float: left;
          margin-right: 0.37rem;
          img{
            width: 0.88rem;
            height: 0.88rem;
            display: block;
            margin: 0 auto;
          }
          div{
            width: 100%;
            text-align: center;
          }
        }
        .entrance_li:last-child{
          margin-right: 0;
        }
      }
    }
    .ranking{
      width: 6.9rem;
      height: 0.88rem;
      line-height: 0.88rem;
      overflow: hidden;
      margin: 0 auto;
      border-radius: 0.2rem;
      background-color: #fff;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin-top: 1.8rem;
      img{
        float: left;
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.2rem;
        margin-right: 0.1rem;
        border-radius: 50%;
        background-color: #dddddd;
      }
      .text1{
        float: left;
        font-size: 0.26rem;
        font-weight: 600;
        color: #F20226;
      }
      .text2{
        width: 1.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        float: right;
        font-size: 0.24rem;
        font-weight: 600;
        color: #F20226;
        border: 1px solid #F20226;
        border-radius: 0.1rem;
        margin-top: 0.2rem;
      }
    }
    .banner{
      width: 6.9rem;
      height: 1.8rem;
      margin: 0 auto;
      border-radius: 0.2rem;
      margin-top: 0.2rem;
      background-color: #ffffff;
    }
    .banner1{
      width: 6.9rem;
      height: 1.8rem;
      margin: 0 auto;
      margin-top: 0.2rem;
      overflow: hidden;
      img{
        width: 3.34rem;
        height: 1.8rem;
        float: left;
        margin-right: 0.2rem;
        border-radius: 0.2rem;
        background-color: #dddddd;
      }
      img:last-child{
        margin-right: 0;
      }
    }
    .entrance1{
      width: 6.9rem;
      margin: 0 auto;
      margin-top: 0.2rem;
      overflow: hidden;
      padding: 0.2rem 0;
      box-sizing: border-box;
      border-radius: 0.2rem;
      background-color: #ffffff;
      .entrance_li{
        width: 20%;
        float: left;
        img{
          width: 0.88rem;
          height: 0.88rem;
          display: block;
          margin: 0 auto;
        }
        div{
          width: 100%;
          text-align: center;
        }
      }
      .entrance_li:last-child{
        margin-right: 0;
      }
    }
    .entrance2{
      margin-top: 1.8rem;
    }
  }
}
</style>
