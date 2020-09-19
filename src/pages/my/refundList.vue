<template>
  <div id="refundList">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">退款/售后</div>
    </div>
    <div class="page_wrap" :style="{paddingTop: statusH+0.88+'rem'}">
      <div class="tabBox">
        <tab default-color="#999" active-color="#D8180D" :line-width="2" custom-bar-width="180px" bar-active-color="#D8180D">
          <tab-item :selected="nowIndex == 0" @on-item-click="chooseType(0)">全部</tab-item>
          <tab-item :selected="nowIndex == 1" @on-item-click="chooseType(1)">待处理</tab-item>
        </tab>
      </div>
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="order_wrap" v-for="(v, i) in orderlist" :key="i">
            <div class="cont_li">
              <div class="title">
                <span class="text2">订单号:&nbsp;</span>
                <span class="text2">{{v.orderId}}</span>
                <span class="text1">{{orderStatus[v.status]}}</span>
              </div>
              <div class="content">
                <img :src="v.thumb" alt="">
                <div class="cont_right1">
                  <div class="title">{{v.goodsName}}</div>
                  <div class="rg_bt">
                    {{v.skuName}}
                  </div>
                </div>
                <div class="cont_right2">
                  <div>{{v.goodsPrice}}</div>
                  <div>X {{v.goodsNum}}</div>
                </div>
              </div>
              <div class="content1">
                <span style="margin-right:0.1rem">实付:¥{{v.goodsPrice}}</span>
                <span>退款金额:</span>
                <span class="text">¥{{v.returnPrice}}</span>
              </div>
              <div class="bt">
                <div @click="handDetail(v)">售后详情</div>
                <div v-if="v.status == 9" @click="handDelete(v, i)">删除售后单</div>
                <div v-if="v.status == 3 || v.status == 1 || v.status == 4" @click="handChe(v, i)">撤销售后单</div>
              </div>
            </div>
          </div>
          <div id="empty_order"></div>
        </mescroll-vue>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, } from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: "refundList",
  components: {
    Tab,
    TabItem,
    MescrollVue,
  },
  data() {
    return {
      nowIndex:0,
      statusH:0,
      orderlist:[],
      orderStatus: '',
      applyModel: '',
      queren: true,
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
          warpId: "empty_order",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div><div>没找到订单？试试查看全部或更换登录方式</div>"
        },
      },
      
    };
  },
  methods: {
    chooseType(num){
      this.nowIndex = num
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {
      this.$http.post("/spell/returnList", { page: page.num, status: this.nowIndex }).then(response => {
        let arr = response.data.list || [];
        if (page.num === 1) {
          this.orderlist = []; 
          this.orderStatus = response.data.statusInfo;
          this.applyModel = response.data.applyModel
        };
        this.orderlist = this.orderlist.concat(arr);
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length);
        });
      }).catch(e => { mescroll.endErr();});
    },
    handDelete(v, i){
      this.$dialog.confirm({title: "温馨提示", message: "确认要删除这个售后单据么"}).then(res => {
        this.$http.post("/spell/deleteReturn", { returnId: v.id}).then(response => {
          if(response.code == 1){
            this.orderlist.splice(i, 1);
            this.$vux.toast.text("删除成功");
          }
        }).catch(e => {});
      }).catch(() => {})
    },
    handChe (v, i) {
      this.$dialog.confirm({title: "温馨提示", message: "确认要撤销这个售后单据么"}).then(res => {
        this.$http.post("/spell/cancelReturn", { returnId: v.id}).then(response => {
          if(response.code == 1){
            this.mescrollUp.page.num = 1;
            this.mescroll.scrollTo(0, 0);
            this.$nextTick(() => {
              this.upCallback(this.mescrollUp.page, this.mescroll);
            })
            this.$vux.toast.text("撤销成功");
          }
        }).catch(e => {});
      }).catch(() => {})
    },
    handDetail (v) {
      let obj = Object.assign(v, {applyModelTxt: this.applyModel[v.applyModel], orderStatusTxt: this.orderStatus[v.status]})
      utils.storage.set("refundDetail", obj);
      this.jumpTo('/refundDetail');
    },
  },
  created() {
    
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#refundList {
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
      bottom: 0;
      left: 0.3rem;
      height: 0.88rem;
      line-height: 0.94rem;
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
  .page_wrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .mescrollBox{
      height: 100%;
    }
    .tabBox {
      width: 100%;
      margin-bottom: 0.2rem;
      border-top: 1px solid #E5E5E5;
    }
    .order_wrap{
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .cont_li{
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 0.1rem;
        border-radius: 0.2rem;
        padding: 0.2rem;
        box-sizing: border-box;
        >.title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          .text1{
            float: right;
            font-size: 0.26rem;
            color: #E83423;
          }
          .text2{
            float: left;
            font-size: 0.26rem;
            color: #333333;
          }
          img{
            width: 0.4rem;
            height: 0.4rem;
            display: block;
            float: left;
            background-color: #dddddd;
            margin-top: 0.2rem;
            margin-right: 0.1rem;
          }
        }
        .content{
          width: 100%;
          height: 1.9rem;
          overflow: hidden;
          padding: 0 0.2rem;
          box-sizing: border-box;
          background-color: #F5F5F5;
          img{
            float: left;
            width: 1.56rem;
            height: 1.56rem;
            border: 1px solid #dddddd;
            margin-top: 0.15rem;
          }
          .cont_right1{
            float: left;
            width: calc(100% - 3rem);
            height: 1.56rem;
            margin-left: 0.2rem;
            .title{
              width: 100%;
              height: 0.8rem;
              line-height: 0.4rem;
              font-size: 0.26rem;
              font-weight: 500;
              color: #333333;
              margin-top: 0.15rem;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .rg_bt{
              width: 100%;
              font-size: 0.24rem;
              font-weight: 500;
              color: #999999;
              word-break:break-all;
              word-wrap:break-word;
            }
          }
          .cont_right2{
            float: right;
            // width: 1.2rem;
            height: 1.56rem;
            overflow: hidden;
            div{
              height: 0.5rem;
              line-height: 0.5rem;
              font-size: 0.26rem;
              color: #333333;
              margin-top: 0.15rem;
              text-align: right;
            }
            div:last-child{
              margin-top: 0;
              color: #999999;
            }
          }
        }
        .content1{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: right;
          font-size: 0.24rem;
          color: #333333;
          .text{
            color: #F20226;
          }
        }
        .bt{
          width: 100%;
          height: 1rem;
          padding: 0 0.3rem;
          box-sizing: border-box;
          overflow: hidden;
          div{
            // width: 1.5rem;
            height: 0.6rem;
            float: right;
            line-height: 0.6rem;
            text-align: center;
            border:1px solid #e5e5e5;
            border-radius: 0.1rem;
            margin-top: 0.2rem;
            padding: 0 0.2rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
