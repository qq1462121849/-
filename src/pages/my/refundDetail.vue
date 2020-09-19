<template> 
  <div id="refundDetail">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">退款详情</div>
    </div>
    <div class="refunddetail" v-if="detail">
      <div class="tkxq_a">
        <div class="tkxq_a_tit">
          <img v-if="detail.status == 1 || detail.status == 4" src="../../assets/img/my/rn_wait_bg.png" alt="">
          <img v-else-if="detail.status == 3 || detail.status == 6 || detail.status == 9|| detail.status == 10" src="../../assets/img/my/refund_a.png" alt="">
          <img v-else src="../../assets/img/my/rn_success_bg.png" alt="">
          <span>{{detail.status | statusFilter}}</span>
        </div>
        <div class="tkxq_a_price"><p>¥</p>{{detail.goodsPrice}}</div>
      </div>
      <div class="tkxq_b">
        <p>协商详情</p>
        <p class="tkxq_b_img1"><img src="../../assets/img/my/refund_b.png" alt=""></p>
      </div>
      <div class="tkxq_c">
        <div class="tkxq_c_left" v-if="app">
          <span class="tkxq_c_img2"><img :src="app.logo" alt=""></span>
          <p>{{app.title}}</p>
        </div>
        <div class="tkxq_c_right" @click="handKefu">
          <span class="tkxq_c_img3"></span>
          <span>客服</span>
        </div>
      </div>
      <div class="tkxq_d">
        <div class="tkxq_d_ddbh">
          <div class="tkxq_d_ddbh_left">
            <p>订单编号：</p>
          <span>{{detail.orderId}}</span>
          </div>
          <div class="tksq_d_btn" @click="copyTextShare(detail.orderId)">复制</div>
        </div>
        <div class="tkxq_d_sqsj">
          <p>申请时间：</p>
          <span>{{detail.createtime | parseTimer}}</span>
        </div>
        <div class="tkxq_d_shlx">
          <p>售后类型：</p>
          <span>{{detail.applyModelTxt}}</span>
        </div>
        <div class="tkxq_d_tkje">
          <p>退款金额：</p>
          <span>¥{{detail.goodsPrice}}</span>
        </div>
        <div class="tkxq_d_tkyy">
          <p>退款原因：</p>
          <span>{{detail.applyInfo}}</span>
        </div>
        <div class="tkxq_d_spmc">
          <p>商品名称：</p>
          <span class="tkxq_d_spmc_tit">{{detail.goodsName}}</span>
        </div>
      </div>
      <div class="tkxq_bottom" v-if="detail.status == 3 || detail.status == 4">
        <div class="tkxq_btn" v-if="detail.status == 3" @click="jumpTo('/refundwaybill')">填写运单</div>
        <div class="tkxq_btn" v-if="detail.status == 4" @click="jumpTo('/seeLogistics?id='+detail.orderId)">查看物流</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: "refundDetail",
  data() {
    return {
      statusH:0,
      detail: '',
      app: ''
    };
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    handKefu(){
      this.$http.post("/mc/kfInfo", {}, true).then(res => {
        if(res.code == 1){
          api.openWin({
            name: 'badidu',
            url: res.data.bdsqurl
          });
        }else{
          this.$vux.toast.text(res.msg);
        }
      });
    }
  },
  created() {
    let info = utils.storage.get("refundDetail") || '';
    this.app = this.$store.state.global.initData
    this.detail = info;
    console.log(info, this.app);
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  filters: {
    parseTimer(v){
      return utils.parseTime(v, 2);
    },
    statusFilter (v) {
      let res = ''; v=parseInt(v);
      switch (v) {
        case 1: res = '等待卖家确认';break;
        case 2: res = "卖家已同意";break;
        case 3: res = '买家确认，填写运单';break;
        case 4: res = '运单已填写，等待卖家确认';break;
        case 6: res = '卖家已拒绝';break;
        case 9: res = '售后申请已撤销';break;
        case 10: res = '售后申请已删除';break;
      }
      return res;
    }
  }
};
</script>

<style scoped lang='less'>
#refundDetail {
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
      width: 2rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      color: #222222;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .refunddetail{
    width: 7.5rem;
    height: 100%;
    margin-top: 0.88rem;
    background: #f4f4f4;
    .tkxq_a{
      width: 6.5rem;
      height: 1.25rem;
      padding: 0.5rem;
      font-size: 0.36rem;
      font-weight: 500;
      background: #ffffff;
      color: #333333;
      border-top: 1px solid #f4f4f4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: flex-start;
      .tkxq_a_tit{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        img{
        width: 0.4rem;
        height: 0.4rem;
        }
        span{
          margin-left: 0.2rem;
        }
      }
      .tkxq_a_price{
        font-size: 0.56rem;
        font-weight: 600;
        p{
          display: inline-block;
          font-size: 0.36rem;
        }
      }
    }
    .tkxq_b{
      height: 0.96rem;
      background: #ffffff;
      font-size: 0.3rem;
      margin: 0.2rem 0;
      padding: 0 0.3rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      p{
        display: inline-block;
      }
      .tkxq_b_img1{
        width: 0.24rem;
        height: 0.24rem;
        background-size: 100% auto;
      }
    }
    .tkxq_c{
      height: 0.96rem;
      background: #ffffff;
      font-size: 0.3rem;
      margin: 0.2rem 0;
      padding: 0 0.3rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .tkxq_c_left{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .tkxq_c_img2{
          width: 0.42rem;
          height: 0.42rem;
          background-size: 100% auto;
        }
        p{
          margin-left: 0.2rem;
          font-size: 0.3rem;
        }
      }
      .tkxq_c_right{
        width: 0.8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .tkxq_c_img3{
          width: 0.26rem;
          height: 0.26rem;
          background: url(../../assets/img/home/kefu.png) center top no-repeat;
          background-size: 100% auto;
        }
        span{
          font-size: 0.24rem;
        }
      }
    }
    .tkxq_d{
      height: 3.3rem;
      background: #ffffff;
      font-size: 0.24rem;
      line-height: 0.5rem;
      margin: 0.2rem 0;
      padding: 0.3rem 0.3rem;
      color: #999999;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      p{
        display: inline-block;
      }
      span{
        display: inline-block;
      }
      .tkxq_d_ddbh{
        width: 6.9rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .tksq_d_btn{
        width: 0.78rem;
        height: 0.44rem;
        color: #656565;
        border-radius: 0.1rem;
        border: 1px solid #999999;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        }
      }
      .tkxq_d_spmc{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        p{
          display: inline-block;
        }
        .tkxq_d_spmc_tit{
          width: 5.5rem;
          line-height: 0.43rem;
          display: inline-block;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .tkxq_bottom{
      height: 1rem;
      background:#fff;
      padding:0 0.2rem;
      overflow: hidden;
      position: fixed;
      bottom: 0;
      width: 7.1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .tkxq_btn{
        width: 1.54rem;
        height: 0.62rem;
        margin-left: 0.2rem;
        border-radius: 0.1rem;
        border: 1px solid #F10125;
        color: #F10126;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
