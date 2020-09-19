<template>
  <div id="editeZfb">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        取消
      </a>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <div class="title">
        <div>修改支付宝账户</div>
        <div>请输入您的支付宝账户</div>
      </div>
      <van-cell-group>
        <van-field v-model="username" label="账户名" placeholder="输入支付宝账户名" />
        <van-field v-model="alipay" label="支付宝账户" placeholder="输入支付宝账户" />
        <van-field v-model="againAlipay" label="再次确认" placeholder="再次输入支付宝账户" />
      </van-cell-group>
      <div class="btn" @click="addPayType">下一步</div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "editeZfb",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      username:'',
      alipay:'',
      againAlipay:'',
      id:''
    };
  },
  methods: {
    addPayType(){
      if (!this.username) {
        this.$vux.toast.text("请输入支付宝账户名");
        return;
      }
      if (!this.alipay || !this.againAlipay) {
        this.$vux.toast.text("请输入支付宝账户");
        return;
      }
      if (this.alipay != this.againAlipay) {
        this.$vux.toast.text("两次输入支付宝账户不相同");
        return;
      }
      let info = {
        id:this.id?this.id:'',
        type:'alipay',
        username:this.username,
        alipay:this.alipay,
      }
      this.$http
        .post(
          "/mc/addAccount",
          info,
          true
        )
        .then(res => {
          if(res.code == 1){
            this.$vux.toast.text(res.msg);
            this.$router.push({
              name:'paymentList',
              query:{}
            });
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    }
  },
  created() {
    this.id = this.$route.query.id?this.$route.query.id:''
    this.username = this.$route.query.username?this.$route.query.username:''
    this.alipay = this.$route.query.alipay?this.$route.query.alipay:''
    this.againAlipay = this.$route.query.alipay?this.$route.query.alipay:''
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#editeZfb {
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
      font-size: 0.3rem;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    position: absolute;
    left: 0;
    padding: 0 0.2rem;
    box-sizing: border-box;
    background-color: #ffffff;
    .title{
      width: 100%;
      height: 3rem;
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;
      div:first-child{
        width: 100%;
        text-align: center;
        font-size: 0.44rem;
        font-weight: bold;
        margin-top: 1rem;
      }
      div:last-child{
        width: 100%;
        text-align: center;
        font-size: 0.34rem;
      }
    }
    .btn{
      width: 3.68rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.32rem;
      color: #ffffff;
      background: #AA54D8;
      margin: 2rem auto 0;
      border-radius: 0.2rem;
    }
  }
}
</style>
