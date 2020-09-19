<template>
  <div id="shopingCart">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH+0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">购物车</div>
      <div class="edite" :style="{top: statusH+0.15+'rem'}">
        <span @click="editeList">{{isEdite ? '取消' : '编辑'}}</span>
      </div>
    </div>
    <div class="shoping_list">
      <mescroll-vue ref="mescroll" id="page_pos" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="shop_card_list">
          <div class="shoping_card" v-for="(v, i) in list" :key="i" @click="jumpTo('/goodsDetail?goodsId='+v.goodsid)">
            <div class="shoping_card_check">
              <x-icon class="edite_icon1" type="ios-checkmark" size="24" v-if="v.check" @click.stop="checkFun(v)"></x-icon>
              <x-icon class="edite_icon2" type="ios-circle-outline" size="24" v-else @click.stop="checkFun(v)"></x-icon>
            </div>
            <div class="shoping_card_img"><img :src="v.image | addUrlHeader" alt=""></div>
            <div class="shoping_card_titlist">
              <div class="shoping_card_up">{{v.title}}</div>
              <div class="shoping_card_down">
                <div class="shoping_card_left">
                  <p class="shoping_card_price"><span class="shoping_card_weight">¥</span>{{v.price}}</p>
                  <span class="shoping_card_weight">{{v.skuName}}</span>
                </div>
                <div class="shoping_card_right">x{{v.quantity}}</div>
              </div>
            </div>
          </div>
          <div class="shoping_card1" v-if="show && !list.length">
            <span>暂无添加商品</span>
            <van-button round type="info" size="small" color="#FE1951" @click="jumpTo('/home')">去添加</van-button>
          </div>
        </div>
        <!-- 失效商品 -->
        <div class="shop_underfind_list" v-if="list2 && list2.length">
          <div class="shop_underfind">
            <div class="shop_underfind_tit">
              <div class="shop_underfind_tit_a">下架宝贝{{list2.length}}件</div>
              <div class="shop_underfind_tit_b">
                <p @click="handCollect1">移到收藏夹</p>
                <p @click="handDel1">清空失效宝贝</p>
              </div>
            </div>
            <div class="shop_underfind_main" v-for="(v, i) in list2" :key="i">
              <div class="shop_underfind_under"><span>失效</span></div>
              <div class="shop_underfind_img"><img :src="v.image | addUrlHeader" alt=""></div>
              <div class="shop_underfind_titlist">
                <div class="shop_underfind_up">{{v.title}}</div>
                <div class="shop_underfind_down">
                  <p class="shop_underfind_left">商品已下架</p>
                  <!-- <p class="shop_underfind_right">找相似</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 你可能还喜欢 -->
        <div class="knxh">
          <div class="title" v-if="goodsList.length">
            <span class="text1">——</span>
            <img src="../../assets/img/home/xin.png" alt="">
            <span>你可能还喜欢  ——</span>
          </div>
          <goods-list :list="goodsList" :len="goodsList.length"></goods-list>
        </div>
      </mescroll-vue>
    </div>
    <div class="shop_bottom" v-if='!isEdite'>
      <van-checkbox v-if="list.length" v-model="allCheck" @click="checkAllFun" checked-color="#F20226" icon-size="0.24rem">全选</van-checkbox>
      <div class="shop_right shop_right1">
        合计:<span class="price">{{total}}</span>
        <van-button round type="info" size="small" color="#FE1951" @click="checkout(1)">结算</van-button>
        <b>|</b>
        拼单价:<span class="price">{{total1}}</span>
        <van-button round type="info" size="small" color="#FE1951" @click="checkout(2)">结算</van-button>
      </div>
    </div>
    <div class="shop_bottom" v-else>
      <van-checkbox v-if="list.length" v-model="allCheck" @click="checkAllFun" checked-color="#F20226" icon-size="0.24rem">全选</van-checkbox>
      <div class="shop_right">
        <van-button round type="info" size="small" color="#FF9208" @click="handCollect">移到收藏夹</van-button>
        <van-button round type="info" size="small" color="#FE1951" @click="delCart">删除</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, Popup, TransferDom, } from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from "../../utils";
import GoodsList from '@/components/homeGoods'
export default {
  name: "shopingCart",
  data() {
    return {
      statusH:0,
      isEdite: false,
      allCheck: false,
      show: false,
      total: 0,
      total1: 0,
      list: [],     // 购物车数据
      list2: [],    // 购物车失效宝贝
      goodsList: [],
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: { num: 0 },
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        noMoreSize: 5,
        empty: {
          warpId: "empty_detail",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
    this.getCart();
  },
  methods: {
    getCart() { // 购物车数据
      this.$http.get('/cart/getlist', {}, true).then(res => {
        if(res.code == 1){
          let arr = res.data || [], arr1 = [], arr2 = [];
          for(let i=0; i<arr.length; i++){
            let item = arr[i];
            if(item.status == 1){
              arr1.push(Object.assign(item, {check: false}));
            } else {
              arr2.push(item)
            }
          }          
          this.list = arr1;
          this.list2 = arr2;
        }
        this.show = true
      })
    },
    refresh() {
      this.mescrollUp.page.num = 1;
      this.getCart();
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {  // 商品列表数据
      this.$http.get("/goods/getLIke", {pn: page.num}, true).then(response => {
        let arr = response.data;
        if (page.num === 0) this.goodsList = [];
        this.goodsList = this.goodsList.concat(arr);
        this.$nextTick(() => {
          mescroll.endSuccess(this.goodsList.length);
        });
      }).catch(e => {
        mescroll.endErr();
      });
    },
    checkFun(v){  // 单选
      v.check = !v.check;
      let total = 0, total1 = 0, num = 0, percent = Number(this.$store.state.global.initData.percent)
      for(let i=0; i< this.list.length; i++){
        if(this.list[i].check){
          num++;
          let price = parseFloat(this.list[i].price), count = this.list[i].quantity;
          total = utils.accAdd(total, utils.accMul(price, count))
        }
      }
      this.allCheck = num > 0 ? (this.list.length == num) : false;
      this.total = total;
      this.total1 =  utils.accDiv(utils.accMul(total,percent), 100);
      this.num = num;
    },
    checkAllFun() { // 全选
      let v = this.allCheck;
      if(v){
        let total = 0, total1 = 0, num = 0, percent = Number(this.$store.state.global.initData.percent)
        for(let i=0; i< this.list.length; i++){
          this.list[i].check = true;
          num++;
          let price = parseFloat(this.list[i].price), count = this.list[i].quantity;
          total = utils.accAdd(total, utils.accMul(price, count))
        }
        this.total = total;
        this.total1 = utils.accDiv(utils.accMul(total,percent), 100);
      } else {
        for(let i=0; i< this.list.length; i++){
          this.list[i].check = false;
        }
        this.total = '0.00';
        this.total1 = '0.00';
      }
    },
    checkout (type) { // 结算
      let  goods = this.getList(1, 0);
      if(!goods.length){this.$vux.toast.text("请选择商品"); return ;}
      utils.storage.set('checkoutGoods', goods);
      this.jumpTo("/verify_order?type=cart&model="+type);
    },
    getList (type, bool) {
      let arr = [], arr1 = [];
      if(type){
        for(let i=0; i< this.list.length; i++){
          if(this.list[i].check){
            arr.push({goodsId: this.list[i].goodsid, skuId: this.list[i].skuId, quantity: this.list[i].quantity});
            arr1.push(this.list[i].goodsid);
          }
        }
      } else {
        for(let i=0; i< this.list2.length; i++){
          arr.push({goodsId: this.list2[i].goodsid, skuId: this.list2[i].skuId, quantity: this.list2[i].quantity})
          arr1.push(this.list2[i].goodsid);
        }
      }
      if(bool){return arr1}else{return arr}
    },
    handCollect () { // 收藏
      let token = utils.storage.get('token'), goods = this.getList(1, 1);
      if(!goods.length){this.$vux.toast.text("请选择商品"); return ;}
      this.$dialog.confirm({ message: '确定要收藏选中商品'}).then((e) => {
        this.$http.post('/collect/collect', {goodsId: goods.join(',')}).then(res => {
          if(res.code == 1){
            this.$vux.toast.text("收藏成功")
            this.getCart();
          }
        })
      }).catch(() => {});
    },
    handDel1() { // 清理失效宝贝
      let token = utils.storage.get('token'), goods = this.getList(0, 0);
      if(!goods.length){this.$vux.toast.text("暂无失效商品"); return ;}
      this.$dialog.confirm({ message: '确定要删除失效的商品'}).then((e) => {
        this.$http.post('/cart/remove', {goods: JSON.stringify(goods)}).then(res => {
          if(res.code == 1){
            this.getCart();
          }
        })
      }).catch(() => {});
    },
    handCollect1 () { // 收藏失效宝贝
      let token = utils.storage.get('token'), goods = this.getList(0, 1);
      if(!goods.length){this.$vux.toast.text("暂无失效商品"); return ;}
      this.$dialog.confirm({ message: '确定要收藏选中商品'}).then((e) => {
        this.$http.post('/collect/collect', {goodsId: goods.join(',')}).then(res => {
          if(res.code == 1){
            this.$vux.toast.text("收藏成功")
            this.getCart();
            this.isEdite = false;
          }
        })
      }).catch(() => {});
    },
    delCart () { // 删除购物车数据
      let token = utils.storage.get('token'), goods = this.getList(1, 0);
      if(!goods.length){this.$vux.toast.text("请选择商品"); return ;}
      this.$dialog.confirm({ message: '确定要删除选中的商品'}).then((e) => {
        this.$http.post('/cart/remove?token='+token, {goods: JSON.stringify(goods)}).then(res => {
          if(res.code == 1){
            this.getCart();
            this.isEdite = false;
          }
        })
      }).catch(() => {});
    },
    editeList () { // 切换是否为编辑
      this.isEdite = !this.isEdite
    }
  },
  components: {
    XDialog,
    Popup, 
    MescrollVue,
    GoodsList
  },
  directives: {
    TransferDom
  },
};
</script>

<style scoped lang='less'>
#shopingCart {
  position: relative;
  height: 100%;
  /deep/ .mescroll-upwarp{
    padding-bottom: 1rem;
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
      width: 3rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      color: #222222;
      font-size: 0.36rem;
      font-weight: 700;
      margin: 0 auto;
    }
    .edite{
      position: absolute;
      top: 0.25rem;
      right: 0.3rem;
      font-size: 0.26rem;
      color: #646464;
    }
  }
  .shoping_list{
    width: 100%;
    height: 100%;
    padding-top: 0.88rem;
    box-sizing: border-box;
    overflow: hidden;
    .shoping_card{
      width: 6.7rem;
      margin: 0.2rem;
      padding: 0.2rem;
      background: #FFFFFF;
      border-radius: 0.1rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .shoping_card_check{
        width: 0.3rem;
        height: 0.3rem;
        .vux-x-icon {
          fill: #808080;
        }
        .edite_icon1{
          fill: #F20226
        }
      }
      .edite_wrap1{
        .vux-x-icon {
          fill: #D272E3;
        }
      }
      .shoping_card_img{
        width: 1.65rem;
        height: 1.65rem;
        margin: 0.1rem 0.1rem 0.1rem 0.2rem;
        background-size: 100% auto;
        background: cornsilk;
      }
      .shoping_card_titlist{
        width: 4.4rem;
        height: 1.65rem;
        margin: 0 0 0 0.2rem;
        // background: cornsilk;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: flex-start;
        .shoping_card_up{
          font-size: 0.28rem;
          font-weight: 500;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .shoping_card_down{
          height: 0.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .shoping_card_left{
            color: #F20226;
            display: flex;
            flex-direction: row;
            align-content: flex-end;
            .shoping_card_price{
              font-size: 0.36rem;
              line-height: 0.5rem;
              font-weight: 500;
              margin-right: 0.22rem;
            }
            .shoping_card_weight{
              font-size: 0.24rem;
              margin-top: 0.08rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 2rem;
            }
          }
          .shoping_card_right{
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 0.1rem;
            border: 1px solid #999999;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.28rem;
          }
        }
      }
    }
    .shoping_card1{
      width: 6.7rem;
      height: 1.85rem;
      margin: 0.2rem;
      padding: 0.2rem;
      background: #FFFFFF;
      border-radius: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &>span{
        font-size: 0.3rem;
        color:#999;
      }
      button{
        width: auto;
        padding: 0 0.8rem;
        color: #fff;
        margin-top: 0.3rem;
      }

    }
  }
  .shop_underfind{
    width: 6.7rem;
    margin: 0.2rem;
    padding: 0.2rem;
    background: #FFFFFF;
    border-radius: 0.1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
    .shop_underfind_tit{
      height: 0.55rem;
      display: flex;
      justify-content: space-between;
      .shop_underfind_tit_a{
        font-size: 0.3rem;
        font-weight: 500;
        color: #333333;
      }
      .shop_underfind_tit_b{
        width: 2.9rem;
        font-size: 0.24rem;
        color: #FF9208;
        display: flex;
        justify-content: space-between;
      }
    }
    .shop_underfind_main{
      height: 1.85rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem 0;
      .shop_underfind_under{
        width: 0.6rem;
        height: 0.25rem;
        span{
          display: block;
          width: 0.7rem;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.24rem;
          transform: scale(0.8);
          text-align: center;
          color: #fff;
          background: #a4a4a4;
          border-radius: 0.14rem;
        }
      }
      .shop_underfind_img{
        width: 1.65rem;
        height: 1.65rem;
        margin: 0.1rem;
        background: pink;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .shop_underfind_titlist{
        height: 1.65rem;
        width: 4.26rem;
        margin: 0.1rem 0 0.1rem 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: space-between;
        .shop_underfind_up{
          font-size: 0.28rem;
          font-weight: 500;
          color: #999999;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .shop_underfind_down{
          height: 0.45rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-content: center;
          .shop_underfind_left{
            font-size: 0.24rem;
            line-height: 0.45rem;
          }
          .shop_underfind_right{
            width: 1.2rem;
            height: 0.45rem;
            border: 1px solid #FE1951;
            border-radius: 0.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  .knxh{
    width: 100%;
    .title{
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      overflow: hidden;
      span{
        float: left;
      }
      .text1{
        margin-left: 2.2rem;
      }
      img{
        width: 0.31rem;
        height: 0.31rem;
        display: block;
        float: left;
        margin-top: 0.25rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
      }
    }
  }
  .shop_bottom{
    height: 1rem;
    background:#fff;
    padding:0 0.2rem;
    overflow: hidden;
    border-top: 1px solid #D8D8D8;
    position: fixed;
    bottom: 0;
    width: 7.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/ .van-checkbox__label{
      margin-left: 3px;
      font-size: 0.24rem;
    }
    .shop_right{
      flex:1;
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 0.18rem;
      color: #333333;
      button{
        width: auto;
        padding: 0 0.2rem;
        margin-left: 0.14rem;
        font-size: 0.24rem;
      }
    }
    .shop_right1 {
      b{
        padding: 0 0.1rem;
        color: #CCCCCC;
      }
      span.price{
        color: #FE1A52;
        font-size: 0.24rem;
        margin-left: 0.06rem;
      }
      button{
        margin-left: 0.06rem;
      }
    }
  }
}
</style>
