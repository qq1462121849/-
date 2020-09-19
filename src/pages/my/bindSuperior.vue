<template>
  <div id="bindsuper">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">绑定上级</div>
      <div class="okBtn" :class="inviteCode?'active':''" @click="bind" :style="{top: statusH +0.15+'rem'}">完成</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <van-field
        v-model="inviteCode"
        label="邀请码"
        placeholder="输入邀请码"
        input-align="right"/>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "bindsuper",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      inviteCode:''
    };
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
    },
    bind(){
      if(!this.inviteCode){
        this.$vux.toast.text("请填写邀请码");
        return;
      }
      this.$http
        .post(
          "/mc/bindUser",
          {inviteCode:this.inviteCode},
          true
        )
        .then(res => {
          if(res.code == 1){
            console.log(res.data)
            this.$vux.toast.text(res.msg);
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
#bindsuper {
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
    .okBtn{
      width: 0.78rem;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      position: absolute;
      top: 0.25rem;
      right: 0.4rem;
      font-size: 0.26rem;
      border-radius: 0.05rem;
      color: #666666;
      background-color: #DCDCDC;
    }
    .active{
      color: #ffffff;
      background-color: #AA54D8;
    }
  }
  .page_wrap{
    position: absolute;
    bottom: 0;
    width: 100%;
    // height: calc(100% - 0.88rem);
    // margin-top: 0.88rem;
    overflow: hidden;
    // position: relative;
    background-color: #ffffff;
  }
}
</style>
