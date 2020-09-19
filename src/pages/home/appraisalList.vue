<template>
  <div id="pingjiaList">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">商品评价</div>
    </div>
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="pj_pos">
        <mescroll-vue id="pj_pos" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="pj_wrap" v-for="(item,index) in list" :key="index">
            <div class="title">
              <img :src="item.userAvatar" alt="">
              <div>{{item.userNick}}</div>
            </div>
            <div class="remark">{{item.content}}</div>
            <div class="pj_img" v-if="item.images && item.images.length">
              <img :class="(indx+1)%3==0?'rg':''" :src="itm" alt="" v-for="(itm,indx) in item.images" :key="indx">
            </div>
          </div>
          <div id="empty_pj"></div>
        </mescroll-vue>
      </div>
    </div>
    <div class="back_top" @click="backTop">
      <img src="../../assets/img/task/back_top.png" alt />
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem  } from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: "pingjiaList",
  components: {
    XDialog,
    Tab,
    TabItem,
    MescrollVue
  },
  data() {
    return {
      id: '',
      statusH:0,
      list: [],
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: "empty_pj",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
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
      let id = this.$route.query.id?this.$route.query.id:'';
      this.id = id;
      this.$http.post("/comment/getTmallComment",{goodsid:id, pn: page.num},true).then(response => {
        let arr = response.data;
        if (page.num === 1) this.list = [];
        this.list = this.list.concat(arr);
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length);
        });
      }).catch(e => {mescroll.endErr();});
    },
    backTop() {
      let body = document.getElementById("pj_pos");
      let time = "";
      time = setInterval(() => {
        let scroll = body.scrollTop;
        let speed = Math.floor(scroll / 10);
        if (speed <= 5) {
          body.scrollTop = 0;
          clearInterval(time);
        } else {
          body.scrollTop = scroll - speed;
        }
      }, 10);
    },
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
#pingjiaList {
  position: relative;
  height: 100%;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 0.88rem;
    background: url("../../assets/img/login/bj.png");
    background-size: 100% 100%;
    z-index: 1000;
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
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto !important;
    .pj_pos{
      height: 100%;
      width: 100%;
      overflow: auto;
      .pj_wrap:first-child{
        margin-top: 0.02rem;
      }
      .pj_wrap{
        width: 100%;
        padding: 0.32rem;
        box-sizing: border-box;
        background-color: #ffffff;
        margin-bottom: 0.2rem;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          img{
            width: 0.6rem;
            height: 0.6rem;
            display: block;
            float: left;
            border-radius: 50%;
            margin-top: 0.1rem;
            border: 1px solid #dddddd;
          }
          div{
            float: left;
            font-size: 0.24rem;
            color: #333333;
            margin-left: 0.1rem;
          }
        }
        .remark{
          width: 100%;
          font-size: 0.29;
          color: #333333;
          line-height: 0.4rem;
          margin-top: 0.2rem;
        }
        .pj_img{
          width: 100%;
          margin-top: 0.2rem;
          overflow: hidden;
          img{
            width: 2.22rem;
            height: 2.22rem;
            display: block;
            float: left;
            margin-bottom: 0.1rem;
            margin-right: 0.1rem;
            background-color: #dddddd;
          }
          .rg{
            margin-right: 0;
          }
        }
      }
    }
  }
  .back_top{
    position: fixed;
    bottom:3rem;
    right:0.35rem;
    img{
      width: 0.74rem;
      height: 0.74rem;
    }
  }
}
</style>
