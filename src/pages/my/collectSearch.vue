<template>
  <div id="search">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <p class="backBox" @click="goBack()"><i class="iconfont icon-back"></i></p>
      <div class="search">
        <i class="iconfont1" @click="refresh"></i>
        <input type="text" v-model="keyword" disabled="disabled" placeholder="请输入搜索内容"/>
      </div>
    </div>
    <div class="page_wrap" :style="{paddingTop: statusH+0.88+'rem'}">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="collect_wrap">
          <div class="collect_li" v-for="(item,index) in list" :key="index">
            <div class="cont_wrap">
              <div class="cont_li">
                <div class="cont_box">
                  <img :src="item.image" alt="">
                  <div class="cont_rg">
                    <div class="title1">{{item.title}}</div>
                    <div class="text">¥{{item.price}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="empty_search"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from "../../utils";
export default {
  name: "search",
  components: {
    MescrollVue,
  },
  data() {
    return {
      statusH:0,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        auto: false,
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: "empty_search",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      keyword:'',
      list:[],
    };
  },
  created() {
    this.keyword = this.$route.query.tit ? decodeURIComponent(this.$route.query.tit) : ''
    this.upCallback({num: 1}, this.mescroll)
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
      console.log(11, this.keyword)
      this.$http.get("/collect/getList", { pn: page.num, keyword: this.keyword}).then(response => {
        if (page.num === 1) this.list = [];
        let arr = response.data || [];
        setTimeout(() => { mescroll && mescroll.endSuccess(arr.length);}, 600);
        this.list = this.list.concat(arr);
      }).catch(e => {mescroll && mescroll.endErr();});
    }
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#search {
  position: relative;
  height: 100%;
  background-color: #ffffff;
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
    border-bottom: 1px solid #E5E5E5;
    .backBox {
      position: absolute;
      bottom: 0.2rem;
      left: 0.3rem;
      .iconfont {
        font-weight: 1000;
      }
    }
    .search {
      width: 5.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      background: #F5F5F5;
      border-radius: 0.5rem;
      margin: 0 auto;
      margin-top: 0.15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont1 {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../assets/img/home/search.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
      input {
        width: 4.5rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        border: none;
        background: #F5F5F5;
      }
    }
  }
  .page_wrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .mescrollBox{
      height: 100%;
    }
    .collect_wrap{
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .collect_li{
        width: 100%;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.29rem;
          color: #545454;
        }
        .cont_wrap{
          width: 100%;
          .cont_li{
            width: 100%;
            height: 2.3rem;
            overflow: hidden;
            border-radius: 0.2rem;
            margin-bottom: 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .van-swipe-cell{
              width: 100%;
            }
            .van-swipe-cell__wrapper{
              overflow: hidden;width: 100%;
            }
            .cont_box{
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 0.2rem;
              background-color: #fff;
              overflow: hidden;
              position: relative;
              img{
                width: 2.3rem;
                height: 2.3rem;
                display: inline-block;
                vertical-align: top;
              }
            }
            .cont_rg{
              flex: 1;
              padding-left: 0.2rem;
              height: 2.3rem;
              .title1{
                width: 4.4rem;
                font-size: 0.26rem;
                color: #545454;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient:vertical;
                flex-direction: column;
                padding-top: 0.2rem;
              }
              .text{
                font-size: 0.36rem;
                color: #FF0034;
                margin-top: 0.5rem;
              }
            }
          }
        }
        .cont_wrap1{
          width: 100%;
          .cont_li{
            .edite_wrap{
              width: 0.6rem;
              overflow: hidden;
              height: 2.3rem;
              display: flex;
              align-items: center;
            }
            .cont_rg{
              .title1{
                width: 3.9rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
