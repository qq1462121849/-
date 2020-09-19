<template>
  <div id="wdRule">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">提现规则</div>
    </div>
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="content" v-html="rules"></div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "wdRule",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      rules:''
    };
  },
  methods: {
    //获取规则
    getRules(){
      this.$http
        .post(
          "/auth/agreement",
          {type:5}
        )
        .then(res => {
          if(res.code == 1){
            console.log(res.data)
            this.rules = res.data.info
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
  },
  created() {
    this.getRules()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#wdRule {
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
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    position: absolute;
    left: 0;
    padding: 0.3rem;
    box-sizing: border-box;
    .content{
      width: 100%;
      font-size: 0.29rem;
      color: #6C6C6C;
    }
  }
}
</style>
