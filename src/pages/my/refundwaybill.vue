<template> 
  <div id="refundWaybill">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.24+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">填写运单</div>
    </div>
    <div class="refundwaybill">
      <!-- <div class="txyd_a">
        <div class="txyd_a_left">
          <p>选择快递公司</p>
          <span>中通快递</span>
        </div>
      </div> -->
      <div class="txyd_b">
        <p>输入快递公司</p>
        <input class="txyd_b_num" type="text" v-model="name" placeholder="请输入快递公司">
      </div>
      <div class="txyd_b">
        <p>输入订单号&emsp;</p>
        <input class="txyd_b_num" type="text" v-model="num" placeholder="请输入订单号">
      </div>
      <div class="txyd_c" @click="save">提交</div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: "refundbill",
  data() {
    return {
      statusH:0,
      name: '',
      num: '',
      info: ''
    };
  },
  created() {
    let info = utils.storage.get("refundDetail") || '';
    this.info = info;
    console.log(info);
  },
  methods: {
    save () {
      if(!this.name){this.$vux.toast.text("请输入快递公司名称");return false;}
      if(!this.num){this.$vux.toast.text("请输入快递单号");return false;}
      this.$http.post("/spell/expressReturn", {returnId: this.info.id, expressName: this.name, expressNo: this.num }).then(res => {
        if(res.code == 1){
          this.$vux.toast.text("信息已提交");
          this.goBack();
        }
      }).catch(e => {});
    },
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#refundWaybill {
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
  .refundwaybill{
    width: 7.5rem;
    height: 100%;
    margin-top: 0.88rem;
    background: #f4f4f4;
    font-size: 0.32rem;
    .txyd_a{
      padding: 0.3rem;
      background: #FFFFFF;
      border-top: 1px solid #f4f4f4;
      color: #333333;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .txyd_a_left{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        p{
        color: #656565;
        display: inline-block;
        }
        span{
          margin-left: 0.55rem;
        }
      }
      
    }
    .txyd_b{
      padding: 0.3rem;
      background: #FFFFFF;
      border-top: 1px solid #f4f4f4;
      color: #656565;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .txyd_b_num{
        margin-left: 0.55rem;
        color: #333;
        border: 0; 
        outline: none; 
        background-color: rgba(0, 0, 0, 0);
      }
      input.txyd_b_num::-webkit-input-placeholder{
        color: #cbcbcb
      }
    }
    .txyd_c{
      width: 6.9rem;
      height: 0.9rem;
      margin: 0.5rem 0.3rem;
      background: #ED2700;
      border-radius: 0.1rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
