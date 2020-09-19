<template> 
  <div id="realNamelist">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">实名认证</div>
    </div>
    <div class="realname" :style="{top: 0.88+'rem'}">
      <div class="rn_tit">证件信息</div>
      <div class="rn_list">
        <p class="rn_list_left">真实姓名</p>
        <p class="rn_list_right">李胜利</p>
      </div>
      <div class="rn_list">
        <p class="rn_list_left">国籍</p>
        <p class="rn_list_right">中国</p>
      </div>
      <div class="rn_list">
        <p class="rn_list_left">证件类型</p>
        <p class="rn_list_right">身份证</p>
      </div>
      <div class="rn_list">
        <p class="rn_list_left">证件号</p>
        <p class="rn_list_right">4****************4</p>
      </div>
      <div class="rn_list rn_list_top">
        <p class="rn_list_left">人脸认证</p>
        <p class="rn_list_right">已认证</p>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem, } from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: "refundList",
  components: {
    XDialog,
    Tab,
    TabItem,
    MescrollVue,
  },
  data() {
    return {
      statusH:0,
      orderlist:[],
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      // mescrollUp: {
      //   callback: this.upCallback,
      //   page: {
      //     num: 0
      //   },
      //   htmlLoading:
      //     '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
      //   htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
      //   noMoreSize: 5,
      //   empty: {
      //     warpId: "empty_order",
      //     icon: require("../../assets/img/coupon/empty.png"),
      //     tip: "<div>暂无相关数据~</div><div>没找到订单？试试查看全部或更换登录方式</div>"
      //   },
      // },
    };
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {
      this.$http
        .post("amoy/task-hall/get-task-list", { page: page.num })
        .then(response => {
          let arr = response.data;
          if (page.num === 1) this.orderlist = [];
          this.orderlist = this.orderlist.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.orderlist.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
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
#realNamelist {
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
  .realname{
    position: absolute;
    bottom: 0;
    width: 7.5rem;
    // height: 100%;
    // margin-top: 0.88rem;
    background: #F5F5F5;
    font-size: 0.3rem;
    .rn_tit{
      padding: 0.3rem;
    }
    .rn_list{
      padding: 0.35rem;
      color: #58575A;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #FFFFFF;
      border-bottom: solid 1px #F1F1F1;
      .rn_list_left{
        color: #1A1A1A;
      }
      .rn_list_right{
        color: #787878;
      }
    }
    .rn_list_top{
      margin-top: 0.2rem;
      padding: 0.3rem;
    }
  }
}
</style>
