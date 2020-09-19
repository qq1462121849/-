<template>
  <div id="task">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <div class="search">
        <i class="iconfont1"></i>
        <input type="text" v-model="searchText" placeholder="请输入搜索内容"/>
        <div class="search_btn" @click="toSearch">搜索</div>
      </div>
    </div>
    <!-- <div class="header_banner" :style="{paddingTop: statusH +0.88+'rem'}"></div> -->
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="task_pos" id="task_pos">
        <mescroll-vue ref="mescroll" id="pj_pos" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="page_cont">
            <div class="header_task">
              <img :src="taskInfo.avatar" alt="">
              <div class="cont">
                <p class="text1">{{taskInfo.mobile}}</p>
                <p class="text2">
                  <span v-if="!taskInfo.agent.status">普通会员 - 邀请好友拼单收益：</span>
                  <span v-if="taskInfo.agent.status">{{taskInfo.agent.title}} - 邀请好友拼单收益：</span>
                  <span class="text3">{{taskInfo.agent.percent}}%</span>
                </p>
              </div>
            </div>
            <div class="ps_wrap">
              <div>
                <p @click="showPinData(0)">累计邀请拼单数</p>
                <p @click="showPinData(1)">今日邀请拼单数</p>
              </div>
              <div class="text1">
                <p>{{taskInfo.nums1}}单</p>
                <p>{{taskInfo.nums2}}单</p>
              </div>
              <div>
                <p>
                  <span>总累计收益：</span>
                  <span class="text2">{{taskInfo.price1}}元</span>
                </p>
                <p>
                  <span>今日累计收益：</span>
                  <span class="text2">{{taskInfo.price2}}元</span>
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
            <!-- <div class="limit_active">
              <div class="text1">限时活动</div>
              <div class="text2">></div>
              <div class="text2">今日邀请拼单满10单当日收益翻倍&nbsp;</div>
            </div>
            <div class="ranking" @click="jumpTo('leaderboard')">
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
              <tab default-color="#999" active-color="#C93FCB" :line-width="4" custom-bar-width="100px" bar-active-color="linear-gradient(133deg,rgba(151,70,212,1),rgba(114,62,229,1))">
                <tab-item :selected="nowIndex === 1" @on-item-click="chooseType(1)">全部任务</tab-item>
                <tab-item :selected="nowIndex === 2" @on-item-click="chooseType(2)">成功拼单</tab-item>
              </tab>
            </div>
            <div class="cont1" v-if="nowIndex === 1">
              <div class="info_li" v-for="(item,index) in allData" :key="index">
                <div class="title">
                  <img :src="item.avatar" alt="">
                  <span class="text1">{{item.mobile}}的拼单</span>
                  <span class="text2">{{percent}}%</span>
                  <span class="text3">分享拼单为你带来收益：</span>
                </div>
                <div class="goods">
                  <img :src="item.thumb | addUrlHeader" alt="">
                  <div class="rg">
                    <div class="title1">{{item.goodsName}}</div>
                    <div class="price">
                      <span>¥{{item.goodsPrice}}</span>
                      <span @click="toSeeAll(item.ptid,item.payPrice)">查看全部商品</span>
                    </div>
                  </div>
                </div>
                <div class="btn" @click="shareTask(item)">
                  <img src="../../assets/img/task/share.png" alt="">
                  <span>去邀请好友拼单赚{{percent}}%佣金</span>
                </div>
              </div>
            </div>
            <div class="cont2" v-if="nowIndex === 2">
              <div class="info_li" v-for="(item,index) in successData" :key="index">
                <div class="title">
                  <img :src="item.avatar" alt="">
                  <div class="right_title">
                    <div class="text1">
                      <span>{{item.mobile}}</span>
                      <span>参与下方拼团</span>
                    </div>
                    <div class="text2">
                      <div class="text3">付款￥{{item.payPrice}}元</div>
                      <div class="text5" v-if="item.rebateInfo&&item.rebateInfo.price">￥{{item.rebateInfo.price}}</div>
                      <div class="text4" v-if="item.rebateInfo&&item.rebateInfo.price">为你带来收益</div>
                    </div>
                  </div>
                </div>
                <div class="content">
                  <div class="cont1">
                    <div class="text1">{{item.spellInfo.mobile}}的拼单</div>
                    <div class="text3">赚{{percent}}%</div>
                    <div class="text2">拼团码：{{item.ptid}}</div>
                  </div>
                  <div class="cont2">
                    <div class="img_wrap">
                      <img :src="item.thumb | addUrlHeader" alt="">
                    </div>
                    <div class="cont_rg">
                      <div class="text1">{{item.goodsName}}</div>
                      <div class="text2">
                        <span class="text3">￥</span>
                        <span class="text4">{{item.goodsPrice}}</span>
                        <span class="text5" @click="toSeeAll(item.id,item.payPrice)">查看全部商品</span>
                      </div>
                    </div>
                  </div>
                  <div class="cont3">
                    <span class="text1" v-if="item.rebateInfo&&item.rebateInfo.price">为你带来收益</span>
                    <span class="text2" v-if="item.rebateInfo&&item.rebateInfo.price">{{item.rebateInfo.price}}元</span>
                    <div class="btn" @click="shareTask(item)" v-if="item.spellInfo.isFinished!=1">
                      <img src="../../assets/img/task/share.png" alt="">
                      <span>继续赚{{percent}}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="empty_task"></div>
        </mescroll-vue>
      </div>
    </div>
    <!-- <div>
      <div class="proxy" @click="jumpTo('upgradeAgent')">
        <img src="../../assets/img/task/proxy.png" alt="">
      </div>
    </div>
    <div>
      <div class="back_top" @click="backTop">
        <img src="../../assets/img/task/back_top.png" alt="">
      </div>
    </div> -->
    <xuanfu :size="size" :position="position1" :name="name1" v-if="!taskInfo.agent.status">
      <div class="proxy" @click="jumpTo('upgradeAgent')">
        <img src="../../assets/img/task/proxy.png" alt="">
      </div>
    </xuanfu>
    <xuanfu :size="size" :position="position2" :name="name2">
      <div class="back_top" @click="backTop">
        <img src="../../assets/img/task/back_top.png" alt="">
      </div>
    </xuanfu>
    <!-- 累计成交订单弹窗 --><!-- 今日成交订单弹窗 -->
    <x-dialog
      v-model="cumulative"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="cumulative">
        <div class="cum_main">
          <div class="cum_main_up">
            <mescroll-vue ref="mescroll1" :down="mescrollDown1" :up="mescrollUp1" @init="mescrollInit1">
              <div v-for="(item,index) in pinDataList" :key="index">
                <div class="cum_main_up_tit">
                  <div class="cum_main_up_tit_img"><img :src="item.avatar" alt=""></div>
                  <div class="cum_main_up_tit_info">
                    <div class="cum_main_up_tit_phone">{{item.mobile}}</div>
                    <div class="cum_main_up_tit_allprice">
                      <span class="cum_main_up_tit_allprice_all">商品总计：</span>
                      <span class="cum_main_up_tit_allprice_price">¥{{item.payPrice}}元</span>
                    </div>
                  </div>
                </div>
                <div class="cum_up_list">
                  <div class="cum_up_card" v-for="(itm,idx) in item.goodsList" :key="idx">
                    <div class="cum_up_card_img"><img :src="itm.image | addUrlHeader" alt=""></div>
                    <div class="cum_up_card_info">
                      <div class="cum_up_card_tit">{{itm.goodsName}}</div>
                      <div class="cum_up_card_allprice">
                        <span>￥</span><p>{{itm.price}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="empty_task_pin"></div>
            </mescroll-vue>
          </div>
          <div class="cumulative_close" @click="hidePinData"><img src="../../assets/img/task/cumulative_colse.png" alt=""></div>
        </div>
      </div>
    </x-dialog>
    <!-- 浏览商品弹窗(待支付，拼团中，拼团成功) --><!-- 申请退款(待收货，待评价) -->
    <x-dialog
      v-model="browseshop"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="browseshop_main">
        <div class="browseshop_a">
          <div class="drawback_money">总金额：￥{{allPrice}}</div>
          <div class="drawback_xunhuan_list">
            <div class="drawback_card" v-for="(item,index) in allGoodList" :key="index">
              <div class="drawback_card_img">
                <img :src="item.image | addUrlHeader" alt="">
              </div>
              <div class="drawback_card_list">
                <span class="drawback_card_list_tit">{{item.goodsName}}</span>
                <span class="drawback_card_list_specs">{{item.skuName}}</span>
                <div class="drawback_card_list_price">
                  <span class="drawback_card_list_price_left">￥{{item.price}}</span>
                  <!-- <div class="drawback_card_list_but" @click="jumpTo('refund')">申请退换货</div> -->
                  <!-- <div class="drawback_card_list_but" @click="jumpTo('refund')">退换货中</div>
                  <div class="drawback_card_list_but" @click="jumpTo('refund')">已退换货</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="browseshop_b" @click="browseshop=false">
          <img src="../../assets/img/home/cancel.png" alt="">
          </div>
      </div>
    </x-dialog>
    <!-- 分享 -->
    <div class="share_to" v-if="showShare">
      <div class="weui-mask"></div>
      <div class="classBox">
        <div>
          <img src="../../assets/img/home/share_wechat.png" alt @click="toShare(1)" />
          <p>微信</p>
        </div>
        <div>
          <img src="../../assets/img/home/share_qq.png" alt @click="toShare(2)" />
          <p>QQ</p>
        </div>
        <div>
          <img src="../../assets/img/home/copy_link.png" alt @click="copyLink" />
          <p>复制链接</p>
        </div>
      </div>
      <div class="download_img">
        <img class="good_img" :src="shareImg" alt="">
        <!-- <div class="title">{{shareTitle}}</div>
        <div class="price">{{sharePrice}}</div> -->
        <img class="pos_img" src="../../assets/img/home/dowload.png" alt="" @click="dowloadImg">
      </div>
      <div class="bt_btn" @click="showShare = false">取消</div>
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem,} from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
import xuanfu from '@/components/xuanfu'
export default {
  name: "lockup",
  components: {
    XDialog,
    Tab,
    TabItem,
    MescrollVue,
    xuanfu
  },
  data() {
    return {
      size: 0,     //尺寸
      cumulative: false,
      close_cumulative: false,
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
        // htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: "empty_task",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      taskInfo:null,
      percent:'',
      rules:'',
      allData:[],
      successData:[],
      browseshop:false,
      affirmgoods: false,
      buyback: false,
      showShare:false,
      shareImg:'',
      shareTitle:'',
      sharePrice:'',
      sharePtid:'',
      shareUrl:'',
      allGoodList:null,
      allPrice:'',
      pinDayType:0,
      mescroll1: null,
      mescrollDown1: {
        auto: false,
        callback: this.refresh1
      },
      mescrollUp1: {
        callback: this.upCallback1,
        page: {
          num: 0
        },
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        // htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: "empty_task_pin",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      pinDataList:[],
      position1:{ top: "9rem", left: "6.1rem"},
      position2:{ top: "11rem", left: "6.5rem"},
      name1:'daili',
      name2:'back',
      searchText:''
    };
  },
  methods: {
    //搜索
    toSearch(){
      if(this.searchText){
        this.$router.push({
          name:'search',
          query:{
            keyword:this.searchText
          }
        })
      }else{
        this.$vux.toast.text('请输入搜索内容');
      }
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {
      if(this.nowIndex==1){
        this.$http
        .post("/task/shareOrder", { page: page.num })
        .then(response => {
          let arr = response.data.list;
          if (page.num === 1) this.allData = [];
          this.allData = this.allData.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.allData.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
      }else{
        this.$http
        .post("/task/pingOrder", { page: page.num })
        .then(response => {
          let arr = response.data.list;
          if (page.num === 1) this.successData = [];
          this.successData = this.successData.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.successData.length);
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
    //获取任务赚信息
    getTaskInfo(){
      this.$http
        .post(
          "/task/index",
        )
        .then(res => {
          if(res.code == 1){
            this.taskInfo = res.data
            this.percent = res.data.percent
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
          {type:7}
        )
        .then(res => {
          if(res.code == 1){
            this.rules = res.data.info
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //分享
    shareTask(obj){
      this.shareTitle = obj.goodsName
      this.sharePrice = obj.goodsPrice
      this.$http
        .post(
          "/task/shareGoods",
          {ptid:obj.ptid}
        )
        .then(res => {
          if(res.code == 1){
            this.showShare =true
            this.shareImg = res.data.thumb
            this.shareUrl = res.data.url
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //下载
    dowloadImg(){
      let format = "share" + new Date().getTime() + ".jpg";
      api.download({
        url: this.shareImg,
        savePath: 'fs://' + format,
        report: true,
        cache: true,
        allowResume: true
      }, function(ret, err) {
        if (ret.state == 1) {
          this.$vux.toast.text('下载成功');
        } else {
          this.$vux.toast.text('下载失败');
        }
      });
    },
    //复制链接
    copyLink(){
      this.copyTextShare(this.shareUrl)
    },
    //去分享
    toShare(type) {
      let that = this;
      if(type == 1){
        that.$vux.loading.show({
          text: "加载中"
        });
        let format = "share" + new Date().getTime() + ".jpg";
        var way = "session";
        api.download(
          {
            url: that.shareImg,
            savePath: "fs://" + format,
            encode: false,
            report: false,
            cache: false,
            allowResume: true
          },
          function(ret, err) {
            that.$vux.loading.hide();
            let wx = api.require("wxPlus");
            wx.shareImage(
              {
                scene: way,
                contentUrl: "fs://" + format
              },
              function(ret, err) {
                if (ret.status) {
                  that.receive(type);
                } else {
                  that.$vux.toast.text("分享失败");
                }
              }
            );
            var systemType = api.systemType;
            if(systemType == "ios"){
              // that.receive(type);
            }
          }
        );
      }else{
        that.$vux.loading.show({
          text: "加载中"
        });
        let format = "share" + new Date().getTime() + ".jpg";
        var way = "QFriend";
        api.download(
          {
            url: that.shareImg,
            savePath: "fs://" + format,
            encode: false,
            report: false,
            cache: false,
            allowResume: true
          },
          function(ret, err) {
            that.$vux.loading.hide();
            let qq = api.require('QQPlus');
            qq.shareImage(
              {
                type : way,
                imgPath: "fs://" + format,
              },
              function(ret, err) {
                if (ret.status) {
                  that.receive(type);
                } else {
                  that.$vux.toast.text("分享失败");
                }
              }
            );
            var systemType = api.systemType;
            if(systemType == "ios"){
              // that.receive(type);
            }
          }
        );
      }
    },
    //查看全部商品
    toSeeAll(id,allPrice){
      this.allPrice = allPrice
      this.$http
        .post(
          "/task/getMoreGoods",
          {ptid:id}
        )
        .then(res => {
          if(res.code == 1){
            this.browseshop = true
            this.allGoodList = res.data.list
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    showPinData(day){
      this.cumulative = true
      this.pinDayType = day
      this.refresh1()
    },
    hidePinData(){
      this.cumulative = false
      this.pinDataList = []
    },
    mescrollInit1 (mescroll) {
      this.mescroll1 = mescroll
    },
    refresh1: function() {
      this.mescrollUp1.page.num = 1;
      this.upCallback1(this.mescrollUp1.page, this.mescroll1);
    },
    upCallback1 (page, mescroll) {
      this.$http
        .post("/task/inviteOrder", { day:this.pinDayType,page: page.num })
        .then(response => {
          let arr = response.data.list;
          if (page.num === 1) this.pinDataList = [];
          this.pinDataList = this.pinDataList.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.pinDataList.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
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
#task{
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
    background: linear-gradient(90deg,rgba(201,63,203,1) 0%,rgba(119,47,239,1) 100%);
    .search {
      width: 6.9rem;
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
        margin-left: 0.3rem;
      }
      input {
        width: 5.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        border: none;
        background: #F5F5F5;
      }
      .search_btn{
        width: 1.26rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        color: #fff;
        background: linear-gradient(-90deg,rgba(201,63,203,1) 0%,rgba(119,49,239,1) 100%);
        border-radius: 0.3rem;
      }
    }
  }
  .header_banner{
    width: 100%;
    height: 2.52rem;
    background: linear-gradient(90deg,rgba(201,63,203,1) 0%,rgba(119,47,239,1) 100%);
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
      }
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
            font-weight: 600;
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
        top: 2rem;
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
        margin-top: 1.7rem;
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
            img{
              width: 0.5rem;
              height: 0.5rem;
              display: block;
              float: left;
              margin-top: 0.25rem;
              border-radius: 50%;
              background-color: #dddddd;
            }
            .text1{
              font-size: 0.24rem;
              float: left;
              margin-left: 0.1rem;
            }
            .text2{
              font-size: 0.24rem;
              float: right;
              color: #F20227;
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
                width: 100%;
                margin-top: 0.5rem;
                overflow: hidden;
                span:first-child{
                  font-size: 0.24rem;
                  color: #F20227;
                  float: left;
                }
                span:last-child{
                  float: right;
                  font-size: 0.2rem;
                  font-weight: 400;
                  color: #666666;
                }
              }
            }
          }
          .btn{
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            overflow: hidden;
            font-size: 0.3rem;
            color: #FE1A52;
            img{
              width: 0.29rem;
              height: 0.29rem;
              display: block;
              float: left;
              margin-top: 0.35rem;
              margin-left: 1.2rem;
            }
            span{
              float: left;
              margin-left: 0.1rem;
            }
          }
        }
      }
      .cont2{
        width: 100%;
        .info_li{
          width: 6.9rem;
          height: 5.32rem;
          margin: 0.2rem auto;
          border-radius: 0.2rem;
          background-color: #fff;
          .title{
            width: 100%;
            height: 1.6rem;
            overflow: hidden;
            border-bottom: 1px solid #F3F3F3;
            padding: 0 0.2rem;
            box-sizing: border-box;
            img{
              width: 1.04rem;
              height: 1.04rem;
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
                span:first-child{
                  font-size: 0.36rem;
                  font-weight: 600;
                }
                span:last-child{
                  font-size: 0.24rem;
                  color: #999999;
                  margin-left: 0.1rem;
                }
              }
              .text2{
                height: 0.6rem;
                line-height: 0.6rem;
                overflow: hidden;
                .text3{
                  float: left;
                  font-size: 0.24rem;
                  color: #999999;
                }
                .text4{
                  float: right;
                  font-size: 0.24rem;
                  color: #999999;
                }
                .text5{
                  float: right;
                  font-size: 0.36rem;
                  font-weight: 600;
                  color: #FD1951;
                }
              }
            }
          }
          .content{
            width: 100%;
            padding: 0 0.2rem;
            box-sizing: border-box;
            .cont1{
              width: 100%;
              height: 1rem;
              line-height: 1rem;
              font-size: 0.24rem;
              overflow: hidden;
              .text1{
                float: left;
              }
              .text2{
                float: right;
              }
              .text3{
                float: right;
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.26rem;
                border: 1px solid #FD1951;
                color: #FD1951;
                padding: 0 0.2rem;
                border-radius: 0.1rem;
                margin-top: 0.3rem;
                margin-left: 0.2rem;
              }
            }
            .cont2{
              width: 100%;
              overflow: hidden;
              .img_wrap{
                width: 1.4rem;
                height: 1.4rem;
                float: left;
                background-color: #dddddd;
                img{
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
              .cont_rg{
                width: calc(100% - 1.6rem);
                margin-left: 0.2rem;
                overflow: hidden;
                float: left;
                .text1{
                  width: 100%;
                  // height: 0.6rem;
                  // line-height: 0.6rem;
                  font-size: 0.24rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .text2{
                  width: 100%;
                  height: 0.6rem;
                  line-height: 0.6rem;
                  overflow: hidden;
                  .text3{
                    font-size: 0.24rem;
                    float: left;
                  }
                  .text4{
                    font-size: 0.36rem;
                    font-weight: 600;
                    float: left;
                  }
                  .text5{
                    font-size: 0.24rem;
                    color: #666666;
                    float: right;
                  }
                }
              }
            }
            .cont3{
              width: 6.5rem;
              padding-top: 0.2rem;
              margin-top: 0.2rem;
              overflow: hidden;
              .text1{
                font-size: 0.3rem;
                color: #343434;
                float: left;
              }
              .text2{
                font-size: 0.3rem;
                color: #FE1A52;
                float: left;
                margin-left: 0.2rem;
              }
              .btn{
                float: right;
                width: 2.34rem;
                height: 0.5rem;
                overflow: hidden;
                font-size: 0.3rem;
                color: #FE1A52;
                border: 1px solid #FE1A52;
                border-radius: 0.2rem;
                img{
                  width: 0.29rem;
                  height: 0.29rem;
                  display: block;
                  float: left;
                  margin-top: 0.1rem;
                  margin-left: 0.25rem;
                }
                span{
                  float: left;
                  margin-left: 0.1rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .cumulative{
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .cum_main{
      width: 6.9rem;
      height: 10.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .cum_main_up{
        width: 6.9rem;
        height: 9rem;
        background: #ffffff;
        border-radius: 0.1rem;
        .cum_main_up_tit{
          height: 1.04rem;
          padding: 0.3rem 0.2rem 0.2rem 0.2rem;
          border-bottom: 1px solid #F4F4F4;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .cum_main_up_tit_img{
            width: 1.04rem;
            height: 1.04rem;
            border-radius: 0.5rem;
            background: #F4F4F4;
          }
          .cum_main_up_tit_info{
            height: 1rem;
            padding-left: 0.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            .cum_main_up_tit_phone{
              font-size: 0.36rem;
              font-weight: 600;
              color: #000000;
            }
            .cum_main_up_tit_allprice{
                .cum_main_up_tit_allprice_all{
                  font-size: 0.24rem;
                  color: #333333;
                }
                .cum_main_up_tit_allprice_price{
                  font-size: 0.3rem;
                  font-weight: 500;
                  color: #FE1951;
                }
              }
          }
        }
        .cum_up_list{
          // height: 7.46rem;
          position: relative;
          overflow-x: hidden;
          // overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          .cum_up_card{
            height: 1.2rem;
            padding: 0.3rem 0.2rem;
            margin: 0 0.28rem;
            border-top: 1px solid #E5E5E5;
            display: flex;
            flex-direction: row;
            .cum_up_card_img{
              width: 1.2rem;
              height: 1.2rem;
              background-size: 100% auto;
              border-radius: 0.1rem;
              // border-bottom: 1px solid #F4F4F4;
            }
            .cum_up_card_info{
              height: 1rem;
              padding-left: 0.2rem;
              margin: 0.1rem 0;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-start;
              color: #000000;
              .cum_up_card_tit{
                font-size: 0.24rem;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .cum_up_card_allprice{
                span{
                  font-size: 0.24rem;
                  display: inline-block;
                }
                p{
                  font-size: 0.36rem;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
      .cumulative_close{
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
  .browseshop_main{
    height: 100%;
    position: relative;
    .browseshop_a{
      width: 6.6rem;
      height: 9.8rem;
      top: 1.6rem;
      left: 0.44rem;
      background: #ffffff;
      border-radius: 0.1rem;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .drawback_money{
        height: 1.2rem;
        font-size: 0.36rem;
        font-weight: 400;
        color: #000000;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .drawback_xunhuan_list{
        height: 8.4rem;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .drawback_card{
          height: 2rem;
          padding: 0.4rem 0 0 0;
          margin: 0 0.28rem;
          border-top: 1px solid #E5E5E5;
          display: flex;
          flex-direction: row;
          .drawback_card_img{
            width: 1.5rem;
            height: 1.5rem;
            background: coral;
            background-size: 100% auto;
          }
          .drawback_card_list{
            width: 4.2rem;
            padding-left: 0.24rem;
            display: inline-block;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            text-align: left;
            color: #333333;
            .drawback_card_list_tit{
              width: 4.2rem;
              font-size: 0.26rem;
              font-weight: 400;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .drawback_card_list_specs{
              width: 4.2rem;
              color: #999999;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .drawback_card_list_price{
              width: 4.2rem;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              .drawback_card_list_price_left{
                font-size: 0.26rem;
                font-size: 400;
              }
              .drawback_card_list_but{
                width: 1.4rem;
                height: 0.48rem;
                margin-top: 0.2rem;
                border-radius: 0.26rem;
                border: 1px solid #CE372E;
                font-size: 0.22rem;
                color: #CE372E;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }
    .browseshop_b{
      height: 0.62rem;
      width: 0.62rem;
      position: relative;
      bottom: -2.08rem;
      left: 3.4rem;
      img{
        width: 0.62rem;
        height: 0.62rem;
      }
    }
  }
  .share_to {
    background: #fff;
    position: relative;
    width: 100%;
    .classBox {
      border-top: 1px solid #f9f6f6;
      border-bottom: 1px solid #f9f6f6;
      z-index: 100000;
      position: fixed;
      bottom: 0.97rem;
      height: 2rem;
      width: 7.5rem;
      display: flex;
      background: #F2F2F2;
      border-radius: 0.2rem 0.2rem 0 0;
      padding-top: 0.5rem;
      div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 0.9rem;
          height: 0.9rem;
        }
        p {
          margin-top: 0.2rem;
          color: #666;
          font-size: 0.26rem;
        }
      }
    }
    .bt_btn{
      width: 100%;
      height: 0.97rem;
      line-height: 0.97rem;
      text-align: center;
      font-size: 0.31rem;
      color: #666666;
      z-index: 100000;
      position: fixed;
      bottom: 0;
      background: #fff;
    }
    .download_img{
      width: 4rem;
      height: 6.7rem;
      position: fixed;
      left: 1.8rem;
      bottom: 3.2rem;
      z-index: 100000;
      border-radius: 0.2rem;
      background-color: #ffffff;
      .good_img{
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 0.2rem 0.2rem 0 0;
      }
      .title{
        width: 100%;
        font-size: 0.24rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 0 0.2rem;
        box-sizing: border-box;
      }
      .price{
        width: 100%;
        font-size: 0.24rem;
        color: #F20227;
        padding: 0 0.2rem;
        box-sizing: border-box;
      }
      .pos_img{
        width: 0.81rem;
        height: 0.52rem;
        display: block;
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
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
