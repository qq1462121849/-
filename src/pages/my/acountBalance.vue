<template>
  <div id="acount">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">账户余额</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <div class="banner_wrap">
        <div class="banner">
          <p class="text1">账户余额（元）</p>
          <p class="text2">{{money}}</p>
        </div>
      </div>
      <div class="tabBox">
        <tab default-color="#999" active-color="#999" :line-width="4" custom-bar-width="60px" bar-active-color="linear-gradient(133deg,rgba(151,70,212,1),rgba(114,62,229,1))">
          <tab-item :selected="nowIndex === 1" @on-item-click="chooseType(1)">全部明细</tab-item>
          <tab-item :selected="nowIndex === 2" @on-item-click="chooseType(2)">收益明细</tab-item>
          <tab-item :selected="nowIndex === 3" @on-item-click="chooseType(3)">支出明细</tab-item>
          <tab-item :selected="nowIndex === 4" @on-item-click="chooseType(4)">提现明细</tab-item>
        </tab>
      </div>
      <div class="mescroll_box">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="sy_wrap" v-if="nowIndex==1">
            <div class="info_li" v-for="(item,index) in syDataList" :key="index">
              <div class="info_li1">
                <div class="title">
                  <span class="text">{{typeData[item.type]}}</span>
                  <span class="time">{{item.createtime | formatTimer}}</span>
                </div>
                <div class="content1">
                  <span class="text1">{{item.orderId}}</span>
                  <span class="text3">¥{{item.money}}</span>
                  <span class="text2">奖励：</span>
                </div>
              </div>
            </div>
          </div> 
          <div class="sy_wrap" v-if="nowIndex==2">
            <div class="info_li" v-for="(item,index) in syDataList" :key="index">
              <div class="info_li1" v-if="item.type!=6 && item.type!=7">
                <div class="title">
                  <img :src="item.info.avatar" alt="">
                  <span class="text">{{typeData[item.type]}}</span>
                  <span class="time">{{item.createtime | formatTimer}}</span>
                </div>
                <div class="content1">
                  <span class="text1">{{item.orderId}}</span>
                  <span class="text3">¥{{item.money}}</span>
                  <span class="text2">奖励：</span>
                </div>
              </div>
              <div class="info_li2" v-if="item.type==6 || item.type==7">
                <div class="title">
                  <span class="text">{{typeData[item.type]}}</span>
                  <img :src="item.info.avatar" alt="">
                  <span class="name">{{item.info.mobile}} 完成任务拼单</span>
                  <span class="time">{{item.createtime | formatTimer}}</span>
                </div>
                <div class="content">
                  <img :src="item.info.thumb | addUrlHeader" alt="">
                  <div class="cont_right">
                    <div class="title">{{item.info.goodsName}}</div>
                    <div class="rg_bt">
                      <span class="text1">¥{{item.info.goodsPrice}}</span>
                      <span class="text3">¥{{item.price}}</span>
                      <span class="text2">奖励：</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div class="sy_wrap" v-if="nowIndex==2||nowIndex==3">
            <div class="info_li" v-for="(item,index) in syDataList" :key="index">
              <div class="info_li1" v-if="item.type!=6 && item.type!=7">
                <div class="title">
                  <img :src="item.info.avatar" alt="">
                  <span class="text">{{typeData[item.type]}}</span>
                  <span class="time">{{item.createtime | formatTimer}}</span>
                </div>
                <div class="content1">
                  <span class="text1">{{item.orderId}}</span>
                  <span class="text3"><span v-if="nowIndex==2">¥</span>{{item.price}}</span>
                  <span class="text2" v-if="nowIndex==2">奖励：</span>
                </div>
              </div>
              <div class="info_li2" v-if="item.type==6 || item.type==7">
                <div class="title">
                  <span class="text">{{typeData[item.type]}}</span>
                  <img :src="item.info.avatar" alt="">
                  <span class="name">{{item.info.mobile}} 完成任务拼单</span>
                  <span class="time">{{item.createtime | formatTimer}}</span>
                </div>
                <div class="content">
                  <img :src="item.info.thumb | addUrlHeader" alt="">
                  <div class="cont_right">
                    <div class="title">{{item.info.goodsName}}</div>
                    <div class="rg_bt">
                      <span class="text1">¥{{item.info.goodsPrice}}</span>
                      <span class="text3"><span v-if="nowIndex==2">¥</span>{{item.price}}</span>
                      <span class="text2" v-if="nowIndex==2">奖励：</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div class="withdraw" v-if="nowIndex==4">
            <div class="info_li3" v-for="(item,index) in txDataList" :key="index">
              <div class="title">
                <span class="text">余额提现</span>
                <span class="time">{{txType[item.status]}}</span>
              </div>
              <div class="content">
                <div class="img_wrap" v-if="item.type=='bank'">
                  <img v-if="item.bankname=='中国银行'" src="../../assets/img/my/zgbank.png" alt="">
                  <img v-else-if="item.bankname=='农业银行'" src="../../assets/img/my/nongye.png" alt="">
                  <img v-else-if="item.bankname=='工商银行'" src="../../assets/img/my/gongshang.png" alt="">
                  <img v-else-if="item.bankname=='建设银行'" src="../../assets/img/my/jianshe.png" alt="">
                  <img v-else src="../../assets/img/my/dfbank.png" alt="">
                </div>
                <div class="img_wrap1" v-if="item.type=='alipay'">
                  <img src="../../assets/img/my/zfb.png" alt="">
                </div>
                <div class="cont">
                  <div class="text1" v-if="item.type=='alipay'">{{item.username}}  {{item.alipay}}</div>
                  <div class="text1" v-if="item.type=='bank'">{{item.bankname}}  {{item.bankno}}</div>
                  <div class="text2">
                    <!-- <span>奖励：</span> -->
                    <span>¥{{item.money}}</span>
                  </div>
                </div>
              </div>
              <div class="bt">{{item.createtime | formatTimer}}</div>
            </div>
          </div>
          <div id="empty_ac"></div>
        </mescroll-vue>
      </div> 
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem  } from "vux";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "acount",
  components: {
    XDialog,
    Tab,
    TabItem,
    MescrollVue,
  },
  data() {
    return {
      nowIndex:1,
      statusH:0,
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
        // noMoreSize: 5,
        empty: {
          warpId: "empty_ac",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      txDataList:[],//提现数据
      syDataList:[],//收支数据
      typeData:null,
      txType:null,
      money:0
    };
  },
  watch:{
    $route (to,from) {
      if(to.name=="acountBalance"){
        this.nowIndex = this.$route.query.type?Number(this.$route.query.type):1
        this.money = this.$route.query.money?this.$route.query.money:0
      }
    }
  },
  filters: {
    formatTimer: function(value) {
      let date = new Date(value*1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "." + MM + "." + d;
    }
  },
  methods: {
    chooseType(num){
      this.nowIndex = num
      this.refresh()
    },
    refresh() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      let that = this
      if(that.nowIndex==4){
        getTX(page, mescroll)
      }else if(that.nowIndex==1){
        getAllSY(page, mescroll)
      }else{
        getSY(page, mescroll,that.nowIndex)
      }
      function getTX(page, mescroll){
        that.$http
        .post(
          "/mc/withdrawList",
          {
            page: page.num,
          },
          true
        )
        .then(response => {
          let arr = response.data.list;
          that.txType = response.data.statusInfo
          if (page.num === 1) that.txDataList = [];
          that.txDataList = that.txDataList.concat(arr);
          that.$nextTick(() => {
            mescroll.endSuccess(that.txDataList.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
      }
      function getSY(page, mescroll,num){
        that.$http
        .post(
          '/mc/rebateList',
          {
            page: page.num,
            type:num-1
          },
          true
        )
        .then(response => {
          let arr = response.data.list;
          that.typeData = response.data.typeInfo
          that.money = response.data.money
          if (page.num === 1) that.syDataList = [];
          that.syDataList = that.syDataList.concat(arr);
          that.$nextTick(() => {
            mescroll.endSuccess(that.syDataList.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
      }  
      function getAllSY(page, mescroll){
        that.$http
        .post(
          '/mc/moneyList',
          {page: page.num},
          true
        )
        .then(response => {
          let arr = response.data.list;
          that.typeData = response.data.typeInfo
          that.money = response.data.money
          if (page.num === 1) that.syDataList = [];
          that.syDataList = that.syDataList.concat(arr);
          that.$nextTick(() => {
            mescroll.endSuccess(that.syDataList.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
      }  
    },
    
  },
  created() {
    this.nowIndex = this.$route.query.type?Number(this.$route.query.type):1
    this.money = this.$route.query.money?this.$route.query.money:0
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#acount {
  position: relative;
  height: 100%;
  overflow: hidden;
  /deep/ .mescroll-downwarp .downwarp-content {
    padding: 0;
    line-height: 70px;
    height: 70px;
  }
  /deep/ .mescroll-downwarp .downwarp-progress {
    border-color: #333333;
    border-bottom-color: transparent;
  }
  /deep/ .mescroll-downwarp .downwarp-tip {
    color: #333333;
  }
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
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
      font-weight: 700;
      margin: 0 auto;
    }
  }
  .page_wrap{
    position: absolute;
    bottom: 0;
    overflow-y: auto;
    width: 100%;
    .banner_wrap{
      width: 100%;
      height: 2.36rem;
      background-color: #fff;
      .banner{
        width: 6.94rem;
        height: 2.36rem;
        margin: 0 auto;
        background: linear-gradient(133deg,rgba(164,72,234,1),rgba(114,58,239,1));
        border-radius: 0.2rem;
        overflow: hidden;
        padding-left: 0.5rem;
        box-sizing: border-box;
        .text1{
          font-size: 0.26rem;
          font-weight:700;
          color:#f2f2f2;
          margin-top: 0.7rem;
        }
        .text2{
          font-size: 0.4rem;
          font-weight:700;
          color:#fff;
        }
      }
    }
    .tabBox {
      width: 100%;
    }
    .mescroll_box{
      width: 100%;
      height: calc(100% - 3.36rem);
      overflow: hidden;
      .sy_wrap{
        width: 100%;
        overflow: auto;
      }
    }
    .info_li{
      width: 100%;
      margin-bottom: 0.2rem;
      .info_li1{
        width: 100%;
        background-color: #fff;
        >.title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          padding: 0 0.3rem;
          box-sizing: border-box;
          border-bottom:1px solid #e5e5e5;
          img{
            float: left;
            width: 0.54rem;
            height: 0.54rem;
            border: 1px solid #dddddd;
            border-radius: 50%;
            margin-top: 0.1rem;
          }
          .text{
            float: left;
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(32,32,32,1);
            margin-left: 0.1rem;
          }
          .time{
            float: right;
            color: rgba(153,153,153,1);
          }
        }
        .content{
          width: 100%;
          height: 1.6rem;
          overflow: hidden;
          padding: 0 0.3rem;
          box-sizing: border-box;
          img{
            float: left;
            width: 1.1rem;
            height: 1.1rem;
            border: 1px solid #dddddd;
            margin-top: 0.3rem;
          }
          .cont_right{
            float: left;
            width: 5.5rem;
            height: 1.5rem;
            margin-left: 0.2rem;
            .title{
              width: 100%;
              height: 0.9rem;
              line-height: 0.4rem;
              font-size: 0.26rem;
              font-weight: 500;
              color: rgba(32,32,32,1);
              margin-top: 0.2rem;
            }
            .rg_bt{
              width: 100%;
              overflow: hidden;
              .text1{
                float: left;
                font-size: 0.26rem;
                font-weight: 500;
                color: rgba(153,153,153);
              }
              .text2{
                float: right;
                font-size: 0.26rem;
                font-weight: 500;
                color: rgba(32,32,32);
              }
              .text3{
                float: right;
                font-size: 0.36rem;
                font-weight: 600;
                color: rgba(224,46,36,1);
                margin-top: -0.1rem;
              }
            }
          }
        }
        .content1{
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          overflow: hidden;
          padding: 0 0.3rem;
          box-sizing: border-box;
          .text1{
            float: left;
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(153,153,153);
          }
          .text2{
            float: right;
            font-size: 0.26rem;
            font-weight: 500;
            color: rgba(32,32,32);
          }
          .text3{
            float: right;
            font-size: 0.36rem;
            font-weight: 600;
            color: rgba(224,46,36,1);
          }
        }
      }
      .info_li2{
        width: 100%;
        background-color: #fff;
        >.title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          padding: 0 0.3rem;
          box-sizing: border-box;
          border-bottom:1px solid #e5e5e5;
          img{
            float: left;
            width: 0.54rem;
            height: 0.54rem;
            border: 1px solid #dddddd;
            border-radius: 50%;
            margin-top: 0.1rem;
            margin-left: 0.1rem;
          }
          .text{
            float: left;
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(32,32,32,1);
          }
          .name{
            float: left;
            font-size: 0.24rem;
            font-weight: 500;
            color: rgba(32,32,32,1);
            margin-left: 0.1rem;
          }
          .time{
            float: right;
            color: rgba(153,153,153,1);
          }
        }
        .content{
          width: 100%;
          height: 1.6rem;
          overflow: hidden;
          padding: 0 0.3rem;
          box-sizing: border-box;
          img{
            float: left;
            width: 1.1rem;
            height: 1.1rem;
            border: 1px solid #dddddd;
            margin-top: 0.3rem;
          }
          .cont_right{
            float: left;
            width: 5.5rem;
            height: 1.5rem;
            margin-left: 0.2rem;
            .title{
              width: 100%;
              // height: 0.9rem;
              // line-height: 0.4rem;
              font-size: 0.26rem;
              font-weight: 500;
              color: rgba(32,32,32,1);
              margin-top: 0.2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .rg_bt{
              width: 100%;
              overflow: hidden;
              .text1{
                float: left;
                font-size: 0.26rem;
                font-weight: 500;
                color: rgba(153,153,153);
              }
              .text2{
                float: right;
                font-size: 0.26rem;
                font-weight: 500;
                color: rgba(32,32,32);
              }
              .text3{
                float: right;
                font-size: 0.36rem;
                font-weight: 600;
                color: rgba(224,46,36,1);
                margin-top: -0.1rem;
              }
            }
          }
        }
      }
    }
    .withdraw{
      width: 100%;
      margin-bottom: 0.2rem;
      .info_li3{
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 0.1rem;
        >.title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          padding: 0 0.3rem;
          box-sizing: border-box;
          border-bottom:1px solid #e5e5e5;
          .text{
            float: left;
            font-size: 0.25rem;
            font-weight: 500;
            color: rgba(32,32,32,1);
            margin-left: 0.1rem;
          }
          .time{
            float: right;
            color: #E83423;
          }
        }
        .content{
          width: 100%;
          height: 1rem;
          overflow: hidden;
          padding: 0 0.3rem;
          box-sizing: border-box;
          .img_wrap{
            float: left;
            width: 0.68rem;
            height: 0.68rem;
            border-radius: 50%;
            border: 1px solid #dddddd;
            margin-top: 0.2rem;
            img{
              width: 0.4rem;
              height: 0.4rem;
              display: block;
              margin: 0 auto;
              margin-top: 0.1rem;
            }
          }
          .img_wrap1{
            float: left;
            width: 0.68rem;
            height: 0.68rem;
            border-radius: 50%;
            border: 1px solid #dddddd;
            margin-top: 0.2rem;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .cont{
            width: calc(100% - 0.82rem);
            height: 0.8rem;
            line-height: 0.8rem;
            float: left;
            margin-left: 0.1rem;
            margin-top: 0.2rem;
            .text1{
              float: left;
              font-size: 0.26rem;
              color: rgba(31,31,31,1);
            }
            .text2{
              float: right;
              font-size: 0.26rem;
              color: rgba(31,31,31,1);
              span:last-child{
                font-size: 0.38rem;
                color: #DF2D23;
              }
            }
          }
        }
        .bt{
          width: 100%;
          padding: 0 0.3rem;
          box-sizing: border-box;
          text-align: right;
          font-size: 0.26rem;
          color: #999999;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
}
</style>
