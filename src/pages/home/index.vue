<template>
  <div id="home" ref="home">
    <div class="page_bac"></div>
    <div class="titleTab" :style="{paddingTop: statusH + 'rem'}">
      <div class="title">
        <div class="search">
          <i class="iconfont1"></i>
          <input type="text" v-model="searchText" placeholder="请输入搜索内容"/>
          <div class="search_btn" @click="toSearch">搜索</div>
        </div>
        <!-- <div class="news" @click="jumpTo('/news')">
          <img class="xxicon" src="@/assets/img/home/news.png" alt />
        </div> -->
      </div>
      <div class="tabBox">
        <div v-for="(item, index) in navList" :key="index" @click="jumpTo('/classification?i='+(index))" :class="'tab'">{{item.name}}</div> 
      </div>
    </div>
    <div class="page_wrap" :style="{top: 1.8+statusH + 'rem'}">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="page_content">
          <div class="pos_banner">
            <van-swipe class="my-swipe" :autoplay="3000">
              <van-swipe-item v-for="(item, index) in carousel" :key="index">
                <img v-lazy="item.image"/>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="statement">
            <img src="../../assets/img/home/statement.png" alt="">
          </div>
          <div class="nav-slide">
            <ul>
              <li @click="jumpTo({path:'search',query:{indexCateId:item.id}})" v-for="(item, index) in categoryList1" :key="index">
                <div><img :src="item.image" alt=""></div>
                <p>{{item.title}}</p>
              </li>
            </ul>
          </div>
          <div class="fight_order_info">
            <div class="info_lf">
              <img src="../../assets/img/home/fight_order.png" alt="">
            </div>
            <div class="info_rg">
              <div class="info_li" v-for="(item,index) in successSpell1" :key="index">
                <img :src="item.avatar" alt="">
                <div class="text">{{item.mobile}}</div>
                <div class="text text1">{{item.goodsPrice}}元</div>
              </div>
            </div>
            <div class="order_bt" @click="showModel">
              <span>查看全部拼单</span><img src="../../assets/img/home/to_right.png" alt="">
            </div>
          </div>
          <div class="recommend">
            <div class="class_li">
              <div class="lf">
                <img v-if="categoryList2[0]" :src="categoryList2[0].image" alt="" @click="jumpTo({path:'search',query:{recommendId:categoryList2[0].id}})">
              </div>
              <div class="rg">
                <img v-if="categoryList2[1]" :src="categoryList2[1].image" alt="" @click="jumpTo({path:'search',query:{recommendId:categoryList2[1].id}})">
                <img v-if="categoryList2[2]" :src="categoryList2[2].image" alt="" @click="jumpTo({path:'search',query:{recommendId:categoryList2[2].id}})">
              </div>
            </div>
            <div class="class_li1">
              <div class="lf">
                <img v-if="categoryList2[3]" :src="categoryList2[3].image" alt="" @click="jumpTo({path:'search',query:{recommendId:categoryList2[3].id}})">
              </div>
              <div class="lf lf1">
                <img v-if="categoryList2[4]" :src="categoryList2[4].image" alt="" @click="jumpTo({path:'search',query:{recommendId:categoryList2[4].id}})">
              </div>
            </div>
          </div>
          <!-- <div class="nav_slide1">
            <div class="nav" @click="chooseNav(1)">
              <div class="top_img">
                <img v-if="tabIndex1==1" src="../../assets/img/home/cat_ear.png" alt="">
              </div>
              <div class="cont">
                <div class="text" :class="tabIndex1==1?'text1':''">全部</div>
                <div class="text2" :class="tabIndex1==1?'text3':''">猜你喜欢</div>
              </div>
            </div>
            <div class="nav" @click="chooseNav(2)">
              <div class="top_img">
                <img v-if="tabIndex1==2" src="../../assets/img/home/cat_ear.png" alt="">
              </div>
              <div class="cont">
                <div class="text" :class="tabIndex1==2?'text1':''">直营</div>
                <div class="text2" :class="tabIndex1==2?'text3':''">进口好物</div>
              </div>
            </div>
            <div class="nav" @click="chooseNav(3)">
              <div class="top_img">
                <img v-if="tabIndex1==3" src="../../assets/img/home/cat_ear.png" alt="">
              </div>
              <div class="cont">
                <div class="text" :class="tabIndex1==3?'text1':''">美妆</div>
                <div class="text2" :class="tabIndex1==3?'text3':''">美妆好物</div>
              </div>
            </div>
            <div class="nav" @click="chooseNav(4)">
              <div class="top_img">
                <img v-if="tabIndex1==4" src="../../assets/img/home/cat_ear.png" alt="">
              </div>
              <div class="cont">
                <div class="text" :class="tabIndex1==4?'text1':''">个护</div>
                <div class="text2" :class="tabIndex1==4?'text3':''">清洁个护</div>
              </div>
            </div>
            <div class="nav" @click="chooseNav(5)">
              <div class="top_img">
                <img v-if="tabIndex1==5" src="../../assets/img/home/cat_ear.png" alt="">
              </div>
              <div class="cont">
                <div class="text" :class="tabIndex1==5?'text1':''">时尚</div>
                <div class="text2" :class="tabIndex1==5?'text3':''">潮流时尚</div>
              </div>
            </div>
          </div> -->
          <goods-list :list="goodsList" :len="goodsList.length"></goods-list>
        </div>
        <div id="empty_home"></div>
      </mescroll-vue>
    </div>
    <x-dialog v-model="showPin" :mask-z-index="5000" :hide-on-blur="true">
      <div class="show_pin">
        <div class="cont">
          <div class="cont_li" v-for="(item,index) in successSpell2" :key="index">
            <img :src="item.avatar" alt="">
            <span class="text1">{{item.mobile}}</span>
            <span class="text3">{{item.goodsPrice}}元</span>
          </div>
        </div>
      </div>
    </x-dialog>
    <xuanfu :size="size">
      <div class="home-xuanfu" @click="jumpTo('/shopingCart')">
        <img src="../../assets/img/home/shopping_cart.png" alt="">
        <span>购物车</span>
        <em v-show="cartNum > 0">{{cartNum}}</em>
      </div>
    </xuanfu>
  </div>
</template>

<script>
import { Tab, TabItem, XDialog, XCircle, TransferDomDirective as TransferDom } from "vux";
import MescrollVue from "mescroll.js/mescroll.vue";
import GoodsList from '@/components/homeGoods'
import xuanfu from '@/components/xuanfu'
export default {
  name: "home",
  data() {
    return {
      statusH: "", //状态栏
      size: 0,     //尺寸
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
          warpId: "empty_home",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div>"
        },
      },
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹
      tabIndex:0,
      navList:[],       // 顶部分类 
      carousel: [],     // 轮播
      tabIndex1:1,
      categoryList1:[], // 商品分类
      categoryList2:[], // 推荐
      showPin:false,
      goodsList:[],//商品列表
      successSpell1:[],//成功拼单数据
      successSpell2:[],//成功拼单数据
      searchText:'',
      cartNum: 0
    };
  },
  activated () {
    this.getCategory();
  },
  created() {
    // let isGuid = localStorage.getItem('isGuid')?localStorage.getItem('isGuid'):false
    // if(!isGuid){
    //   this.$router.push('/guide')
    // }
    this.getCate()
    this.getSwiperInfo()
    this.getCategory()
    this.getSpell(3)
    let size = document.documentElement.clientWidth / 7.5;
    this.size = size;
    this.statusH = window.api ? api.safeArea.top / size : 0;
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
    refresh() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    getCate () {  // 获取分类数据  
      this.$http.get("/goods/getcategory", {}, false).then(res => {
        // let obj = {name: '专柜自提', id: 0}, arr = res.data || [];
        // arr.unshift(obj)
        let arr = res.data || [];
        this.navList = arr;
        console.log(this.navList)
      }).catch(e => {
        mescroll.endErr();
      });
    },
    upCallback(page, mescroll) {  // 商品列表数据
      this.$http.get("/index/getPinterest", {pn: page.num}, true).then(response => {
        let arr = response.data;
        if (page.num === 1) this.goodsList = [];
        this.goodsList = this.goodsList.concat(arr);
        this.$nextTick(() => {
          mescroll.endSuccess(this.goodsList.length);
        });
      }).catch(e => {
        mescroll.endErr();
      });
    },
    backTop () {
      setTimeout(() => { this.$refs.my_scroller.scrollTo(0, 0, true);}, 10);
    },
    chooseNav (num) {
      this.tabIndex1 = num
    },
    showModel () {//显示全部拼单
      this.showPin = true
      this.getSpell(20)
    },
    getSwiperInfo () {//获取轮播图
      this.$http.get("/index/getSliderImg", {}, true).then(res => {
        if (res.code == 1) {
          this.carousel = res.data
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
    getCategory(){//获取轮播下分类
      this.$http.get("/index/getIndexCategory",{type:''},true).then(res => {
        if (res.code == 1) {
          this.categoryList1 = res.data.indexCate
          this.categoryList2 = res.data.recommend
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
      this.$http.get('/index/cartNum', {}, true).then((res) => {
        if(res.code == 1){
          this.cartNum = res.data;
        }
      })
    },
    getSpell(num){//获取拼单成功数据
      if(num!=3){
        this.$http.get("/task/spellSuccess", {limit:num}, true).then(res => {
          if (res.code == 1) {
            this.successSpell2 = res.data.list
          } else {
            this.$vux.toast.text(res.msg);
          }
        });
        
      }else{
        this.$http.get("/task/spellSuccess", {limit:num}, true).then(res => {
          if (res.code == 1) {
            this.successSpell1 = res.data.list
          } else {
            this.$vux.toast.text(res.msg);
          }
        });
      }
    },
  },
  components: {
    XDialog,
    XCircle,
    MescrollVue,
    Tab,
    TabItem,
    GoodsList,
    xuanfu
  },
  directives: {
    TransferDom
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.mescroll) {
        vm.mescroll.hideTopBtn(0);
        // 滚动到之前列表的位置
        if (vm.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.lastScrollTop);
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
        // 恢复到之前设置的isBounce状态
        if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.mescroll) {
      this.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
      this.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
    }
    next();
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/common";
#home {
  position: relative;
  height: 100%;
  background: #f9f9f9;
  overflow: hidden;
  /deep/ .mescroll-downwarp .downwarp-content {
    padding: 0;
    line-height: 70px;
    height: 70px;
  }
  /deep/ .mescroll-downwarp .downwarp-progress {
    border-color: #fff;
    border-bottom-color: transparent;
  }
  /deep/ .mescroll-downwarp .downwarp-tip {
    color: #fff;
  }
  .page_bac{
    width: 100%;
    height: 3.1rem;
    background: url("../../assets/img/home/banner.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left:0;
    top: 0;
  }
  .titleTab {
    width: 100%;
    height: 1.8rem;
    overflow: hidden;
    position: fixed;
    color: #ffffff;
    z-index: 11;
    background: linear-gradient(90deg,#b569d9 0%,#4b54f8 100%);
    .title {
      width: 100%;
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.1rem;
      position: relative;
      .search {
        width: 5.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        background: #F5F5F5;
        border-radius: 0.3rem;
        margin: 0 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border:none;
        position: relative;
        .iconfont1 {
          width: 0.3rem;
          height: 0.3rem;
          margin-left: 0.2rem;
          background: url("../../assets/img/home/search.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 0.2rem;
        }
        input {
          width: 5.6rem;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.3rem;
          border: none;
          color: #333333;
          background: #F5F5F5;
        }
        span {
          flex: 1;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.24rem;
          border-radius: 0.3rem;
          border: none;
          background: #F5F5F5;
          color: #9a9a9a;
        }
        .search_btn{
          width: 1.2rem;
          height: 0.62rem;
          line-height: 0.62rem;
          text-align: center;
          color: #fff;
          background: linear-gradient(-90deg,rgba(201,63,203,1) 0%,rgba(119,49,239,1) 100%);
          border-radius: 0.3rem;
          position: absolute;
          right: -0.24rem;
          top:-0.01rem;
        }
      }
      .news{
        width: 0.42rem;
        height: 0.42rem;
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
      }
    }
    .tabBox {
      width: 7rem;
      height: 0.8rem;
      margin: 0 0.25rem;
      overflow-y: hidden;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display: flex;
      align-items: center;
      .tab{
        padding:0 0.2rem;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
        margin-right: 0.12rem;
        flex-shrink: 0;
      }
      .active{
        background: linear-gradient(135deg,#9728EF 0%,#C474CB 100%);
        border-radius: 0.25rem 0.25rem 0.25rem 0;
      }
      .tab:last-child{
        margin-right: 0;
      }
    }
  }
  .page_wrap{
    width: 100%;
    position: absolute;
    left:0;
    top: 1.8rem;
    z-index: 2;
    bottom: 0;
    overflow: hidden;
    .page_content{
      width: 100%;
    }
    .pos_banner{
      width: 7.1rem;
      margin: 0 0.2rem;
      height: 3.18rem;
      border-radius: 0.2rem;
      overflow: hidden;
      .my-swipe {
        .van-swipe-item {
          img {
            width: 100%;
            height: 3.18rem;
            display: block;
          }
        }
      }
    }
    .statement{
      height: 0.56rem;
      border-radius: 0.2rem;
      width: 7.1rem;
      margin: 0.2rem 0.2rem 0;
      img{
        width: 100%;
      }
    }
    .nav-slide {
      width: 7.1rem;
      padding: 0.3rem 0.2rem 0;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 20%;
          height: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          div {
            width: 0.88rem;
            height: 0.88rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 100%;
              height: 100%;
              display: block;
              border-radius: 50%;
            }
          }
          p {
            font-size: 0.22rem;
            height: 0.22rem;
            line-height: 0.22rem;
            margin-top: 0.1rem;
          }
          span {
            position: absolute;
            color: #fff;
            height: 0.4rem;
            padding: 0 0.15rem;
            font-size: 0.15rem;
            right: 0;
            top: -0.2rem;
            text-align: center;
            line-height: 0.4rem;
            background: url("../../assets/img/jdmy/wode/yf.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .fight_order_info{
      width: 7.1rem;
      margin:0.1rem 0.2rem 0;
      padding: 0.2rem 0 0.1rem 0;
      box-sizing: border-box;
      overflow: hidden;
      background: #fff;
      box-shadow:0px 0px 13px 0px rgba(202, 202, 202, 0.35);
      border-radius: 0.1rem;
      .info_lf{
        width: 1.5rem;
        float: left;
        img{
          width: 1.06rem;
          height: 1.74rem;
          display: block;
          margin: 0 auto;
          margin-top: 0.2rem;
        }
      }
      .info_rg{
        width: calc(100% - 1.7rem);
        margin-left: 0.2rem;
        float: left;
        .info_li{
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          overflow: hidden;
          margin-bottom: 0.2rem;
          img{
            width: 0.48rem;
            height: 0.48rem;
            float: left;
            border-radius: 50%;
            border: 1px solid #dddddd;
            margin-top: 0.04rem;
          }
          .text{
            float: left;
            font-size: 0.26rem;
            color: #343434;
            padding: 0 0.4rem;
          }
          .text1{
            color: #FF474C;
          }
        }
      }
      .order_bt{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        overflow: hidden;
        img{
          width: 0.22rem;
          height: 0.22rem;
          float: left;
          margin-left: 0.2rem;
          margin-top: 0.2rem;
        }
        span{
          float: left;
          font-size: 0.24rem;
          color: #666666;
          margin-left: 2.5rem;
        }
      }
    }
    .recommend{
      width: 7.1rem;
      background-color: #ffffff;
      margin: 0.3rem 0.2rem 0;
      .class_li{
        width: 100%;
        height: 3.57rem;
        overflow: hidden;
        .lf{
          width: 3.27rem;
          height: 100%;
          float: left;
          border-radius: 0.2rem;
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .rg{
          width: 3.63rem;
          height: 100%;
          float: left;
          margin-left: 0.2rem;
          img{
            width: 100%;
            height: 1.73rem;
            display: block;
            margin-bottom: 0.1rem;
            border-radius: 0.2rem;
          }
          img:last-child{
            margin-bottom: 0;
          }
        }
      }
      .class_li1{
        width: 100%;
        height: 2.42rem;
        overflow: hidden;
        margin-top: 0.1rem;
        .lf{
          width: 3.27rem;
          height: 100%;
          float: left;
          margin-right: 0.2rem;
          border-radius: 0.2rem;
          img{
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 0.2rem;
          }
        }
        .lf1{
          width: 3.63rem;
          margin-right: 0;
        }
      }
    }
    .nav_slide1{
      width: 100%;
      margin-top: 0.3rem;
      overflow: hidden;
      .nav{
        width: 20%;
        float: left;
        .top_img{
          width: 0.7rem;
          height: 0.13rem;
          margin: 0 auto;
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .cont{
          width: 100%;
          text-align: center;
          border-right: 1px solid #DFDFDF;
          .text{
            font-size: 0.3rem;
            font-weight: 800;
            color: #343434;
          }
          .text1{
            background:linear-gradient(-30deg,rgba(164,108,214,1) 0%, rgba(84,86,238,1) 100%);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }
          .text2{
            width: 1.15rem;
            height: 0.4rem;
            line-height: 0.4rem;
            border-radius: 0.2rem;
            margin: 0 auto;
            font-size: 0.24rem;
            color: #666666;
          }
          .text3{
            color: #ffffff;
            background:linear-gradient(-30deg,rgba(164,108,214,1) 0%, rgba(84,86,238,1) 100%);
          }
        }
      }
    }
  }
  .show_pin{
    width: 6rem;
    height: 8.25rem;
    background: url("../../assets/img/home/wrap1.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .cont{
      width: 100%;
      height: calc(100% - 1.2rem);
      overflow-y: auto;
      margin-top: 1.2rem;
      padding: 0 0.3rem 1rem;
      box-sizing: border-box;
      .cont_li{
        width: 100%;
        height: 100%;
        height: 1rem;
        line-height: 1rem;
        overflow: hidden;
        img{
          width: 0.7rem;
          height: 0.7rem;
          display: block;
          float: left;
          border-radius: 50%;
          margin-top: 0.15rem;
        }
        .text1{
          width: 1.8rem;
          font-size: 0.24rem;
          color: #999999;
          float: left;
          text-align: center;
          margin-left: 0.5rem;
        }
        .text2{
          width: 1.8rem;
          font-size: 0.24rem;
          color: #333333;
          float: left;
          text-align: center;
        }
        .text3{
          font-size: 0.3rem;
          color: #F20226;
          float: right;
        }
      }
    }
  }
}
#home/deep/.weui-dialog {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  background-color: transparent;
}
.home-xuanfu{
  width: 1rem;
  height: 1rem;
  position: relative;
  background: #fff;
  border-radius: 0.1rem;
  box-shadow: 1px 2px 18px 0px rgba(204, 204, 204, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 0.5rem;
  }
  span{
    font-size: 0.24rem;
    font-weight: 500;
    color: #343434;
    line-height: 0.34rem;
    background: linear-gradient(-30deg, #A46CD6 0%, #5456EE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  em{
    font-style: normal;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    border-radius: 50%;
    background: #f00;
    color: #fff;
    font-size: 0.22rem;
    text-align: center;
    position: absolute;
    right: 0.1rem;
    top: 0.06rem;
  }
}
</style>
