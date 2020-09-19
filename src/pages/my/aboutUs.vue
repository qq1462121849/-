<template>
  <div id="aboutUs">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">关于我们</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}" v-if="dataInfo">
      <img class="img1" :src="dataInfo.logo" alt="">
      <div class="text">{{dataInfo.name}}</div>
      <img class="img2" :src="dataInfo.qrcode" alt="">
      <div class="text1">扫描二维码，您的朋友也可下载本APP客户端</div>
      <div class="bt">
        <div>{{dataInfo.banquan1}}</div>
        <div @click="handTest">本APP {{dataInfo.banquan2}} 版权所有</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutUs",
  data() {
    return {
      statusH:0,
      shangji:false,
      dataInfo:null,
      count: 0,
    };
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
    },
    handTest () {
      this.count++;
      if(this.count > 5){return ;}
      if(this.count == 5){
        this.$dialog.confirm({title: '打开本地调试模式'}).then((e) => {
          window.location.href = 'http://172.16.1.56:10001/index.html';
        }).catch(() => {});
        this.count = 0
      } 
    },
    getinfo(){
      this.$http
        .post(
          "/mc/aboutUs",
          {},
          true
        )
        .then(res => {
          if(res.code == 1){
            console.log(res.data)
            this.dataInfo = res.data
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    }
  },
  created() {
    this.getinfo()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#aboutUs {
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
    position: absolute;
    bottom: 0;
    width: 100%;
    // height: calc(100% - 0.88rem);
    // margin-top: 0.88rem;
    overflow: hidden;
    // position: relative;
    .img1{
      width: 1.4rem;
      height: 1.4rem;
      display: block;
      margin:  0 auto;
      margin-top: 1.1rem;
    }
    .text{
      font-size: 0.2rem;
      color: #646668;
      margin: 0.3rem 0;
      text-align: center;
    }
    .img2{
      width: 2.12rem;
      height: 2.12rem;
      display: block;
      margin:  0 auto;
      background-color: #ffffff;
    }
    .text1{
      font-size: 0.24rem;
      color: #4A4A4A;
      margin: 0.2rem 0;
      text-align: center;
    }
    .bt{
      width: 100%;
      position: fixed;
      bottom: 0.3rem;
      left: 0;
      div{
        text-align: center;
        font-size: 0.24rem;
        color: #767A7C;
      }
    }
  }
}
</style>
