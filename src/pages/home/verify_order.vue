<template>
  <div id="verify">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">支付</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}" v-if="orderdata">
      <div class="address_wrap">
        <div class="cont1" v-if="!orderdata.address.length" @click="jumpTo({path:'addAddress'})">
          <img src="../../assets/img/home/pay/add_address.png" alt="">
          <span class="text1">手动添加收货地址</span>
          <span class="text2">></span>
        </div>
        <div class="cont2" v-if="orderdata.address.length" @click="jumpTo({path:'addAddress',query:{id:orderdata.address[0].id}})">
          <img src="../../assets/img/home/pay/dizhi.png" alt="">
          <div class="info">
            <div class="text1">
              <span>{{orderdata.address[0].username}}</span>
              <span>{{orderdata.address[0].mobile}}</span>
            </div>
            <div class="text2">
              {{orderdata.address[0].province}}{{orderdata.address[0].city}}{{orderdata.address[0].district}}{{orderdata.address[0].address}}
            </div>
          </div>
          <div class="more">></div>
        </div>
      </div>
      <div class="border" v-if="orderdata.address.length">
        <img src="../../assets/img/home/pay/border.png" alt="">
      </div>
      <div class="order_li">
        <div class="info_li">
          <div class="title"></div>
          <div class="content" v-for="(item,index) in orderdata.goods" :key="index">
            <img :src="item.skuInfo.image | addUrlHeader" alt="">
            <div class="cont_right1">
              <div class="title">{{item.title}}</div>
              <div class="rg_bt">
                {{item.skuInfo.title}}
              </div>
              <div class="rg_bt1">
                <span>￥{{item.price}}/件</span>
                <span>退货包运费</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="choose_num">
        <x-number
          title="购买数量"
          v-model="buyNum"
          width="0.8rem"
          :min="1"
          button-style="square">
        </x-number>
      </div>
      <div class="youhui_info">
        <span>平台优惠</span>
        <span>百亿补贴已优惠2502元</span>
      </div> -->
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
        <div class="div_btn" @click="createOrder">提交订单</div>
        <div class="div1">
          <span class="text1">实付款：</span>
          <span v-if="model==1" class="text2">¥{{price}}</span>
          <span v-if="model==2" class="text2">¥{{price1}}</span>
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
import * as utils from '../../utils';
export default {
  name: "verify",
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
      payStatus:null,
      showBaoxian:false,
      orderInfo:null,
      orderdata:null,
      price:0,//价格
      price1:0,//拼团价格
      model:1,//订单类型
      payTypeList:[],
      orderId:'',//订单id
    };
  },
  created() {
    let type = this.$route.query.type;
    this.type = type || 'shop';
    this.model = this.$route.query.model ? this.$route.query.model : 1;
    this.checkout();
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  methods: {
    chooseType(num){
      this.payStatus = num
    },
    //创建订单
    createOrder(){
      if(!this.orderdata.address.length || !this.orderdata.address[0].id){
        this.$vux.toast.text("请选择收获地址");
        return
      }
      if(!this.payTypeList.length || !this.payStatus){
        this.$vux.toast.text("请选择支付方式");
        return
      }
      let goods;
      if(this.type == 'cart'){
        goods = utils.storage.get('checkoutGoods');
      } else {
        let goodsId = this.$route.query.goodsId?this.$route.query.goodsId:''
        let skuId = this.$route.query.skuId?this.$route.query.skuId:''
        let quantity = this.$route.query.quantity?this.$route.query.quantity:''
        goods = [{
          goodsId:goodsId,
          skuId:skuId,
          quantity:quantity,
        }]
      }
      this.$http
        .post(
          "/order/create",
          {
            goods:JSON.stringify(goods),
            fromUid:0,
            model:this.model,
            addressId:this.orderdata.address[0].id,
            ptid:0
          }
        )
        .then(res => {
          if(res.code == 1){
            this.orderId = res.data.orderId
            this.toPay()
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
              that.$router.push("/order");
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
                    that.$router.push("/order");
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
                      that.$router.push("/order");
                    }
                  }
                );
              }
            }
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    checkout(){
      let goods;
      if(this.type == 'cart'){ // 购物车跳转
        goods = utils.storage.get('checkoutGoods');
      } else {
        let goodsId = this.$route.query.goodsId?this.$route.query.goodsId:''
        let skuId = this.$route.query.skuId?this.$route.query.skuId:''
        let quantity = this.$route.query.quantity?this.$route.query.quantity:''
        goods = [{goodsId:goodsId,skuId:skuId,quantity:quantity}]
      }
      this.$http.post("/cart/checkout",{goods: JSON.stringify(goods),model:this.model},true).then(res => {
        if (res.code == 1) {
          this.orderdata = res.data
          this.price = this.orderdata.countPrice
          let percent = Number(this.orderdata.percent)/100
          this.price1 = this.price*percent
          this.price1 = this.price1.toFixed(2)
          this.payTypeList = res.data.payTypeInfo
          this.payTypeList.forEach((item,index)=>{
            if(item.status){
              this.payStatus = item.payType
              return
            }
          })
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
    //获取订单信息
    getOrderInfo(){
      let goodsId = this.$route.query.goodsId?this.$route.query.goodsId:''
      let skuId = this.$route.query.skuId?this.$route.query.skuId:''
      let quantity = this.$route.query.quantity?this.$route.query.quantity:''
      let goods = {
        goodsId:goodsId,
        skuId:skuId,
        quantity:quantity
      }
      this.$http.post("/cart/checkout",{goods:JSON.stringify(goods),model:this.model},true)
      .then(res => {
        if (res.code == 1) {
          this.orderdata = res.data
          this.price = this.orderdata.countPrice
          let percent = Number(this.orderdata.percent)/100
          this.price1 = this.orderdata.price*percent
          this.price1.toFixed(2)
          this.payTypeList = res.data.payTypeInfo
          this.payStatus = this.payTypeList[0].payType
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
#verify {
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
    .address_wrap{
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      background: #ffffff;
      .cont1{
        width: 100%;
        height: 0.86rem;
        line-height: 0.86rem;
        overflow: hidden;
        img{
          width: 0.4rem;
          height: 0.4rem;
          display: block;
          float: left;
          margin-top: 0.24rem;
        }
        .text1{
          float: left;
          margin-left: 0.2rem;
          font-size: 0.26rem;
          color: #2A2A2A;
        }
        .text2{
          float: right;
          font-size: 0.26rem;
          color: #A1A2A3;
        }
      }
      .cont2{
        width: 100%;
        overflow: hidden;
        padding-top: 0.2rem;
        img{
          width: 0.26rem;
          height: 0.28rem;
          display: block;
          float: left;
          margin-top: 0.3rem;
        }
        .info{
          width: 5.98rem;
          float: left;
          margin-left: 0.2rem;
          .text1{
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            span:first-child{
              font-size: 0.32rem;
              color: #2A2A2A;
            }
            span:last-child{
              font-size: 0.26rem;
              color: #333333;
            }
          }
          .text2{
            font-size: 0.26rem;
            color: #333333;
          }
        }
        .more{
          margin-top: 0.3rem;
          font-size: 0.26rem;
          color: #A5A6A8;
          float: right;
        }
      }
    }
    .border{
      background: #ffffff;
    }
    .order_li{
      width: 100%;
      margin-top: 0.1rem;
      .info_li{
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 0.1rem;
        >.title{
          width: 100%;
          height: 0.2rem;
        }
        .content{
          width: 100%;
          overflow: hidden;
          padding: 0 0.2rem;
          box-sizing: border-box;
          background-color: #F5F5F5;
          img{
            float: left;
            width: 1.6rem;
            height: 1.6rem;
            border: 1px solid #dddddd;
            margin-top: 0.15rem;
          }
          .cont_right1{
            float: left;
            width: calc(100% - 1.9rem);
            height: 100%;
            margin-left: 0.2rem;
            .title{
              width: 100%;
              height: 0.6rem;
              line-height: 0.3rem;
              font-size: 0.24rem;
              font-weight: 500;
              color: #333333;
              margin-top: 0.15rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .rg_bt{
              width: 100%;
              font-size: 0.22rem;
              font-weight: 500;
              color: #9AA1A9;
            }
            .rg_bt1{
              width: 100%;
              font-size: 0.24rem;
              font-weight: 500;
              color: #333333;
              span:last-child{
                color: #47A343;
                padding: 0 0.1rem;
                display: inline-block;
                border: 1px solid #47A343;
                border-radius: 0.1rem;
              }
            }
          }
        }
      }
    }
    .choose_num{
      background-color: #ffffff;
      padding:0.2rem;
      box-sizing: border-box;
      border-bottom:1px solid #EEEEEE;
      .vux-number-round .vux-number-selector-sub, .vux-number-round .vux-number-selector-plus{
        padding:0.02rem;
      }
      .svg{
        width:0.18rem !important;
        height:0.18rem !important;
      }
      .weui-cell{
        padding:0;
        font-size:0.26rem;
      }
    }
    .youhui_info{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin-top: 0.1rem;
      background-color: #ffffff;
      span:first-child{
        float: left;
        font-size: 0.26rem;
        color: #2A2A2A;
      }
      span:last-child{
        float: right;
        font-size: 0.26rem;
        color: #2A2A2A;
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
