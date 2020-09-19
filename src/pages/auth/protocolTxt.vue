<template>
  <div id="protocol">
    <div class="header" :style="{paddingTop: statusH + 'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">{{title}}</div>
    </div>
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="content" v-html="txt"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      txt: "",
      title:'',
      statusH: "", //状态栏
    };
  },
  created() {
    let type = this.$route.query.type?this.$route.query.type:''
    this.$http.post("/auth/agreement",{type:type}).then(res => {
      if (res.code == 1) {
        this.txt = res.data.info;
        this.title = res.data.title
      }
    });
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>
<style scoped lang="less">
#protocol{
  position: relative;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 0.88rem;
    background-color: #ffffff;
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