<template>
  <div id="search">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="search">
        <i class="iconfont1" @click="refresh"></i>
        <input type="text" v-model="keyword" placeholder="请输入搜索内容"/>
      </div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <div class="sort_wrap">
        <div class="sort_li" @click="sort(1)">
          <div class="tab_text" :class="sortNum==1?'active':''">综合</div>
          <div class="tab_icon tab_icon1">
            <img src="../../assets/img/home/jiantou1.png" alt="" v-if="sortStatus[0]==1">
            <img src="../../assets/img/home/jiantou3.png" alt="" v-if="sortStatus[0]==3">
          </div>
        </div>
        <div class="sort_li" @click="sort(2)">
          <div class="tab_text" :class="sortNum==2?'active':''">销量</div>
          <div class="tab_icon tab_icon2">
            <img src="../../assets/img/home/jiantou2.png" alt="" v-if="sortStatus[1]==1 || sortStatus[1]==3">
            <img src="../../assets/img/home/jiantou4.png" alt="" v-if="sortStatus[1]==2">
            <img src="../../assets/img/home/jiantou1.png" alt="" v-if="sortStatus[1]==1 || sortStatus[1]==2">
            <img src="../../assets/img/home/jiantou3.png" alt="" v-if="sortStatus[1]==3">
          </div>
        </div>
        <div class="sort_li" @click="sort(3)">
          <div class="tab_text" :class="sortNum==3?'active':''">价格</div>
          <div class="tab_icon tab_icon2">
            <img src="../../assets/img/home/jiantou2.png" alt="" v-if="sortStatus[2]==1 || sortStatus[2]==3">
            <img src="../../assets/img/home/jiantou4.png" alt="" v-if="sortStatus[2]==2">
            <img src="../../assets/img/home/jiantou1.png" alt="" v-if="sortStatus[2]==1 || sortStatus[2]==2">
            <img src="../../assets/img/home/jiantou3.png" alt="" v-if="sortStatus[2]==3">
          </div>
        </div>
        <!-- <div class="sort_li" @click="sort(4)">
          <div class="tab_text" :class="sortNum==4?'active':''">推荐</div>
          <div class="tab_icon tab_icon2">
            <img src="../../assets/img/home/jiantou2.png" alt="" v-if="sortStatus[3]==1 || sortStatus[3]==3">
            <img src="../../assets/img/home/jiantou4.png" alt="" v-if="sortStatus[3]==2">
            <img src="../../assets/img/home/jiantou1.png" alt="" v-if="sortStatus[3]==1 || sortStatus[3]==2">
            <img src="../../assets/img/home/jiantou3.png" alt="" v-if="sortStatus[3]==3">
          </div>
        </div> -->
      </div>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="goods">
          <div class="good_li"  v-for="(item,index) in categoryList" :key="index" @click="jumpTo({path:'goodsDetail',query:{goodsId:item.goodsid}})">
            <img :src="item.image | addUrlHeader" alt="">
            <div class="cont">
              <div class="title">{{item.title}}</div>
              <div class="text1">
                <span>¥</span>
                <span>{{item.price}}</span>
              </div>
              <div class="text2">
                <span>{{item.sales}}</span>
                <!-- <span>好评率92%</span> -->
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
import { XDialog, } from "vux";
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: "search",
  components: {
    XDialog,
    MescrollVue,
  },
  data() {
    return {
      statusH:0,
      sortNum:1,
      sortStatus:[3,1,1,1],//1无状态 2升序 3降序
      sortLog:1,
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
          warpId: "empty_search",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      categoryList:[],//推荐
      keyword:'',
      price:'',
      sales:'',
      orderField:''
    };
  },
  methods: {
    sort(num){
      let arrs = JSON.parse(JSON.stringify(this.sortStatus))  
      if(num==1){
        this.sortNum = num
        arrs.forEach((item,index)=>{
          if(num-1 == index){
            arrs[index] = 3
          }else{
            arrs[index] = 1
          }
        })
        this.orderField = ''
        this.price = ''
        this.sales = ''
        this.refresh()
      }else {
        this.sortNum = num
        arrs.forEach((item,index)=>{
          if(num-1 == index){
            if(this.sortLog == this.sortNum){
              if(item == 2){
                arrs[index] = 3
              }else{
                arrs[index] = 2
              }
            }else{
              arrs[index] = 3
            }
          }else{
            arrs[index] = 1
          }
        })
        if(num==3){
          if(arrs[2]==2){
            this.price = 'desc'
            this.sales = ''
          }else{
            this.price = 'asc'
            this.sales = ''
          }
          this.orderField = 'price'
        }
        if(num==2){
          if(arrs[1]==2){
            this.price = ''
            this.sales = 'desc'
          }else{
            this.price = ''
            this.sales = 'asc'
          }
          this.orderField = 'sales'
        }
      }
      this.refresh()
      this.sortStatus = arrs
      this.sortLog = num
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {
      let keyword = this.$route.query.keyword?this.$route.query.keyword:''
      let indexCateId = this.$route.query.indexCateId?this.$route.query.indexCateId:''
      let recommendId = this.$route.query.recommendId?this.$route.query.recommendId:''
      let selfCateId = this.$route.query.selfCateId?this.$route.query.selfCateId:''
      if(keyword){
        this.keyword = keyword
      }
      let obj = {}
      if(keyword){
        obj = {
          keyword:this.keyword,
          pn:page.num,
          price:this.price,
          sales:this.sales,
          orderField:this.orderField
        }
      }else if(indexCateId){
        obj = {
          indexCateId:indexCateId,
          keyword:this.keyword,
          pn:page.num,
          price:this.price,
          sales:this.sales,
          orderField:this.orderField
        }
      }else if(recommendId){
        obj = {
          recommendId:recommendId,
          keyword:this.keyword,
          pn:page.num,
          price:this.price,
          sales:this.sales,
          orderField:this.orderField
        }
      }else if(selfCateId){
        obj = {
          selfCateId:selfCateId,
          keyword:this.keyword,
          pn:page.num,
          price:this.price,
          sales:this.sales,
          orderField:this.orderField
        }
      }else{
        obj = {
          keyword:this.keyword,
          pn:page.num,
          price:this.price,
          sales:this.sales,
          orderField:this.orderField
        }
      }
      this.$http
        .post("goods/search", obj)
        .then(response => {
          let arr = response.data;
          if (page.num === 1) this.categoryList = [];
          this.categoryList = this.categoryList.concat(arr);
          this.$nextTick(() => {
            mescroll.endSuccess(this.categoryList.length);
          });
        })
        .catch(e => {
          mescroll.endErr();
        });
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
      top: 0.2rem;
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
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    background-color: #ffffff;
    .sort_wrap{
      width: 100%;
      height: 0.8rem;
      height: 0.8rem;
      overflow: hidden;
      background-color: #ffffff;
      border-bottom: 1px solid #E5E5E5;
      .sort_li{
        width: 25%;
        height: 100%;
        line-height: 0.8rem;
        float: left;
        overflow: hidden;
        text-align: center;
        .tab_text{
          float: left;
          font-size: 0.26rem;
          margin-left: 0.6rem;
        }
        .tab_icon{
          float: left;
          margin-left: 0.1rem;
          img{
            width: 0.12rem;
            height: 0.12rem;
            display: block;
          }
        }
        .tab_icon1{
          img:first-child{
            margin-top: 0.35rem;
          }
        }
        .tab_icon2{
          img:first-child{
            margin-top: 0.3rem;
          }
        }
        .active{
          color: #F20226;
        }
      }
    }
    .goods{
      width: 100%;
      .good_li{
        width: 100%;
        overflow: hidden;
        padding: 0 0.2rem;
        box-sizing: border-box;
        img{
          width: 2.36rem;
          height: 2.36rem;
          display: block;
          float: left;
          margin-top: 0.3rem;
          margin-bottom: 0.3rem;
          background-color: #dddddd;
        }
        .cont{
          width: calc(100% - 2.56rem);
          height: 100%;
          margin-left: 0.2rem;
          float: left;
          padding: 0.3rem 0;
          box-sizing: border-box;
          border-bottom: 1px solid #E5E5E5;
          .title{
            width: 100%;
            font-size: 0.24rem;
            color: #333333;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .text1{
            width: 100%;
            margin-top: 0.5rem;
            span:first-child{
              font-size: 0.24rem;
              font-weight: 600;
              color: #F20226;
            }
            span:last-child{
              font-size: 0.32rem;
              font-weight: 600;
              color: #F20226;
            }
          }
          .text2{
            width: 100%;
            margin-top: 0.2rem;
            span{
              font-size: 0.18rem;
              color: #999999;
            }
            span:last-child{
              margin-left: 0.1rem;
            }
          }
        }
      }
      .good_li:last-child{
        .cont{
          border-bottom: none;
        }
      }
    }
  }
}
</style>
