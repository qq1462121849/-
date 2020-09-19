<template>
  <div id="myTeam">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH+0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">我的团队</div>
    </div>
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="task_pos" id="task_pos">
        <mescroll-vue id="pj_pos" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="page_cont">
            <div class="header_task">
              <img :src="teamInfo.avatar" alt="">
              <div class="cont">
                <p class="text1">{{teamInfo.mobile}}</p>
                <p class="text1">{{teamInfo.mobile}}</p>
                <p class="text2">
                  <span>{{teamInfo.agent.title}}    团队收益：</span>
                  <span class="text3">{{teamInfo.agent.percent}}%</span>
                </p>
              </div>
            </div>
            <div class="ps_wrap">
              <div>
                <p>团队总人数</p>
                <p>团队下单人数</p>
              </div>
              <div class="text1">
                <p>{{teamInfo.nums1}}人</p>
                <p>{{teamInfo.nums2}}人</p>
              </div>
              <!-- <div>
                <p>一级直邀人数</p>
                <p>一级下单人数</p>
              </div>
              <div class="text1">
                <p>{{teamInfo.nums3 || 0}}人</p>
                <p>{{teamInfo.nums4 || 0}}人</p>
              </div> -->
              <div>
                <p>
                  <span>总累计收益：</span>
                  <span class="text2">{{teamInfo.price1}} 元</span>
                </p>
                <p>
                  <span>今日累计收益：</span>
                  <span class="text2">{{teamInfo.price2}} 元</span>
                </p>
              </div>
            </div>
            <div class="rule">
              <div class="title">规则说明</div>
              <div class="cont" :class="showRuleStatus?'cont1':''">
                  <div class="text" v-html="rules"></div>
                </div>
              <div class="btn" @click="showRule" v-if="rules.length>138">
                <img src="../../assets/img/task/down_show.png" alt="">
              </div>
            </div>
            <!-- <div class="ranking" @click="jumpTo('leaderboard')">
              <img src="../../assets/img/task/ranking.png" alt="">
              <div class="text1">排行榜</div>
              <div class="text2">></div>
              <div class="text2">
                您目前排在 第
                <span>101</span>
                位&nbsp;
              </div>
            </div> -->
            <div class="tabBox" style="margin-top:0.2rem">
              <tab default-color="#999" active-color="#CA40CC" :line-width="2" custom-bar-width="100px" bar-active-color="#CA40CC">
                <tab-item :selected="nowIndex === 1" @on-item-click="chooseType(1)">团队成员</tab-item>
                <tab-item :selected="nowIndex === 2" @on-item-click="chooseType(2)">一级直邀成员</tab-item>
                <tab-item :selected="nowIndex === 3" @on-item-click="chooseType(3)">团队订单详情</tab-item>
              </tab>
            </div>
            <div class="cont1" v-if="nowIndex !== 3">
              <div class="info_li" v-for="(item,index) in teamList" :key="index">
                <!-- <div class="title">注册时间：</div> -->
                <div class="title1">
                  <img :src="item.avatar" alt="">
                  <div class="right_title">
                    <div class="text1">
                      <span>{{item.mobile}}</span>
                      <!-- <span>{{item.agentInfo.title}}</span> -->
                    </div>
                    <div class="text2">
                      <div class="text3">{{item.agentInfo.title}}</div>
                      <!-- <div class="text4">累计拼单数：<span class="text5">6</span></div> -->
                    </div>
                  </div>
                </div>
                <div class="title2">
                  <div>累计拼单数：<span class="text1">{{item.countNum}}</span></div>
                  <div>累计分成：<span class="text1">{{item.countPrice}}元</span></div>
                </div>
              </div>
            </div>
            <div class="cont2" v-if="nowIndex === 3">
              <div class="info_li" v-for="(item,index) in teamDetailList" :key="index">
                <div class="title">
                  <span class="text1">用户{{item.mobile}}购买</span>
                  <span class="text3">{{item.createtime | formatTimer}}</span>
                </div>
                <div class="goods">
                  <img :src="item.thumb | addUrlHeader" alt="">
                  <div class="rg">
                    <div class="title1">{{item.goodsName}}</div>
                    <div class="price"><span>实付：</span>¥ {{item.goodsPrice}}</div>
                  </div>
                </div>
                <div class="btn">
                  <div>收益比例：<span>{{item.percent}}%</span></div>
                  <div>我的收益：<span>¥{{item.price}}</span></div>
                </div>
              </div>
            </div>
          </div>  
          <div id="empty_myTeam"></div>
        </mescroll-vue>
      </div>
    </div>
    <!-- <div>
      <div class="proxy" @click="jumpTo('upgradeAgent')">
        <img src="../../assets/img/task/proxy1.png" alt="">
      </div>
    </div>
    <div>
      <div class="back_top" @click="backTop">
        <img src="../../assets/img/task/back_top.png" alt="">
      </div>
    </div> -->
    <xuanfu :size="size" :position="position1" :name="name1">
      <div class="proxy" @click="jumpTo('upgradeAgent')">
        <img src="../../assets/img/task/proxy1.png" alt="">
      </div>
    </xuanfu>
    <xuanfu :size="size" :position="position2" :name="name2">
      <div class="back_top" @click="backTop">
        <img src="../../assets/img/task/back_top.png" alt="">
      </div>
    </xuanfu>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem,} from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
import xuanfu from '@/components/xuanfu'
export default {
  name: "myTeam",
  components: {
    XDialog,
    Tab,
    TabItem,
    MescrollVue,
    xuanfu
  },
  data() {
    return {
      nowIndex:1,
      navStatus:1,
      showRuleStatus:false,
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
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: "empty_myTeam",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      rules:'',
      teamInfo:null,
      teamList:[],
      teamDetailList:[],
      position1:{ top: "9rem", left: "6.3rem"},
      position2:{ top: "11rem", left: "6.5rem"},
      name1:'daili',
      name2:'back',
      size:''
    };
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
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {
      if(this.nowIndex!=3){
        this.$http
        .post("/task/teamList", { 
          page: page.num,
          level:this.nowIndex-1 
        })
        .then(response => {
          let arr = response.data.list;
          if (page.num === 1) this.teamList = [];
          this.teamList = this.teamList.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.teamList.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
      }else{
        this.$http
        .post("/task/teamOrder", { page: page.num })
        .then(response => {
          let arr = response.data.list;
          if (page.num === 1) this.teamDetailList = [];
          this.teamDetailList = this.teamDetailList.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.teamDetailList.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
      }
    },
    showRule(){
      this.showRuleStatus = !this.showRuleStatus
    },
    chooseType(num){
      this.nowIndex = num
      this.refresh()
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
    //获取团队信息
    getTaskInfo(){
      this.$http
        .post(
          "/task/teamInfo",
        )
        .then(res => {
          if(res.code == 1){
            this.teamInfo = res.data
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //获取规则
    getRule(){
      this.$http
        .post(
          "/auth/agreement",
          {type:9}
        )
        .then(res => {
          if(res.code == 1){
            this.rules = res.data.info
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    
  },
  created() {
    this.getTaskInfo()
    this.getRule()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.size = size;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#myTeam{
  position: relative;
  height: 100%;
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    overflow: hidden;
    height: 0.88rem;
    color: #ffffff;
    background: linear-gradient(90deg,rgba(201,63,203,1) 0%,rgba(119,47,239,1) 100%);
    .backBox {
      position: absolute;
      // top: 0.2rem;
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
    height: auto;
    position: absolute;
    bottom: 0;
    .task_pos{
      height: 100%;
      width: 100%;
      overflow: auto;
      .page_cont{
        position: relative;
        #pj_pos{
          position: relative;
        }
        .header_task{
          width: 100%;
          height: 2.52rem;
          overflow: hidden;
          background: linear-gradient(90deg,rgba(201,63,203,1) 0%,rgba(119,47,239,1) 100%);
          img{
            float: left;
            width: 1rem;
            height: 1rem;
            background-color: #dddddd;
            border-radius: 50%;
            margin-top: 0.2rem;
            margin-left: 0.3rem;
          }
          .cont{
            float: left;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
            .text1{
              font-size: 0.36rem;
              color: #fff;
            }
            .text2{
              span{
                font-size: 0.24rem;
                font-weight: 500;
                color: #fff;
              }
              .text3{
                font-size: 0.32rem;
              }
            }
          }
        }
        .ps_wrap{
          width: 6.9rem;
          height: 2rem;
          background-color: #fff;
          padding: 0.2rem 0;
          box-sizing: border-box;
          position: absolute;
          top: 2.2rem;
          left: 0.3rem;
          border-radius: 0.2rem;
          box-shadow:2px 2px 0px 0px #dddddd;
          div{
            width: 100%;
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.24rem;
            color:rgba(101,101,101,1);
            overflow: hidden;
            p{
              width: 50%;
              float: left;
              text-align: center;
            }
          }
          .text1{
            font-size: 0.36rem;
            font-weight: 600;
            color: #000;
          }
          .text2{
            font-size: 0.3rem;
            color: #000;
          }
        }
        .rule{
          width: 6.9rem;
          padding: 0.2rem 0.3rem;
          box-sizing: border-box;
          background-color: #fff;
          margin: 0 auto;
          margin-top: 1.9rem;
          border-radius: 0.2rem;
          background: url("../../assets/img/task/bg2.png") no-repeat;
          background-size: 100% 100%;
          .title{
            font-size: 0.3rem;
            font-weight: 600;
          }
          .cont{
            width: 100%;
            height: auto;
            max-height: 2.55rem;
            overflow: hidden;
            transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
            .text{
              font-size: 0.28rem;
              font-weight: 500;
              color:rgba(51,51,51,1);
            }
          }
          .cont1{
            max-height: 9999px;
            height: auto;
            overflow: auto;
            transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
            transition-delay: 0s;
          }
          .btn{
            width: 100%;
            overflow: hidden;
            img{
              width: 0.35rem;
              height: 0.28rem;
              display: block;
              margin: 0 auto;
              margin-top: 0.1rem;
            }
          }
        }
        .limit_active{
          width: 6.9rem;
          height: 0.88rem;
          line-height: 0.88rem;
          overflow: hidden;
          border: 1px solid #BF3DD1;
          margin: 0 auto;
          border-radius: 0.2rem;
          background-color: #fff;
          padding: 0 0.2rem;
          box-sizing: border-box;
          margin-top: 0.2rem;
          .text1{
            float: left;
            font-size: 0.3rem;
            font-weight: 600;
            color:rgba(251,129,159,1);
          }
          .text2{
            float: right;
            font-size: 0.24rem;
            font-weight: 600;
            color:rgba(251,129,159,1);
          }
        }
        .ranking{
          width: 6.9rem;
          height: 0.88rem;
          line-height: 0.88rem;
          overflow: hidden;
          margin: 0 auto;
          border-radius: 0.2rem;
          background-color: #fff;
          padding: 0 0.2rem;
          box-sizing: border-box;
          margin-top: 0.2rem;
          img{
            float: left;
            width: 0.52rem;
            height: 0.52rem;
            margin-top: 0.2rem;
            margin-right: 0.1rem;
          }
          .text1{
            float: left;
            font-size: 0.3rem;
            font-weight: 600;
          }
          .text2{
            float: right;
            font-size: 0.24rem;
            font-weight: 600;
            span{
              color: #8031EB;
            }
          }
          .text3{
            float: right;
            font-size: 0.24rem;
            font-weight: 600;
            color:rgba(53,53,53,1)
          }
        }
        .cont1{
          width: 6.9rem;
          margin: 0.2rem auto;
          border-radius: 0.2rem;
          background-color: #fff;
          padding: 0.2rem;
          box-sizing: border-box;
          .info_li{
            width: 100%;
            // height: 2.8rem;
            border-bottom: 1px solid #F3F3F3;
            .title{
              width: 100%;
              height: 0.6rem;
              line-height: 0.6rem;
              font-size: 0.24rem;
              color: #9A9A9A;
            }
            .title1{
              width: 100%;
              height: 1.6rem;
              overflow: hidden;
              img{
                width: 1rem;
                height: 1rem;
                float: left;
                border-radius: 50%;
                margin-top: 0.3rem;
                background-color: #dddddd;
              }
              .right_title{
                width: calc(100% - 1.24rem);
                float: left;
                margin-left: 0.2rem;
                overflow: hidden;
                .text1{
                  height: 0.6rem;
                  line-height: 0.6rem;
                  margin-top: 0.2rem;
                  overflow: hidden;
                  span:first-child{
                    font-size: 0.36rem;
                    font-weight: 600;
                    float: left;
                  }
                  // span:last-child{
                  //   font-size: 0.24rem;
                  //   color: #999999;
                  //   float: right;
                  // }
                }
                .text2{
                  height: 0.6rem;
                  line-height: 0.6rem;
                  overflow: hidden;
                  .text3{
                    width: 50%;
                    float: left;
                    font-size: 0.24rem;
                    color: #999999;
                  }
                  .text4{
                    width: 50%;
                    float: right;
                    font-size: 0.24rem;
                    color: #999999;
                  }
                  .text5{
                    font-size: 0.3rem;
                    font-weight: 600;
                    color: #FD1951;
                  }
                }
              }
            }
            .title2{
              width: 100%;
              overflow: hidden;
              div{
                width: 50%;
                float: left;
                font-size: 0.3rem;
                color: #9A9A9A;
                .text1{
                  color: #F20227;
                }
              }
            }
          }
          .info_li:last-child{
            border-bottom: none;
          }
        }
        .cont2{
          width: 100%;
          .info_li{
            width: 6.9rem;
            margin: 0.2rem auto;
            border-radius: 0.2rem;
            background-color: #fff;
            padding: 0 0.2rem;
            box-sizing: border-box;
            .title{
              width: 100%;
              height: 1rem;
              line-height: 1rem;
              overflow: hidden;
              .text1{
                font-size: 0.24rem;
                float: left;
                margin-left: 0.1rem;
              }
              .text3{
                font-size: 0.24rem;
                float: right;
                color: #666666;
              }
            }
            .goods{
              width: 100%;
              overflow: hidden;
              padding-bottom: 0.2rem;
              border-bottom: 1px solid #F4F4F4;
              img{
                width: 1.85rem;
                height: 1.85rem;
                display: block;
                float: left;
                background-color: #dddddd;
              }
              .rg{
                width: calc(100% - 1.95rem);
                margin-left: 0.1rem;
                float: left;
                .title1{
                  width: 100%;
                  font-size: 0.29rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .price{
                  font-size: 0.24rem;
                  color: #F20227;
                  margin-top: 0.5rem;
                  span{
                    color: #343434;
                  }
                }
              }
            }
            .btn{
              width: 100%;
              height: 1rem;
              line-height: 1rem;
              overflow: hidden;
              font-size: 0.24rem;
              color: #343434;
              div:first-child{
                float: left;
              }
              div:last-child{
                float: right;
              }
              span{
                color: #FE1A52;
              }
            }
          }
        }
      }
    }
  }
}
.proxy{
  width: 1.65rem;
  height: 1.65rem;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
.back_top{
  width: 0.8rem;
  height: 0.8rem;
  background-color: #fff;
  border-radius: 50%;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
