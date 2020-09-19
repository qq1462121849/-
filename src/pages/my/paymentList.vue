<template>
  <div id="paymentList">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">收款方式</div>
      <div class="rules" @click="jumpTo('addPayment')" :style="{top: statusH+'rem'}">+</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <div class="title">收款账户</div>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="cont_li" v-for="(item,index) in dataList" :key="index">
          <img v-if="item.bankname=='中国银行'" src="../../assets/img/my/zgbank.png" alt="">
          <img v-else-if="item.bankname=='农业银行'" src="../../assets/img/my/nongye.png" alt="">
          <img v-else-if="item.bankname=='工商银行'" src="../../assets/img/my/gongshang.png" alt="">
          <img v-else-if="item.bankname=='建设银行'" src="../../assets/img/my/jianshe.png" alt="">
          <img v-else-if="item.alipay" src="../../assets/img/my/zfb.png" alt="">
          <img v-else src="../../assets/img/my/dfbank.png" alt="">
          <span class="text1" v-show="item.type=='bank'">{{item.bankname}}（{{item.bankno}}）</span>
          <span class="text1" v-show="item.type=='alipay'">{{item.alipay}}</span>
          <span class="text2" @click="bindPay(item)">换绑</span>
          <span class="text3" @click="deletePay(item.id)">删除</span>
        </div>
        <div id="empty_pm"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "paymentList",
  components: {
    XDialog,
    MescrollVue,
  },
  data() {
    return {
      statusH:0,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        // noMoreSize: 5,
        empty: {
          warpId: "empty_pm",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      dataList:null,
    };
  },
  methods: {
    refresh() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      this.$http
      .post(
        "/mc/accountList",
        {
          page: page.num,
        },
        true
      )
      .then(response => {
        let arr = response.data.list;
        localStorage.setItem('payData',JSON.stringify(response.data))
        if (page.num === 1) this.dataList = [];
        this.dataList = this.dataList.concat(arr);
        this.$nextTick(() => {
          mescroll.endSuccess(this.dataList.length);
        });
      })
      .catch(e => {
        mescroll.endErr();
      });
    },
    bindPay(obj){
      if(obj.type=="bank"){
        this.$router.push({
          name:'editeBank',
          query:{
            id:obj.id,
            type:'bank',
            username:obj.username,
            bankname:obj.bankname,
            bankbranch:obj.bankbranch,
            bankno:obj.bankno,
            idcard:obj.idcard
          }
        });
      }else{
        this.$router.push({
          name:'editeZfb',
          query:{
            id:obj.id,
            type:'alipay',
            username:obj.username,
            alipay:obj.alipay,
          }
        });
      }
    },
    deletePay(id){
      this.$http
        .post(
          "/mc/delAccount",
          {id:id},
          true,
          true
        )
        .then(res => {
          if(res.code == 1){
            this.$vux.toast.text(res.msg);
            this.mescrollUp.page.num = 1;
            this.upCallback(this.mescrollUp.page, this.mescroll);
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
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
#paymentList {
  position: relative;
  height: 100%;
  background-color: #ffffff;
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
      i{
        color: #333333;
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
    .rules{
      position: absolute;
      // top: 0;
      right: 0.4rem;
      font-size: 0.7rem;
      line-height: 0.88rem;
    }
  }
  .page_wrap{
    width: 100%;
    // height: calc(100% - 0.88rem);
    position: absolute;
    left: 0;
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
