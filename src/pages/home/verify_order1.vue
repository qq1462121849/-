<template>
  <div id="verify_order1">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">升级代理</div>
    </div>
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="level_up_price">
        <div>升级代理支付金额</div>
        <div>￥{{orderInfo.payPrice}}</div>
      </div>
      <div class="pay_type">
        <div class="wrap" @click="chooseType(item.payType)" v-for="(item,index) in payTypeList" :key="index">
          <div class="pay_li" v-if="item.status==1">
            <img v-if="item.payType=='wechat'" src="../../assets/img/home/pay/wx_pay.png" alt="">
            <img v-if="item.payType=='alipay'" src="../../assets/img/home/pay/zfb.png" alt="">
            <img v-if="item.payType=='credit'" src="../../assets/img/home/pay/qianbao.png" alt="">
            <span class="text1">{{item.title}}</span>
            <span class="text2">{{item.tips}}</span>
            <span class="text3" v-show="payStatus==item.payType">✔</span>
          </div>
        </div>
      </div>
      <div class="bt_img">
        <img src="../../assets/img/home/pay/baoxian_tip.png" alt="" @click="showBaoxian=true">
      </div>
      <div style="height:1.2rem"></div>
    </div>
    <div class="footer">
      <div class="footer_main">
        <div class="div_btn" @click="toPay">提交订单</div>
        <div class="div1">
          <span class="text1">实付款：</span>
          <span class="text2">¥{{orderInfo.payPrice}}</span>
          <span class="text3">免运费</span>
        </div>
      </div>
    </div>
    <x-dialog
      v-model="showBaoxian"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="show_bx">
        <img src="../../assets/img/home/pay/anquan.png" alt="">
        <div class="tip_li">
          <div class="text1"></div>
          <div class="text2">平台用户信息安全由中国人保财险承保</div>
        </div>
        <div class="tip_li">
          <div class="text1"></div>
          <div class="text2">您支付的资金仅会在您确认收货之后才会打款给商家，请放心支付</div>
        </div>
        <div class="bt_full"></div>
        <div class="close" @click="showBaoxian=false">
          <img src="../../assets/img/home/cancel.png" alt="">
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, XSwitch, Group, XInput, XNumber } from "vux";
export default {
  name: "verify_order1",
  components: {
    XDialog,
    XSwitch, 
    Group, 
    XInput,
    XNumber,
  },
  data() {
    return {
      statusH:0,
      showDizhi:true,
      buyNum:0,
      payStatus:1,
      showBaoxian:false,
      orderId:'',
      price:'',
      orderInfo:null,
      payTypeList:[]
    };
  },
  watch:{
    $route (to,from) {
      if(to.name=="verify_order1"){
        this.orderId = this.$route.query.id?this.$route.query.id:''
        // this.price = this.$route.query.price?this.$route.query.price:''
        this.getPayType()
      }
    }
  },
  methods: {
    chooseType(num){
      this.payStatus = num
    },
    //获取支付方式
    getPayType(){
      this.$http
        .post(
          "/payment/payInfo",
          {orderId:this.orderId}
        )
        .then(res => {
          if(res.code == 1){
            this.payTypeList = res.data.payType
            this.orderInfo = res.data.orderInfo
            this.payTypeList.forEach((item,index)=>{
              if(item.status){
                this.payStatus = item.payType
                return
              }
            })
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //支付
    toPay(){
      let that = this
      this.$http
        .post(
          "/payment/payStart",
          {
            payType:this.payStatus,
            orderId:this.orderId,
          }
        )
        .then(res => {
          if(res.code == 1){
            if(this.payStatus=='credit'){
              this.$vux.toast.text(res.msg);
              that.$router.push("/upgradeAgent");
              that.$router.push({
                name:'upgradeAgent',
                query:{}
              })
            }else{
              let payInfo = res.data.payOrder
              if (this.selectType == "微信") {
                let wxPay = api.require("wxPayPlus");
                let info = {
                  apiKey: payInfo.appid,
                  orderId: payInfo.prepayid,
                  mchId: payInfo.partnerid,
                  nonceStr: payInfo.noncestr,
                  timeStamp: payInfo.timestamp,
                  sign: payInfo.sign
                };
                wxPay.payOrder(info, function(ret, err) {
                  if (ret.status) {
                    that.$router.push({
                      name:'upgradeAgent',
                      query:{}
                    })
                  } else {
                    if (err.code === -2) {
                      that.$vux.toast.text("取消支付");
                    } else {
                      that.$vux.toast.text("支付失败");
                    }
                  }
                });
              } else {
                //支付宝支付
                var aliPayTradePlus = api.require("aliPayPlus");
                aliPayTradePlus.payOrder(
                  {
                    orderInfo: payInfo
                  },
                  function(ret, err) {
                    if (ret.code == 9000) {
                      that.$router.push({
                        name:'upgradeAgent',
                        query:{}
                      })
                    }
                    /*             api.alert({
                      title: "支付结果",
                      msg: ret.code,
                      buttons: ["确定"]
                    }); */
                  }
                );
              }
            }
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    }
  },
  created() {
    this.orderId = this.$route.query.id?this.$route.query.id:''
    // this.price = this.$route.query.price?this.$route.query.price:''
    this.getPayType()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#verify_order1 {
  position: relative;
  height: 100%;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 0.88rem;
    background: url("../../assets/img/login/bj.png");
    background-size: 100% 100%;
    z-index: 1000;
    border-bottom: 1px solid #E5E5E5;
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
  .page_wrap{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto !important;
    .level_up_price{
      width: 100%;
      height: 4rem;
      background-color: #ffffff;
      overflow: hidden;
      div:first-child{
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.3rem;
        margin-top: 1.2rem;
      }
      div:last-child{
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        color: #E83423;
        font-size: 0.5rem;
      }
    }
    .pay_type{
      width: 100%;
      padding-left: 0.2rem;
      box-sizing: border-box;
      background-color: #ffffff;
      margin-top: 0.1rem;
      .pay_li{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        padding-right: 0.2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #E5E5E5;
        img{
          width: 0.5rem;
          height: 0.5rem;
          display: block;
          float: left;
          margin-top: 0.26rem;
        }
        .text1{
          float: left;
          margin-left: 0.2rem;
          font-size: 0.28rem;
          color: #2A2A2A;
        }
        .text2{
          float: left;
          font-size: 0.24rem;
          color: #2A2A2A;
        }
        .text3{
          float: right;
          font-size: 0.28rem;
          color: #555A5B;
        }
      }
      .pay_li:last-child{
        border-bottom: none;
      }
    }
    .bt_img{
      width: 100%;
      margin-top: 2rem;
      img{
        width: 4.3rem;
        height: 0.32rem;
        display: block;
        margin: 0 auto;
      }
    }
  }
  .footer{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
    .footer_main{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .div1{
        float: right;
        .text1{
          font-size: 0.24rem;
          color: #2A2A2A;
        }
        .text2{
          font-size: 0.34rem;
          color: #CE372E;
        }
        .text3{
          font-size: 0.26rem;
          color: #CE372E;
          margin-right: 0.2rem;
        }
      }
      .div_btn{
        width: 2.56rem;
        height: 100%;
        float: right;
        color: #fff;
        font-size: 0.35rem;
        text-align: center;
        background-color: #CE372E;
      }
    }
  }
  .show_bx{
    width: 5.8rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    margin: 4rem auto 0;
    padding: 0.5rem 0.4rem;
    box-sizing: border-box;
    position: relative;
    img{
      width: 2.66rem;
      height: 2.66rem;
      display: block;
      margin: 0 auto;
    }
    .tip_li{
      width: 100%;
      margin-top: 0.2rem;
      overflow: hidden;
      .text1{
        width: 0.1rem;
        height: 0.1rem;
        float: left;
        border-radius: 50%;
        margin-top: 0.2rem;
        background-color: #92DA92;
      }
      .text2{
        width: calc(100% - 0.2rem);
        float: left;
        text-align: left;
        margin-left: 0.1rem;
        font-size: 0.29rem;
      }
    }
    .close{
      position: absolute;
      top: -0.3rem;
      right: -0.3rem;
      img{
        width: 0.58rem;
        height: 0.58rem;
        display: block;
      }
    }
  }
}
</style>
