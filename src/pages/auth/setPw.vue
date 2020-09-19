<template>
  <div id="setPw">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">修改密码</div>
    </div>
    <div class="page_wrap">
      <van-field v-model="oldPW" type="password" label="旧密码" placeholder="请输入旧密码" />
      <van-field v-model="newPW" type="password" label="新密码" placeholder="请输入新密码" />
      <van-field v-model="againPW" type="password" label="再次输入" placeholder="再次输入新密码" />
      <div class="btn1 active">下一步</div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "setPw",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      isActive:false,
      oldPW:'',
      newPW:'',
      againPW:''
    };
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
    },
    sendSms(){

    },
  },
  created() {
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
#setPw {
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
      width: 3rem;
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
    margin-top: 0.88rem;
    background: #ffffff;
    .btn1{
      width: 6.48rem;
      height: 1rem;
      line-height: 1rem;
      color: #ffffff;
      text-align: center;
      font-size: 0.32rem;
      border-radius: 0.5rem;
      background: #C684E1;
      margin: 0 auto;
      margin-top: 4rem;
      box-shadow: 1px 0.08rem 0.27rem 0px rgba(172, 62, 218, 0.42);
      background: #AC3EDA;
    }
    .active{
      background: #AC3EDA;
      box-shadow: 1px 0.08rem 0.27rem 0px rgba(172, 62, 218, 0.42);
    }
  }
}
</style>
