<template>
  <div id="pintuan">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <!-- <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a> -->
      <div class="title">我的拼单</div>
      <div class="news" @click="jumpTo('search')" :style="{top: statusH +0.2+'rem'}">
        <img class="xxicon" src="../../assets/img/home/search.png" alt />
      </div>
      <div class="bulletin">
        <img src="../../assets/img/home/pay/speaker.png" alt="">
        <span class="text">{{bulletinInfo.mobile}} {{bulletinInfo.createtime | formatTimer}}分钟前成功拼单{{bulletinInfo.price}}元商品</span>
      </div>
      <div class="tabBox">
        <tab default-color="#999" active-color="#D8180D" :line-width="2" custom-bar-width="40px" bar-active-color="#D8180D">
          <tab-item :selected="nowIndex == 1" @on-item-click="chooseType(1)">全部</tab-item>
          <tab-item :selected="nowIndex == 2" @on-item-click="chooseType(2)">进行中</tab-item>
          <tab-item :selected="nowIndex == 3" @on-item-click="chooseType(3)">已完成</tab-item>
        </tab>
      </div>
    </div>
    <div class="page_wrap" :style="{top: statusH+1.8+'rem'}">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="order_li">
          <div class="info_li" v-for="(item,index) in orderlist" :key="index">
            <div class="title">
              <span class="text1" v-if="item.isFinished==0">拼团中</span>
              <span class="text1" v-if="item.isFinished==1">拼团成功</span>
              <span class="text2">拼单编号：{{item.ptid}}</span>
            </div>
            <div class="content">
              <img :src="item.goodsInfo.thumb | addUrlHeader" alt="">
              <div class="cont_right1">
                <div class="title">{{item.goodsInfo.goodsName}}</div>
                <!-- <div class="rg_bt" v-if="item.isFinished">
                  一层
                </div> -->
                <div class="rg_bt1" v-if="!item.isFinished">
                  <span>￥</span>
                  <span>{{item.goodsInfo.goodsPrice}}</span>
                  <!-- <span>1356.00</span> -->
                  <span @click="toSeeAll(item.ptid,item.payPrice)">查看全部商品</span>
                </div>
              </div>
              <div class="cont_right2" v-if="item.isFinished">
                <div>¥{{item.goodsInfo.goodsPrice}}</div>
                <div>x1</div>
              </div>
            </div>
            <div class="content2">
              <div class="title" v-if="!item.isFinished">
                此团需要{{item.totalPrice}}元，已经完成{{(item.spellList.length*item.price).toFixed(2)}}元，还差
                <span>{{item.balance}}元</span>
                成团
              </div>
              <div class="title" v-if="item.isFinished">
                此团需要{{item.totalPrice}}元，已经完成
                <span>{{item.totalPrice}}元</span>
              </div>
              <div class="group_wrap">
                <div class="group_li" v-for="(itm,idx) in item.spellList" :key="idx">
                  <div class="img_wrap">
                    <img :src="itm.avatar" alt="">
                  </div>
                  <div class="tel_num" style="margin-top:0.1rem" v-if="item.isFinished">￥{{itm.price}}</div>
                  <div class="tel_num">{{itm.mobile}}</div>
                </div>
                <div class="group_li" v-if="!item.isFinished">
                  <div class="img_wrap">
                    <span>?</span>
                  </div>
                  <div class="tel_num" style="visibility: hidden;">122</div>
                </div>
              </div>
            </div>
            <div class="content1" v-if="item.isFinished">
              实付:¥11.49
              <span>(免运费)</span>
            </div>
            <!-- <div class="bt" v-if="item.isFinished">
              <div class="btn1">回购商品-到账￥869.00</div>
              <div @click="sendGoods(item)">确认发货</div>
              <div @click="showRule">回购规则</div>
            </div> -->
            <div class="bt1" v-if="!item.isFinished" @click="shareTask(item)">
              <div class="btn">邀请好友拼单</div>
            </div>
          </div>
        </div>
        <div class="good_list" v-if="nowIndex==2&&orderlist.length">
          <div class="title">
            <div class="text">为你推荐</div>
            <div class="bt_line"></div>
          </div>
          <goods-list v-if="nowIndex==2" :list="goodsList" :len="goodsList.length"></goods-list>
        </div>
        <div id="empty_group"></div>
      </mescroll-vue>
    </div>
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
                <img :src="item.image" alt="">
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
  </div>
</template>

<script>
import { XDialog, Tab, TabItem, TransferDom, Popup } from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
import GoodsList from '@/components/homeGoods'
export default {
  name: "pintuan",
  components: {
    XDialog,
    Tab,
    TabItem,
    MescrollVue,
    Popup,
    GoodsList,
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      nowIndex:1,
      statusH:0,
      orderlist:[],
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
          warpId: "empty_group",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div><div>没找到订单？试试查看全部或更换登录方式</div>"
        },
      },
      showPayOrder:false,
      isShowReason:false,
      reasonStatus:1,
      showRules:false,
      rules:'',
      goodsList:[],
      showShare:false,
      shareImg:'',
      shareTitle:'',
      sharePrice:'',
      shareUrl:'',
      browseshop:false,
      allPrice:'',
      allGoodList:[],
      bulletin:[],
      bulletinInfo:{
        mobile:'',
        createtime:new Date(),
        price:''
      },
      count:0
    };
  },
  watch:{
    $route (to,from) {
      if(to.name=="order"){
        this.nowIndex = this.$route.query.order_num?Number(this.$route.query.order_num):1
        this.refresh()
      }
    }
  },
  filters: {
    formatTimer: function(value) {
      let date = new Date(value*1000);
      // let y = date.getFullYear();
      // let MM = date.getMonth() + 1;
      // MM = MM < 10 ? "0" + MM : MM;
      // let d = date.getDate();
      // d = d < 10 ? "0" + d : d;
      // let h = date.getHours();
      // h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      // let s = date.getSeconds();
      // s = s < 10 ? "0" + s : s;
      return m;
    }
  },
  methods: {
    chooseType(num){
      this.nowIndex = num
      if(num==2){
        this.getRecommend()
      }else{
        this.goodsList = []
      }
      this.refresh()
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {
      this.$http
        .post("/spell/spellList", { 
          page: page.num,
          status:this.nowIndex-1,
          ptid:''
        })
        .then(response => {
          let arr = response.data.list;
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
    cancelOrder(){
      if(this.nowIndex==2){
        this.showPayOrder = true
      }
    },
    giveUpOrder(){
      this.showPayOrder = false
      this.isShowReason = true
    },
    chooseReason(num){
      this.reasonStatus = num
    },
    submit(){
      this.isShowReason = false
    },
    showRule(){
      this.showRules = true
    },
    closeMdel(){
      this.showRules = false
    },
    //为你推荐
    getRecommend(){
      this.$http.post("/goods/getLIke",{},true)
      .then(res => {
        if (res.code == 1) {
          this.goodsList = res.data
        } else {
          // this.$vux.toast.text(res.msg);
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
    //公告
    getBulletin(){
      let that = this
      this.$http.post("/spell/spellMessage",{},true)
      .then(res => {
        if (res.code == 1) {
          that.bulletin = res.data.list
          setInterval(function(){
            if(that.count <= that.bulletin.length){
              that.bulletinInfo = that.bulletin[that.count]
              that.count++
            }else{
              that.bulletinInfo = that.bulletin[0]
              that.count = 0
            }
          },3000)
        } else {
          // this.$vux.toast.text(res.msg);
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
  },
  created() {
    this.getBulletin()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#pintuan {
  position: relative;
  height: 100%;
  /deep/ .mescroll-downwarp .downwarp-content {
    padding: 0;
    line-height: 70px;
    height: 70px;
  }
  /deep/ .mescroll-downwarp .downwarp-progress {
    border-color: #999999;
    border-bottom-color: transparent;
  }
  /deep/ .mescroll-downwarp .downwarp-tip {
    color: #999999;
  }
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
      font-weight: 700;
      margin: 0 auto;
    }
    .news{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 0.25rem;
      right: 0.2rem;
    }
    .tabBox {
      width: 100%;
      // margin-bottom: 0.2rem;
      border-top: 1px solid #E5E5E5;
    }
    .bulletin{
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.24rem;
      color: #FE0000;
      background-color: #FBDBDB;
      img{
        width: 0.4rem;
        height: 0.32rem;
        display: block;
        float: left;
        margin-top: 0.15rem;
        margin-left: 0.2rem;
      }
      span{
        float: left;
        margin-left: 0.1rem;
      }
    }
  }
  .page_wrap{
    width: 100%;
    height: auto;
    position: absolute;
    top:2.5rem;
    bottom: 0;
    .order_li{
      width: 100%;
      margin-bottom: 0.2rem;
      .info_li{
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
              // height: 0.9rem;
              line-height: 0.4rem;
              font-size: 0.26rem;
              font-weight: 500;
              color: #333333;
              margin-top: 0.15rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .rg_bt{
              width: 100%;
              font-size: 0.24rem;
              font-weight: 500;
              color: #999999;
            }
            .rg_bt1{
              width: 100%;
              font-size: 0.32rem;
              font-weight: 500;
              color: #F23C3C;
              overflow: hidden;
              span:first-child{
                font-size: 0.24rem;
              }
              span:last-child{
                float: right;
                font-size: 0.24rem;
                color: #999999;
                margin-top: 0.1rem;
              }
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
          padding: 0 0.3rem;
          box-sizing: border-box;
          text-align: right;
          font-size: 0.26rem;
          color: #333333;
          border-bottom:1px solid #e5e5e5;
          span{
            font-size: 0.24rem;
          }
        }
        .content2{
          width: 100%;
          overflow: hidden;
          padding: 0 0.2rem;
          box-sizing: border-box;
          background-color: #ffffff;
          .title{
            width: 100%;
            line-height: 0.5rem;
            font-size: 0.28rem;
            color: #333333;
            span{
              color: #FF8400;
            }
          }
          .group_wrap{
            width: 100%;
            overflow: hidden;
            .group_li{
              width: 25%;
              float: left;
              margin-bottom: 0.3rem;
              .img_wrap{
                width: 0.9rem;
                height: 0.9rem;
                line-height: 0.9rem;
                text-align: center;
                margin: 0 auto;
                font-size: 0.36rem;
                border-radius: 50%;
                color: #9FA8B1;
                border: 1px dashed #9FA8B1;
                img{
                  width: 100%;
                  height: 100%;
                  display: block;
                  border-radius: 50%;
                }
              }
              .tel_num{
                width: 100%;
                text-align: center;
                font-size: 0.24rem;
                color: #5D5D5D;
              }
            }
            .group_li:last-child{
              margin-bottom: 0;
            }
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
          .btn1{
            background-color: #D8180D;
            color: #ffffff;
            margin-left: 0.2rem;
          }
        }
        .bt1{
          width: 100%;
          height: 1.36rem;
          overflow: hidden;
          .btn{
            width: 5rem;
            height: 0.88rem;
            line-height: 0.88rem;
            text-align: center;
            font-size: 0.32rem;
            font-weight: 600;
            color: #fff;
            border-radius: 0.4rem;
            margin: 0 auto;
            margin-top: 0.24rem;
            background:linear-gradient(90deg,rgba(255,86,41,1) 0%,rgba(255,9,62,1) 100%);
          }
        }
      }
    }
    .good_list{
      width: 100%;
      >.title{
        width: 100%;
        margin-bottom: 0.2rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        .text{
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.34rem;
          color: #333333;
        }
        .bt_line{
          width: 0.4rem;
          border-bottom: 3px solid #FC4B5A;
          margin-left: 0.5rem;
        }
      }
    }
  }
  .huigou_rule{
    width: 5.8rem;
    min-height: 6rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    margin: 3rem auto 0;
    position: relative;
    padding: 1.1rem 0.3rem 1.1rem;
    box-sizing: border-box;
    .text{
      width: 100%;
      height: 100%;
    }
    .close{
      position: absolute;
      top: -0.3rem;
      right: -0.3rem;
      img{
        width: 0.58rem;
        height: 0.58rem;
        display: block;
      }
    }
  }
  .order_pup{
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .order_pup_main{
      width: 5.8rem;
      height: 3rem;
      border-radius: 0.1rem;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      .order_pup_a{
        height: 2.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #E5E5E5;
        font-size: 0.34rem;
        font-weight: 500;
        .buyback_tit{
          font-size: 0.36rem;
          font-weight: 500;
        }
        .buyback_auto{
          font-size: 0.28rem;
          color: #747778;
        }
      }
      .order_pup_b{
        height: 0.88rem;
        font-size: 0.32rem;
        line-height: 1.38rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .order_pup_btn_a{
          color: #979899;
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .order_pup_btn_b{
          color: #CE372E;
          font-weight: 600;
          border-left: 1px solid #E5E5E5;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
}
</style>
