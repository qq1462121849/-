<template> 
  <div id="realNameInfo">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">实名认证</div>
    </div>
    <div class="realname" :style="{top: 0.88+'rem'}">
      <div class="rn_tips">
        <img src="../../assets/img/my/rn_tips_bg.png" alt="">
        <p>平台用户信息安全由 中国人保财险 承保</p>
      </div>
      <div class="rn_info" @click="jumpTo('realNamelist')">
        <div class="rn_info_left"></div>
        <div class="rn_info_center">
          <div class="rn_info_ce_name">
            <div class="rn_info_ce_name_a">李胜利</div>
            <div class="rn_info_ce_name_b">
              <p class="rn_info_ce__name_c"></p>
              <span class="rn_info_ce_name_d">本人实名认证</span>
            </div>
          </div>
          <div class="rn_info_ce_number">4** *** **** **** ***4</div>
        </div>
        <div class="rn_info_right"></div>
      </div>
      <div class="rn_info_tips">用于保障账号安全，如用于账号找回、冻结等</div>
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
#realNameInfo {
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
    .rn_tips{
      height: 0.7rem;
      color: #258F23;
      font-size: 0.26rem;
      background: #F2FBF2;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      img{
        width: 0.3rem;
        height: 0.3rem;
        margin: 0.21rem 0.16rem 0.21rem 0.22rem;
      }
    }
    .rn_info{
      height: 1rem;
      background: #FFFFFF;
      padding: 0.42rem 0.24rem;
      border-bottom: 1px solid #F0F0F0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .rn_info_left{
        width: 1rem;
        height: 1rem;
        border: 1px dashed #9FA8B1;
      }
      .rn_info_center{
        height: 1.1rem;
        width: 5.7rem;
        margin-left: 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .rn_info_ce_name{
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .rn_info_ce_name_a{
            font-size: 0.32rem;
            font-weight: 800;
            color: #1B1B1B;
          }
          .rn_info_ce_name_b{
            width: 1.88rem;
            height: 0.36rem;
            margin-left: 0.2rem;
            font-size: 0.24rem;
            background: #27B311;
            border-radius: 0.18rem;
            color: #FFFFFF;
            display: inline-block;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .rn_info_ce__name_c{
              width: 0.24rem;
              height: 0.24rem;
              display: inline-block;
              background: url(../../assets/img/my/rn_name_img.png);
              background-size: 100% auto;
              margin-left: 0.07rem;
            }
            .rn_info_ce_name_d{
              display: inline-block;
            }
          }
        }
        .rn_info_ce_number{
          font-size: 0.27rem;
          font-weight: 800;
        }
      }
    }
    .rn_info_tips{
      height: 0.8rem;
      font-size: 0.25rem;
      padding-left: 0.24rem;
      background: #FFFFFF;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
