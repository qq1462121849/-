<template>
  <div id="withdraw">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">提现</div>
      <div class="rules" @click="jumpTo('wdRule')" :style="{top: statusH +0.15+'rem'}">规则</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <div class="content">
        <div class="cont">
          <van-radio-group v-model="payType" @change="chooseType">
            <van-radio name="1000" checked-color="#852CE7" icon-size="18px"
              v-if="payList1.length==0">
              <div class="pay_type">
                <div class="lf">支付宝</div>
                <div class="rg">
                  <div class="text1">未绑定支付宝账号</div>
                  <div class="text2" @click="jumpTo('editeZfb')">绑定支付宝账户</div>
                </div>
              </div>
            </van-radio>
            <van-radio :name="item.id" checked-color="#852CE7" icon-size="18px"
              v-for="(item,index) in payList1" :key="index">
              <div class="pay_type">
                <div class="lf">支付宝</div>
                <div class="rg">
                  <div class="text3">{{item.username}}({{item.alipay}})</div>
                  <div class="text2" @click="bindPay(item)">修改</div>
                </div>
              </div>
            </van-radio>
            <van-radio name="1001" checked-color="#852CE7" icon-size="18px"
              v-if="payList2.length==0">
              <div class="pay_type">
                <div class="lf">到账银行卡</div>
                <div class="rg">
                  <div class="text1">未绑定银行卡</div>
                  <div class="text2" @click="jumpTo('editeBank')">绑定银行卡</div>
                </div>
              </div>
            </van-radio>
            <van-radio :name="item.id" checked-color="#852CE7" icon-size="18px"
              v-for="(item,index) in payList2" :key="index">
              <div class="pay_type">
                <div class="lf">到账银行卡</div>
                <div class="rg">
                  <div class="text3">{{item.bankname}}({{item.bankno}})</div>
                  <div class="text2" @click="bindPay(item)">修改</div>
                </div>
              </div>
            </van-radio>
          </van-radio-group>
        </div>
        <div class="cont1">
          <div class="title">提现金额</div>
          <div class="price">
            <span>¥</span>
            <van-field
              class="input"
              v-model="money"
              @input="chooseType"
              placeholder=""
              input-align="left"/>
          </div>
          <div class="allOut">
            <span>全部提现</span>
            <span>(最低不少于10元)</span>
          </div>
          <div class="btn" :class="isOutStatus?'btn_active':''" @click="toPay">提现</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "withdraw",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      payType:1000,
      money:null,
      isOutStatus:false,
      account1:'',
      account2:'',
      payList1:[],
      payList2:[]
    };
  },
  watch: {
    $route (to,from) {
      if(to.name == 'withdraw'){
        this.getDataInfo()
      }
    }
  },
  methods: {
    chooseType(){
      if(this.payType!=1000 && this.payType!=1001&&this.money){
        this.isOutStatus = true
      }else{
        this.isOutStatus = false
      }
    },
    getDataInfo(){
      this.payList1 = []
      this.payList2 = []
      this.$http
      .post(
        "/mc/accountList",
        {page:1},
        true
      )
      .then(res => {
        if(res.code == 1){
          if(res.data.list){
            res.data.list.forEach(item => {
              if(item.type=='bank'){
                this.payList2.push(item)
              }else{
                this.payList1.push(item)
              }
            });
            if(this.payList1.length){
              this.payType = this.payList1[0].id
            }else if(!this.payList1.length&&this.payList2.length){
              this.payType = this.payList2[0].id
            }else{
              this.payType = 1000
            }
          }
        }else{
          this.$vux.toast.text(res.msg);
        }
      });
    },
    toPay(){
      if(this.isOutStatus){
        if(this.money<10){
          this.$vux.toast.text('提现金额最低不少于10元');
          return
        }
        this.$http
        .post(
          "/mc/withdraw",
          {
            money:this.money,
            accountId:this.payType,
          }
        )
        .then(res => {
          if(res.code == 1){
            this.$vux.toast.text(res.msg);
            this.$router.push("/my")
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
      }
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
  },
  created() {
    this.getDataInfo()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#withdraw {
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
    border-bottom: 1px solid #EEEEEE;
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
    .rules{
      position: absolute;
      top: 0.25rem;
      right: 0.4rem;
      font-size: 0.26rem;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    position: absolute;
    left: 0;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .content{
      width: 100%;
      background-color: #ffffff;
      .cont{
        width: 100%;
        padding: 0.6rem 0.2rem;
        box-sizing: border-box;
        background-color: #F8F8F8;
        .pay_type{
          width: 100%;
          overflow: hidden;
          .lf{
            float: left;
            width: 2rem;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.29rem;
          }
          .rg{
            float: left;
            margin-top: 0.2rem;
            .text1{
              font-size: 0.28rem;
              color: #6C6C6C;
            }
            .text2{
              font-size: 0.28rem;
              color: #6C6C6C;
              text-decoration: underline
            }
            .text3{
              font-size: 0.28rem;
            }
          }
        }
      }
      .cont1{
        width: 100%;
        overflow: hidden;
        padding: 0 0.6rem;
        box-sizing: border-box;
        .title{
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.29rem;
        }
        .price{
          width: 100%;
          overflow: hidden;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid #EFEFEF;
          span{
            float: left;
            width: 0.6rem;
            font-size: 0.62rem;
            font-weight: 800;
          }
          .input{
            float: left;
            width: calc(100% - 0.6rem);
            font-size: 0.6rem;
            font-weight: 800;
            padding: 0;
            margin-top: 0.1rem;
          }
        }
        .allOut{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          span{
            font-size: 0.26rem;
          }
          span:first-child{
            color: #405686;
          }
          span:last-child{
            color: #6E6E6E;
          }
        }
        .btn{
          width: 5.7rem;
          height: 0.94rem;
          line-height: 0.94rem;
          text-align: center;
          margin: 0.3rem auto;
          color: #C2C2C2;
          font-size: 0.36rem;
          border-radius: 0.2rem;
          background-color: #F3F3F3;
        }
        .btn_active{
          color: #ffffff;
          background-color: #AA54D8;
        }
      }
    }
  }
}
</style>
