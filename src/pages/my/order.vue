<template>
  <div id="order">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">我的订单</div>
    </div>
    <div class="page_wrap" :style="{top: statusH + 0.88 +'rem'}">
      <div class="bulletin" v-if="nowIndex == 3">
        <img src="../../assets/img/home/pay/speaker.png" alt="">
        <span class="text">155******6766 10分钟前成功拼单1000元商品</span>
      </div>
      <div class="tabBox">
        <tab default-color="#999" active-color="#D8180D" custom-bar-width="40px" bar-active-color="#D8180D">
          <tab-item :selected="nowIndex == 1" @on-item-click="chooseType(1)">全部</tab-item>
          <tab-item :selected="nowIndex == 2" @on-item-click="chooseType(2)">待付款</tab-item>
          <tab-item :selected="nowIndex == 3" @on-item-click="chooseType(3)">拼团中</tab-item>
          <tab-item :selected="nowIndex == 4" @on-item-click="chooseType(4)">拼团成功</tab-item>
          <tab-item :selected="nowIndex == 5" @on-item-click="chooseType(5)">待收货</tab-item>
          <tab-item :selected="nowIndex == 6" @on-item-click="chooseType(6)">待评价</tab-item>
        </tab>
      </div>
      <div class="mescrollBox" :style="{top: statusH1+'rem'}">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="order_li">
            <div class="info_li" v-for="(v, i) in orderlist" :key="i">
              <div class="title">
                <span class="text1">{{stautsInfo[v.orderStatus]}}</span>
                <span class="text2" v-if="nowIndex==3">拼单编号：{{v.id}}</span>
              </div>
              <div class="content">
                <img :src="v.thumb | addUrlHeader" alt="">
                <div class="cont_right1">
                  <div class="title">{{v.goodsName}}</div>
                  <div class="rg_bt" v-if="nowIndex!=3">{{v.skuName}}</div>
                  <div class="rg_bt1" v-if="nowIndex==3"><span>￥</span><span>{{v.goodsPrice}}</span><span>{{v.goodsPrice}}</span></div>
                </div>
                <div class="cont_right2" v-if="nowIndex!=3"><div>¥{{v.goodsPrice}}</div><div>x{{v.goodsNum}}</div></div>
                <div class="cont_more" @click="handDetail(1, v)">查看更多</div>
              </div>
              <div class="content2" v-if="nowIndex!=2 && v.spellList && v.spellList.length">
                <div class="title" v-if="parseFloat(v.spellList[0].balance)">此团需要{{v.spellList[0].totalPrice}}元，已经完成{{v.spellList[0].totalPrice | mathsub(v.spellList[0].balance)}}元，还差<span>{{v.spellList[0].balance}}元</span>成团</div>
                <div class="title" v-else>此团需要{{v.spellList[0].totalPrice}}元，已经完成<span>{{v.spellList[0].totalPrice}}元</span></div>
                <div class="group_wrap">
                  <div class="group_li" v-for="(m, n) in v.spellList" :key="n">
                    <div class="img_wrap">
                      <img :src="m.avatar" alt="">
                    </div>
                    <div class="tel_num">{{m.mobile}}</div>
                  </div>
                </div>
              </div>
              <div class="content1" v-if="nowIndex!=3">实付:¥ {{v.payPrice}}<span>(免运费)</span></div>
              <!-- <div class="bt1" v-if="nowIndex==3"><div class="btn">邀请好友拼单</div></div> -->
              <div class="bt" v-if="v.orderStatus == 1 || v.orderStatus == 2 || v.orderStatus == 3 || v.orderStatus == 5 || v.orderStatus == 6 || v.orderStatus == 7">
                <div v-if="v.orderStatus == 1" @click="cancelOrder(v.orderId, v.payType)">取消订单</div>
                <div class="btn1" v-if="v.orderStatus == 1" @click="toPay(v.orderId, v.payType)">去支付</div>

                <div class="btn1" v-if="v.orderStatus == 2 && v.model==2" @click="handInvite(v.id)">邀请好友拼单</div>
                <div v-if="v.orderStatus == 2" @click="handCancel(v)">取消订单</div>
                

                <div v-if="v.orderStatus == 3 && v.model==2" @click="showRule">回购规则</div>
                <div v-if="v.orderStatus == 3" @click="handFa(v)">确认发货</div>
                <div class="btn1" v-if="v.orderStatus == 3 && v.model==2" @click="handHui(v)">回购商品-到账￥{{v.payPrice | percentFilter(percent)}}</div>

                <div v-if="v.orderStatus == 5 " @click="handDetail(2, v, stautsInfo[v.orderStatus])">申请退款</div>
                <div v-if="v.orderStatus == 5" @click="jumpTo('/seeLogistics?id='+v.orderId)">查看物流</div>
                <div class="btn1" v-if="v.orderStatus == 5" @click="confirmOrder(v.orderId)">确认收货</div>

                <div v-if="v.orderStatus == 6 || v.orderStatus == 7" @click="jumpTo('/home')">再次购买</div>
                <div class="btn1" v-if="v.orderStatus == 6 || v.orderStatus == 7" @click="handApprise(v)">立即评价</div>
              </div>
            </div>
          </div>
          <div id="empty_order"></div>
        </mescroll-vue>
      </div>
    </div>
    <!-- 取消订单 -->
    <van-popup position="center" v-model="showPayOrder" :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}" :mask-z-index="5000" :hide-on-blur="true">
      <div class="show_payOrder">
        <div class="text1">确认要放弃付款吗？</div>
        <div class="text2">未支付订单将在不久后自动关闭，请尽快支付~</div>
        <div class="cont">
          <div @click="giveUpOrder">暂时放弃</div>
          <div @click="toPay(orderId, paytype)">继续支付</div>
        </div>
      </div>
    </van-popup>
    <!-- 浏览商品弹窗(待支付，拼团中，拼团成功) --><!-- 申请退款(待收货，待评价) -->
    <van-popup class="borwseshop_wrap" position="center" v-model="browseshop" :mask-z-index="5000" :hide-on-blur="true">
      <div class="browseshop_main">
        <div class="browseshop_a">
          <div class="drawback_money">总金额：￥{{browsePrice}}</div>
          <div class="drawback_xunhuan_list">
            <div class="drawback_card" v-for="(v, i) in browseList" :key="i">
              <div class="drawback_card_img"><img :src="v.image | addUrlHeader" alt=""></div>
              <div class="drawback_card_list">
                <span class="drawback_card_list_tit">{{v.goodsName}}</span>
                <span class="drawback_card_list_specs">{{v.skuName || '&nbsp;'}}</span>
                <div class="drawback_card_list_price">
                  <span class="drawback_card_list_price_left">￥{{v.price}}</span>
                  <div class="drawback_card_list_but" v-if="browseType == 2" @click="handRefu(v, browseTxt, browse)">{{browsestatus[v.returnStatus]}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="browseshop_b" @click="browseshop=false">
          <img src="../../assets/img/home/cancel.png" alt="">
        </div>
      </div>
    </van-popup>
    <!-- 回购规则 -->
    <van-popup position="center" class="borwseshop_wrap" v-model="showRules" :mask-z-index="5000" :hide-on-blur="true">
      <div class="huigou_title">回购规则</div>
      <div class="huigou_rule" v-html="rules"></div>
      <div class="hui_close" @click="closeMdel">
        <img src="../../assets/img/home/cancel.png" alt="">
      </div>
    </van-popup>
    <!-- 确认发货弹窗 -->
    <van-popup position="center"
      v-model="affirmgoods"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="order_pup">
        <div class="order_pup_main">
          <div class="order_pup_a" @click="affirmgoods=false">是否到附近专卖店取货</div>
          <div class="order_pup_b">
            <div class="order_pup_btn_a" @click="handzhuan">专柜自提</div>
            <div class="order_pup_btn_b" @click="handkuai">快递发货</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 回购商品弹窗 -->
    <van-popup position="center"
      v-model="buyback"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="order_pup">
        <div class="order_pup_main">
          <div class="order_pup_a">
            <div class="buyback_tit">回购商品赚钱</div>
            <div class="buyback_auto">余额到账￥{{payPrice | percentFilter(percent)}}可以立即提现到银行卡</div>
          </div>
		      <div class="order_pup_b">            
            <div class="order_pup_btn_a" @click="handFa1">确认发货</div>
            <div class="order_pup_btn_b" @click="handHuiOk">确认回购</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!--选择规格-->
    <div v-transfer-dom>
      <popup v-model="isShowReason" position="bottom" width="100%" :hide-on-blur="true">
        <div class="reason">
          <div class="text1">请选择原因</div>
          <div class="text2">取消订单后无法恢复，优惠券将原路返还</div>
          <div class="text3" @click="reasonStatus=1">
            <span>收货地址或者手机号填错了</span>
            <span class="text6" v-show="reasonStatus==1">✔</span>
          </div>
          <div class="text4" @click="reasonStatus=2">
            <span>不想买了</span>
            <span class="text6" v-show="reasonStatus==2">✔</span>
          </div>
          <div class="text5" @click="reasonStatus=3">
            <span>其他原因</span>
            <span class="text6" v-show="reasonStatus==3">✔</span>
          </div>
          <div class="btn" @click="submit">提交</div>
        </div>
      </popup>
    </div>
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
        <img class="good_img" :src="shareImg | addUrlHeader" alt="">
        <img class="pos_img" src="../../assets/img/home/dowload.png" alt="" @click="dowloadImg">
      </div>
      <div class="bt_btn" @click="showShare = false">取消</div>
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem, TransferDom, Popup, Icon } from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from "../../utils";
export default {
  name: "order",
  components: {
    XDialog,
    Tab,
    TabItem,
    MescrollVue,
    Popup,
    Icon
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
          warpId: "empty_order",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div><div>没找到订单？试试查看全部或更换登录方式</div>"
        },
      },
      showPayOrder:false,
      isShowReason:false,
      reasonStatus:1,
      showDeleteOrder:false,
      verifyDel:false,
      showRules:false,
      browseshop:false,
      browseType: 1,    // 1-查看详情  2-申请退款
      browseList: [],   // 商品详情的商品列表
      browsestatus: '',   // 商品详情的商品状态
      browsePrice: '',
      browseTxt: '',
      browse: '',
      affirmgoods: false,
      buyback: false,
      stautsInfo: {},
      orderId: '',
      rules:'',
      paytype: '',
      showShare:false,
      shareImg:'',
      shareUrl:'',
      percent: 10,
      payPrice: 0,
    };
  },
  watch:{
    $route (to,from) {
      if(to.name=="order"){
        this.nowIndex = this.$route.query.order_num?Number(this.$route.query.order_num):1
      }
    }
  },
  computed:{
    statusH1(){
      let h = this.statusH + 0.2 + (this.nowIndex == 3 ? 0.6 : 0);
      h += document.documentElement.clientWidth ? 44*7.5/document.documentElement.clientWidth : 0;
      return h;
    }
  },
   created() {
    this.nowIndex = utils.storage.get("orderTab") || 1;
  },
  methods: {
    chooseType(num){ // 切换订单
      this.nowIndex = num
      utils.storage.set("orderTab", num);
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit (mescroll) { //
      this.mescroll = mescroll
    },
    refresh: function() { // 下拉刷新
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {  //订单列表数据
      this.$http.post("/spell/orderList", { page: page.num, status: this.nowIndex - 1 }, true).then(response => {
        let arr = response.data.list;
        if (page.num === 1) { this.orderlist = []; this.stautsInfo = response.data.orderStatus[1]; this.percent = response.data.backPercent}
        this.orderlist = this.orderlist.concat(arr);
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length);
        });
        utils.storage.set("orderStatus", this.stautsInfo);
      }).catch(e => { mescroll.endErr();});
    },
    cancelOrder (id, type) { // 待付款取消订单
      this.showPayOrder = true;
      this.orderId = id;
      this.paytype = type;
    },
    handInvite(id){// 已支付的邀请好友
      this.$http.post('/task/shareGoods', {ptid: id}, true).then(res => {
        if(res.code == 1){
          this.showShare =true
          this.shareImg = res.data.thumb
          this.shareUrl = res.data.url
        }
      })
    },
    handCancel(v){ // 已支付取消
      this.$http.post('/spell/cancelInfo', {orderId: v.orderId}, true).then(res => {
        if(res.code == 1){
          if(res.data.return == 0){ // 时间不到不能取消
            this.$dialog.alert({ title: '温馨提示', message: '发起拼单'+res.data.day+'天后，才可以取消订单哦'}).then(() => {}).catch(() => {});
          } else if(res.data.return > 0 && res.data.return < 100) {
            let str = '拼单已完成'+utils.accSub(v.spellList[0].totalPrice, v.spellList[0].balance)+'元，还差'+v.spellList[0].balance+'元可100%退款';
            this.$dialog.confirm({ title: '温馨提示', message: str, confirmButtonText: '邀请好友拼单', cancelButtonText: '退款'+res.data.return+'%'}).then((e) => {
              this.handInvite(v.id);
            }).catch((e) => {
              if(e == 'cancel'){
                this.$http.post('/spell/cancelOrder', {orderId: v.orderId}, true).then(res => {
                  if(res.code == 1){
                    this.$vux.toast.text("退款成功")
                    this.goRefresh();
                  }
                })
              }
            });
          } else{
            this.$dialog.confirm({ title: '是否退款', message: '', confirmButtonText: '确定'}).then((e) => {
              if(e == 'confirm'){
                this.$http.post('/spell/cancelOrder', {orderId: v.orderId}, true).then(res => {
                  if(res.code == 1){
                    this.$vux.toast.text("退款成功")
                    this.goRefresh();
                  }
                })
              }
            }).catch(() => {});
          }
        }
      })
    },
    giveUpOrder () { // 待付款取消订单
      this.showPayOrder = false
      this.isShowReason = true
    },
    submit(){ // 待付款取消订单
      this.isShowReason = false
      this.$http.post("/spell/cancelOrder", {orderId: this.orderId}, true).then(res => {
        if(res.code == 1){
          this.$vux.toast.text('取消订单成功');
          this.goRefresh();
        }
      }).catch(() => {});
    },
    toPay(id, type){ // 去支付
      let that = this
      this.$http.post("/payment/payStart", { payType:type, orderId:id}).then(res => {
        if(res.code == 1){
          if(type=='credit'){
            this.$vux.toast.text(res.msg);
            this.goRefresh();
          }else{
            let payInfo = res.data.payOrder
            if (type == "wechat") {
              let wxPay = api.require("wxPayPlus");
              let info = {
                apiKey: payInfo.appid,
                orderId: payInfo.prepayid,
                mchId: payInfo.partnerid,
                nonceStr: payInfo.noncestr,
                timeStamp: payInfo.timestamp,
                sign: payInfo.sign
              };
              wxPay.payOrder(info, function(ret, err) {
                if (ret.status) {
                  that.goRefresh();
                } else {
                  if (err.code === -2) {
                    that.$vux.toast.text("取消支付");
                  } else {
                    that.$vux.toast.text("支付失败");
                  }
                }
              });
            } else {//支付宝支付
              var aliPayTradePlus = api.require("aliPayPlus");
              aliPayTradePlus.payOrder({ orderInfo: payInfo}, function(ret, err) {
                if (ret.code == 9000) {
                  that.goRefresh();
                }
              });
            }
          }
        }else{
          this.$vux.toast.text(res.msg);
        }
      });
    },
    confirmOrder(id) { // 确认收货
      this.$http.post("/spell/confirmOrder", {orderId: id}, true).then(res => {
        if(res.code == 1){
          this.$vux.toast.text('确认收货成功');
          this.goRefresh();
        }
      }).catch(() => {});
    },
    handApprise(v){ // 去评价
      utils.storage.set('orderItem', v);
      this.jumpTo('/appraisal?id='+v.orderId)
    },
    handRefu(v, status, item){
      utils.storage.set("refund", Object.assign(item, v, {statusTxt: status}));
      this.jumpTo('/refund')
    },
    handDetail(type, item, status){  // 查看详情  申请退款
      this.browseType = type;
      this.browsePrice = item.goodsPrice
      this.browseTxt = status;
      this.browse = item;
      this.$http.post("/spell/goodsList", {orderId: item.orderId}, true).then(res => {
        if(res.code == 1){
          this.browseList = res.data.list;
          this.browsestatus = res.data.returnStatus;
          this.browseshop = true
        }
      }).catch(() => {});
    },
    goRefresh() {
      this.mescrollUp.page.num = 1;
      this.mescroll.scrollTo(0, 0);
      this.$nextTick(() => {
        this.upCallback(this.mescrollUp.page, this.mescroll);
      })
    },
    showDelOrder(){
      this.showDeleteOrder = true
    },
    cancelDel(){
      this.showDeleteOrder = false
    },
    isVerifyDel(){
      this.verifyDel = !this.verifyDel
    },
    showRule(){ // 订单回购规则
      this.$http.post("/auth/agreement", {type: 8}, true).then(res => {
        if(res.code == 1){
          this.showRules = true
          this.rules = res.data.info;
        }
      }).catch(() => {});
    },
    handzhuan() {// 专柜自提
      this.affirmgoods = false;
      this.$dialog.alert({message:"附近专柜无货，请选择线上快递发货", confirmButtonText: '快递发货'}).then(() => {
        this.handkuai();
      }).catch(() => {})
    },
    handkuai(){ // 快递发货
      this.affirmgoods = false;
      this.$http.post("/spell/agreeDelivery", {orderId: this.orderId}, true).then(res => {
        if(res.code == 1){
          this.goRefresh()
        }
      }).catch(() => {});
    },
    handFa (v) {
      this.affirmgoods = true;
      this.orderId = v.orderId
    },
    handHui (v) {
      this.buyback = true;
      this.payPrice = v.payPrice;
      this.orderId = v.orderId;
    },
    handFa1 () {
      this.buyback = false;
      this.affirmgoods = true;
    },
    handHuiOk () {
      this.buyback=false;
      this.$http.post("/spell/orderBuyBack", {orderId: this.orderId}, true).then(res => {
        if(res.code == 1){
          this.goRefresh()
        }
      }).catch(() => {});
    },
    closeMdel () {
      this.showRules = false
    },
    dowloadImg () {
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
    copyLink () { //复制链接
      this.copyTextShare(this.shareUrl)
    },
    toShare (type) { //去分享
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
    }
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  filters: {
    mathsub(a, b){
      return utils.accSub(a, b);
    },
    percentFilter(v, b){
      return utils.accMul(v, b)/100;
    }
  }
};
</script>

<style scoped lang='less'>
#order {
  position: relative;
  height: 100%;
  .vux-tab{
    overflow: hidden;
  }
  .scrollable .vux-tab-item{
    flex: 0 0 16.67%;
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
      overflow: hidden;
      position: relative;
      .iconfont {
        position: absolute;
        left: 0.3rem;
        top: 0.2rem;
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
    position: absolute;
    left:0;
    top: 0.88rem;
    bottom: 0;
    .tabBox {
      width: 100%;
      margin-bottom: 0.2rem;
      border-top: 1px solid #E5E5E5;
    }
    .mescrollBox{
      width: 100%;
      position: absolute;
      left:0;
      top: 0.88rem;
      bottom: 0;
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
    .order_li{
      width: 100%;
      margin-bottom: 0.2rem;
      .info_li{
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 0.2rem;
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
          position: relative;
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
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .rg_bt{
              width: 100%;
              font-size: 0.24rem;
              font-weight: 500;
              color: #999999;
              margin-top: 0.1rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .rg_bt1{
              width: 100%;
              font-size: 0.32rem;
              font-weight: 500;
              color: #F23C3C;
              span:first-child{
                font-size: 0.24rem;
              }
              span:last-child{
                font-size: 0.24rem;
                color: #999999;
                text-decoration:line-through;
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
          .cont_more{
            position: absolute;
            right: 0.2rem;
            bottom: 0.1rem;
            padding: 0.04rem 0.16rem;
            font-size: 0.24rem;
            border: 1px solid #999;
            border-radius: 0.26rem;
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
            padding: 0.2rem 0;
            line-height: 0.4rem;
            font-size: 0.26rem;
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
          border-top:1px solid #e5e5e5;
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
      padding: 0 0.2rem;
      box-sizing: border-box;
      >.title{
        width: 100%;
        margin-bottom: 0.2rem;
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
      .goods_wrap{
        width: 100%;
        .goods_info{
          width: 3.5rem;
          float: left;
          overflow: hidden;
          border-radius: 0.3rem;
          background-color: #ffffff;
          margin-bottom: 0.1rem;
          img{
            width: 100%;
            height: 3.1rem;
            display: block;
          }
          .title{
            height: 0.9rem;
            margin-top: 0.1rem;
            font-size: 0.28rem;
            color: #333333;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding: 0 0.15rem;
            box-sizing: border-box;
          }
          .price{
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.2rem;
            color: #FF4B00;
            padding: 0 0.15rem;
            box-sizing: border-box;
            >.text{
              font-size: 0.36rem;
              font-weight: 600;
            }
          }
          .sale_info{
            width: 100%;
            height: 0.4rem;
            overflow: hidden;
            line-height: 0.4rem;
            font-size: 0.12rem;
            color: #B5B5B5;
            padding: 0 0.15rem;
            margin-bottom: 0.1rem;
            box-sizing: border-box;
            .text1{
              float: left;
            }
            .text2{
              float: right;
            }
          }
        }
        .goods_info1{
          margin-right: 0.1rem;
        }
      }
    }
  }
  .van-popup--center{border-radius: 0.2rem;}
  .show_payOrder{
    width: 5.8rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    position: relative;
    padding: 0.3rem 0 0 0;
    overflow: hidden;
    .text1{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.36rem;
      color: #000;
    }
    .text2{
      width: 100%;
      height: 1rem;
      text-align: center;
      font-size: 0.29rem;
      color: #747778;
      padding: 0 0.5rem;
      box-sizing: border-box;
    }
    .cont{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      margin-top: 0.2rem;
      border-top: 1px solid #D8D8D8;
      div{
        width: 50%;
        height: 100%;
        float: left;
        box-sizing: border-box;
        font-size: 0.32rem;
        border-right: 1px solid #D8D8D8;
        color: #979899;
        text-align: center;
      }
      div:last-child{
        border-right: none;
        color: #CE372E;
      }
    }
  }
  .del_payOrder{
    width: 5.8rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    margin: 4rem auto 0;
    position: relative;
    padding: 0.3rem 0 0 0;
    .text1{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.36rem;
    }
    .text2{
      width: 100%;
      height: 1rem;
      text-align: center;
      font-size: 0.29rem;
      color: #58595B;
      padding: 0 0.5rem;
      box-sizing: border-box;
      .icon1{
        color: #D8180D;
      }
      .icon2{
        color: #9C9C9C;
      }
      .icon{
        font-size: 0.38rem;
      }
      .text3{
        color: #9C9C9C;
      }
    }
    .cont{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      margin-top: 0.2rem;
      border-top: 1px solid #D8D8D8;
      div{
        width: 50%;
        height: 100%;
        float: left;
        box-sizing: border-box;
        font-size: 0.32rem;
        border-right: 1px solid #D8D8D8;
        color: #979899;
      }
      div:last-child{
        border-right: none;
        color: #CE372E;
      }
    }
  }
  .borwseshop_wrap{
    overflow: visible;
  }
  .browseshop_main{
    height: 100%;
    position: relative;
    .browseshop_a{
      width: 6.6rem;
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
        max-height: 8.4rem;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 0.2rem;
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
      width: 100%;
      position: absolute;
      bottom: -1.5rem;
      left: 0;
      text-align: center;
      img{
        width: 0.62rem;
        height: 0.62rem;
      }
    }
  }
  .huigou_title{
    width:100%;
    position: absolute;
    left:0;
    height: 0.62rem;
    top: 0;
    text-align: center;
    line-height: 0.62rem;
    font-size: 0.32rem;
    color: #fff;
    background: url('../../assets/img/my/huigou.png') no-repeat center;
    background-size: auto 100%;
    z-index: 2;
  }
  .huigou_rule{
    width: 5.8rem;
    max-height: 6rem;
    min-height: 3rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    position: relative;
    margin: 0.3rem 0.3rem 0.3rem;
    border: 1px dashed #FF2935;
    padding: 0.4rem 0.2rem 0.2rem;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    img{
      max-width: 100%
    }
  }
  .hui_close{
    position: absolute;
    top: -1rem;
    right: -0.3rem;
    img{
      width: 0.58rem;
      height: 0.58rem;
      display: block;
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
      height: 6.6rem;
      position: fixed;
      left: 1.8rem;
      top: 50%;
      margin-top: -4.5rem;
      z-index: 100000;
      border-radius: 0.26rem;
      background-color: #ffffff;
      overflow: hidden;
      .good_img{
        width: 100%;
        height: 6.6rem;
        display: inline-block;
        vertical-align: top;
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
.vux-popup-dialog{
  overflow: visible;
}
.reason{
  background:#fff;
  padding-top:0.4rem;
  position:relative;
  .text1{
    width: 100%;
    text-align: center;
    font-size: 0.34rem;
  }
  .text2{
    width: 100%;
    text-align: center;
    font-size: 0.26rem;
    color: #58595B;
    margin-bottom: 0.2rem;
  }
  .text3{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.2rem;
    font-size: 0.3rem;
    box-sizing: border-box;
    border-top: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
    .text6{
      float: right;
    }
  }
  .text4{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.2rem;
    font-size: 0.3rem;
    box-sizing: border-box;
    border-bottom: 1px solid #E0E0E0;
    .text6{
      float: right;
    }
  }
  .text5{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.2rem;
    font-size: 0.3rem;
    box-sizing: border-box;
    .text6{
      float: right;
    }
  }
  .btn{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.32rem;
    background-color: #7D38D2;
  }
}
</style>
