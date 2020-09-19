<template>
  <div id="goods_detail">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a class="left" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="tabBox">
        <div class="main">
          <div :class="active === 1 ? 'active':''" @click="handActive(1)">商品</div>
          <div :class="active === 2 ? 'active':''" @click="handActive(2)">评价</div>
          <div :class="active === 3 ? 'active':''" @click="handActive(3)">详情</div>
        </div>
      </div>
      <div class="right" @click="shareTask" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-fenxiang"></i>
      </div>
    </div>
    <div class="page_wrap" v-if="detailInfo">
      <div class="page_pos">
        <mescroll-vue ref="mescroll" id="page_pos" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="good_img" >
            <van-swipe class="my-swipe" @change="onChange">
              <van-swipe-item v-for="(item, index) in swiperInfo" :key="index">
                <video v-if="item.type!=1" id="myVideo" class="video-js" controls autoplay="muted" 
                  preload="auto" :poster="item.videoThumbnailURL">
                  <source :src="item.url" type="video/mp4">
                </video>
                <img v-if="item.type==1" :src="item.url | addUrlHeader"/>
                <!-- <div class="video_img" v-if="!isPlayVideo">
                  <img class="img_bg" :src="item.videoThumbnailURL" alt="">
                  <div class="img_cover"></div>
                  <img class="img_bt" src="../../assets/img/home/playbtn1.png" alt="" @click=>
                </div> -->
              </van-swipe-item>
              <!-- <van-swipe-item v-for="(item, index) in detailInfo.images" :key="index">
                <img v-lazy="item"/>
              </van-swipe-item> -->
              <template #indicator>
                <div class="custom-indicator">
                  {{ current + 1 }}/{{swiperInfo.length}}
                </div>
              </template>
            </van-swipe>
          </div>
          <div class="good_info">
            <div class="price"><span>￥</span>{{detailInfo.priceRange}}</div>
            <div class="title">{{detailInfo.title}}</div>
            <div class="baoxian"><a>享丨退货运费险</a></div>
            <div class="line"></div>
            <div class="yunfei">
              <span>运费</span>
              <span>免运费</span>
              <span>{{detailInfo.sales}}</span>
            </div>
            <div class="fuwu">
              <span>服务</span>
              <span>正品保障·不支持7天退换</span>
            </div>
            <div class="line"></div>
          </div>
          <!-- <div class="pindan">
            <div class="title">
              <span>正在发起拼单，可直接参与</span>
              <span @click="showModel">查看全部</span>
            </div>
            <div class="pindan_li">
              <img src="" alt="">
              <div class="text1">123****8901</div>
              <div class="text2" @click="showJoinGroup">去拼单</div>
              <div class="text3">抢占名额</div>
            </div>
            <div class="pindan_li">
              <img src="" alt="">
              <div class="text1">123****8901</div>
              <div class="text2" @click="showJoinGroup">去拼单</div>
              <div class="text3">抢占名额</div>
            </div>
            <div class="line"></div>
          </div> -->
          <div class="pingjia_wrap">
            <div class="title">
              <span>商品评价({{detailInfo.commentCount || 0}})</span>
              <span @click="jumpTo('appraisalList?id='+id)" v-if="commentInfo && commentInfo.length">查看全部  ></span>
            </div>
            <div v-if="commentInfo && commentInfo.length">
              <div class="pingjia_li" v-for="(item,index) in commentInfo.slice(0,2)" :key="index">
                <div class="user">
                  <img :src="item.userAvatar | addUrlHeader" alt="">
                  <span>{{item.userNick}}</span>
                </div>
                <div class="cont">{{item.content}}</div>
                <!-- <div class="cont1" v-if="item.skuMap">网络类型:无需合约版;机身颜色:黄色;套餐:官方标配;存储容量大小</div> -->
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div class="tuijian" v-if="recommendInfo && recommendInfo.length">
            <div class="title">为你推荐</div>
            <div class="tj_wrap">
              <div class="tj_good" :class="(index+1)%3!=0?'tj_good1':''" v-for="(item,index) in recommendInfo" :key="index">
                <img src="" alt="">
                <div class="text">【百亿补贴11号专 享价】Apple/苹果手机</div>
                <div class="text1">￥4999.0</div>
              </div>
            </div>
          </div>
          <div class="xiangqing" v-if="detailInfo && detailInfo.content">
            <div class="title">-宝贝详情-</div>
            <div class="xq_img">
              <img :src="item | addUrlHeader" alt="" v-for="(item,index) in detailInfo.content" :key="index">
            </div>
          </div>
          <div class="knxh">
            <div class="title">
              <span class="text1">——</span>
              <img src="../../assets/img/home/xin.png" alt="">
              <span>你可能还喜欢  ——</span>
            </div>
            <goods-list :list="goodsList" :len="goodsList.length"></goods-list>
          </div>
          <div id="empty_detail"></div>
        </mescroll-vue>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="div_flex" @click="toTalk">
          <p>
            <img src="../../assets/img/home/kefu.png" alt="">
          </p>
          <span>客服</span>
        </div>
        <div class="div_flex" @click="collectGood">
          <p>
            <img src="../../assets/img/home/shoucang.png" alt="">
          </p>
          <span>收藏</span>
        </div>
        <div class="div_flex" @click="showSku(3)">
          <p>
            <img src="../../assets/img/home/shop_cart.png" alt="">
          </p>
          <span>购物车</span>
        </div>
      </div>
      <div class="right_btn">
        <div class="btn1" @click="showSku(1)">
          <div>￥{{price}}</div>
          <div>单独购买</div>
        </div>
        <div class="btn2" @click="showSku(2)">
          <div class="text1">￥{{price1}}</div>
          <div class="text2">价格拼团</div>
        </div>
      </div>
    </div>
    <x-dialog
      v-model="showPin"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="show_pin">
        <div class="title">正在发起拼单</div>
        <div class="cont">
          <div class="cont_li" v-for="(item,index) in 9" :key="index">
            <img src="" alt="">
            <span class="text1">132****1236</span>
            <span class="text2" @click="showJoinGroup">去拼单</span>
          </div>
        </div>
        <div class="close" @click="closeMdel">
          <img src="../../assets/img/home/cancel.png" alt="">
        </div>
      </div>
    </x-dialog>
    <x-dialog
      v-model="showJoin"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="show_join">
        <div class="title">参与135****4536的拼单</div>
        <div class="title1">抢占名额</div>
        <div class="cont">
          <div class="group_wrap">
            <div class="group_li" v-for="(item,index) in 5" :key="index">
              <div class="img_wrap">
                <!-- <img src="" alt=""> -->
                <span>?</span>
              </div>
              <div class="host" v-if="index==0">拼主</div>
            </div>
          </div>
          <div class="join_btn">参与拼单</div>
        </div>
        <div class="content">
          <img src="" alt="">
          <div class="cont_right1">
            <div class="title">李宁防雾泳镜李宁防雾泳镜李宁防雾泳镜李宁防雾泳</div>
            <div class="rg_bt">
              一层
            </div>
          </div>
          <div class="cont_right2">
            <div>¥11.49</div>
            <div>x1</div>
          </div>
        </div>
        <div class="bt_full"></div>
        <div class="close" @click="closeJoinGroup">
          <img src="../../assets/img/home/cancel.png" alt="">
        </div>
      </div>
    </x-dialog>
    <div class="share_to" v-if="showShare">
      <div class="weui-mask"></div>
      <div class="classBox">
        <div>
          <img src="../../assets/img/home/share_wechat.png" alt @click="shareFri(1)" />
          <p>微信</p>
        </div>
        <div>
          <img src="../../assets/img/home/share_qq.png" alt @click="shareFri(2)" />
          <p>QQ</p>
        </div>
        <div>
          <img src="../../assets/img/home/copy_link.png" alt @click="copyLink" />
          <p>复制链接</p>
        </div>
      </div>
      <div class="download_img">
        <img class="good_img" :src="shareImg" alt="">
        <img class="pos_img" src="../../assets/img/home/dowload.png" alt="" @click="dowloadImg">
      </div>
      <div class="bt_btn" @click="showShare = false">取消</div>
    </div>
    <!--选择规格-->
    <div v-transfer-dom>
      <popup v-model="isShowSku" position="bottom" width="100%" :hide-on-blur="true">
        <div class="detail_model" v-if="detailInfo">
          <div class="sku_header">
            <div class="header_main">
              <div class="img_box">
                <img :src="skuImg | addUrlHeader" alt />
              </div>
              <div class="right_main">
                <div class="div1" v-if="buyType==1">¥ {{price}}</div>
                <div class="div1" v-if="buyType==2">¥ {{price1}}</div>
                <div class="div2">请选择：
                  <span v-for="(item,index) in detailInfo.props" :key="index">
                    {{item.name}}
                  </span>
                  数量
                </div>
                <!-- <div class="div2">{{skuName}}</div> -->
              </div>
            </div>
          </div>
          <div class="model_main" v-for="(item,index) in detailInfo.props" :key="item.pid">
            <p>{{item.name}}</p>
            <div class="list">
              <div :class="itm.vid==skuArry[index]?'active':''" v-for="itm in item.values" :key="itm.vid" @click="chooseSku(index,itm.vid)">{{itm.name}}</div>
            </div>
          </div>
          <div class="num_main">
            <x-number
              title="数量"
              v-model="buyNum"
              width="0.8rem"
              :min="1"
              button-style="round">
            </x-number>
          </div>
          <div class="footer_buy" @click="goBuy">
            <div>{{buyType == 3 ? '加入购物车' : '立即购买'}}</div>
          </div>
          <!-- <div class="btn_close">
            <img src="../../assets/img/home/cancel.png" alt @click="isShowSku = false" />
          </div> -->
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem, Popup, TransferDom, XNumber, } from "vux";
import * as utils from "../../utils";
import MescrollVue from "mescroll.js/mescroll.vue";
import GoodsList from '@/components/homeGoods'
export default {
  name: "goods_detail",
  components: {
    XDialog,
    Tab,
    TabItem,
    Popup, 
    XNumber,
    GoodsList,
    MescrollVue,
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      
      id: '',
      statusH:0,
      active:1,
      showPin:false,
      showJoin:false,
      showShare:false,
      isShowSku:false,
      buyNum:1,
      detailInfo:null,
      current:0,
      isPlayVideo:false,
      commentInfo:null,
      swiperInfo:[],
      recommendInfo:null,
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
      goodsList:[],
      kefyInfo:null,
      price:0,//价格
      price1:0,//拼团价格
      skuArry:[],//初始sku
      skuImg:'',
      skuId:'',
      skuName:'',
      buyType:null,
      shareUrl:'',
      shareImg:'',
    };
  },
  
  watch:{
    $route (to,from) {
      if(to.name=="goodsDetail"){
        this.id = this.$route.query.goodsId?this.$route.query.goodsId:''
        let body = document.getElementById("page_pos");
        body.scrollTop = 0;
        this.active = 1;
        this.getGoodsDetail()
        this.getComment()
        this.getRecommend()
        this.getKFinfo()
        this.refresh()
      }
    }
  },
  methods: {
    toTalk(){
      api.openWin({
        name: 'badidu',
        url: this.kefyInfo.bdsqurl
      });
    },
    refresh() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {  // 商品列表数据
      this.$http.get("/goods/getLIke", {pn: page.num}, true).then(response => {
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
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        // width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        // height: "400px"
      });
    },
    handActive(key) {
      let body = document.getElementById("page_pos");
      if (key === 1) {
        body.scrollTop = 0;
        this.active = key;
      } else if (key === 2) {
        body.scrollTop = 582;
        this.active = key;
      } else if (key === 3) {
        body.scrollTop = 1242;
        this.active = key;
      }
    },
    handleScroll() {
      var offsetTop = document.querySelector("#page_pos")
        ? document.querySelector("#page_pos").scrollTop
        : 10;
      if (offsetTop < 582) {
        this.active = 1;
      } else if (offsetTop < 1242 && offsetTop >= 582) {
        this.active = 2;
      } else {
        this.active = 3;
      }
    },
    //显示全部拼单
    showModel(){
      this.showPin = true
    },
    closeMdel(){
      this.showPin = false
    },
    //参与拼单
    showJoinGroup(){
      this.showJoin = true
      this.showPin = false
    },
    closeJoinGroup(){
      this.showJoin = false
    },
    //展示sku
    showSku(num) {
      document.getElementsByClassName("vux-number-input")[0].setAttribute("disabled", true);
      this.isShowSku = true;
      this.buyType = num
    },
    //购买
    goBuy(){
      let id = this.$route.query.goodsId?this.$route.query.goodsId:''
      if(!this.buyNum){
        this.$vux.toast.text("请选择购买商品数量");
        return
      }
      if(this.buyType == 3){ // 添加购物车
        this.addCart(id, this.skuId, this.buyNum)
      } else {// 立即购买
        this.$router.push({
          name:"verify_order",
          query:{
            goodsId:id,
            skuId:this.skuId,
            quantity:this.buyNum,
            model:this.buyType
          }
        })
      }
    },
    getLike(){
      let likes = utils.storage.get('goodsLike') || [];
      for(let i = 0; i<likes.length; i++){
        if(this.id == likes[i].id){
          likes.splice(i, 1);
          break ;
        }
      }
      likes.unshift({id: this.id, times: new Date().getTime()});
      utils.storage.set('goodsLike', likes)
    },
    onChange(index) {
      this.current = index;
    },
    //获取商品详情
    getGoodsDetail(){
    
      let id = this.$route.query.goodsId?this.$route.query.goodsId:''
      this.$http.post("/goods/detail",{goodsid:id},true)
      .then(res => {
        if (res.code == 1) {
          this.detailInfo = res.data
          this.price = this.detailInfo.price
          let percent = Number(this.$store.state.global.initData.percent)/100
          this.price1 = utils.accMul(this.detailInfo.price, percent)
          this.price1.toFixed(2)
          
          this.swiperInfo = []
          this.$nextTick(()=>{
              if(res.data.videos){
                res.data.videos.forEach(item => {
                  this.swiperInfo.push(item)
                });
             }
              if(res.data.images){
                res.data.images.forEach(item => {
                  this.swiperInfo.push({
                    type:1,
                    url:item
                  })
                });
              }
          })
          
         
         
          
          if(res.data.props){
            this.skuArry = []
            res.data.props.forEach(item => {
              this.skuArry.push(item.values[0].vid)
            });
            this.getSkuAll()
          }
          
        } else {
          // this.$vux.toast.text(res.msg);
        }
      });
    },
    //获取评论
    getComment(){
      let id = this.$route.query.goodsId?this.$route.query.goodsId:''
      this.$http.post("/comment/getTmallComment",{goodsid:id},true).then(res => {
        if (res.code == 1) {
          this.commentInfo = res.data
        } else {
          // this.$vux.toast.text(res.msg);
        }
      });
    },
    //为你推荐
    getRecommend(){
      let id = this.$route.query.goodsId?this.$route.query.goodsId:''
      this.$http.post("/goods/recommendList",{goodsid:id},true)
      .then(res => {
        if (res.code == 1) {
          this.recommendInfo = res.data
        } else {
          // this.$vux.toast.text(res.msg);
        }
      });
    },
    //获取客服信息
    getKFinfo(){
      this.$http
        .post(
          "/mc/kfInfo",
        )
        .then(res => {
          if(res.code == 1){
            this.kefyInfo = res.data
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //收藏
    collectGood(){
      let id = this.$route.query.goodsId ? this.$route.query.goodsId : '';
      this.$http.post("/collect/collect", {goodsId:id},true).then(res => {
        if (res.code == 1) {
          this.$vux.toast.text(res.msg);
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
    //加入购物车
    addCart(id, sku, num){
      let token = utils.storage.get('token');
      this.$http.post("/Cart/add?token="+token+'&goodsId='+id+'&quantity='+num+'&skuId='+sku,{},true)
      .then(res => {
        if (res.code == 1) {
          this.$vux.toast.text(res.msg);
          this.jumpTo('/shopingCart')
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
    //选择sku
    chooseSku(index,id){
      this.skuArry.splice(index,1,id)
      this.getSkuAll()
    },
    //获取sku集合
    getSkuAll(){
      let skuStr = ''
      this.detailInfo.props.forEach((item,index) => {
        if(index == 0){
          skuStr = this.detailInfo.props[index].pid + ':' + this.skuArry[index]
        }else{
          skuStr = skuStr + ';' + this.detailInfo.props[index].pid + ':' + this.skuArry[index]
        }
      });
      this.detailInfo.sku.forEach((item,index) => {
        if(item.propPath.indexOf(skuStr) > -1){
          this.price = item.price
          let percent = Number(this.$store.state.global.initData.percent)/100
          this.price1 = utils.accMul(this.price, percent)
          this.price1.toFixed(2)
          this.skuImg = item.image
          this.skuId = item.skuId
          this.skuName = item.skuName
        }
      });
      if(!this.skuArry.length){
        this.skuImg = this.detailInfo.image
      }
    },
    //分享
    shareTask(){
      this.$http
        .post(
          "/task/shareGoods",
          {goodsId:this.id}
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
  },
  created() {
    // this.imgqianzhui = utils.storage.get("imgUrl")?utils.storage.get("imgUrl"):''
    this.id = this.$route.query.goodsId?this.$route.query.goodsId:''
    this.getGoodsDetail()
    this.getComment()
    this.getRecommend()
    this.getKFinfo()
    
    this.getLike()
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style scoped lang='less'>
#goods_detail{
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
    background-color: #ffffff;
    .left {
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
      .iconfont {
        font-weight: 1000;
      }
    }
    .tabBox{
      width: 3rem;
      height: 0.88rem;
      margin: 0 auto;
      .main{
        width:100%;
        height: 100%;
        line-height: 0.88rem;
        display: flex;
        justify-content: space-around;
        font-size: 0.28rem;
        color: #9A9A9A;
        .active{
          border-bottom:1px solid #E6083C;
          padding-bottom:0.1rem;
          color:#E6083C;
        }
      }
    }
    .right{
      position: absolute;
      top: 0.2rem;
      right: 0.3rem;
    }
  }
  .page_wrap{
    width: 100%;
    position: absolute;
    top: 0.88rem;
    bottom: 1.1rem;
    height: auto !important;
    .page_pos{
      height: 100%;
      width: 100%;
      overflow: auto;
      .line{
        border-top: 1px solid #F1F1F1;
      }
      .good_img{
        width: 100%;
        height: 7.37rem;
        position: relative;
        .my-swipe {
          .van-swipe-item {
            img {
              width: 100%;
              height: 7.37rem;
              display: block;
            }
            #myVideo{
              width: 100%;
              height: 7.37rem;
            }
            .video_img{
              width: 100%;
              height: 7.37rem;
              position: relative;
              .img_bg{
                width: 100%;
                height: 100%;
                display: block;
              }
              .img_cover{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #000000;
                opacity: 0.5;
              }
              .img_bt{
                width: 0.78rem;
                height: 0.78rem;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -0.39rem;
                margin-top: -0.39rem;
              }
            }
          }
          .custom-indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            background: #fff;
          }
        }
      }
      .good_info{
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background-color: #ffffff;
        .price{
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          color: #FC5205;
          font-size: 0.48rem;
          span{
            font-size: 0.3rem;
          }
        }
        .title{
          height: 1rem;
          font-size: 0.3rem;
          color: #333333;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .baoxian{
          width: 100%;
          overflow: auto;
          margin: 0.2rem 0;
          a{
            height: 0.1rem;
            display: inline-block;
            line-height: 0.1rem;
            padding: 0.2rem;
            background-color: #FFEBF5;
            color: #D33664;
            border-radius: 0.2rem;
          }
        }
        .yunfei{
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          overflow: hidden;
          span{
            font-size: 0.26rem;
            color: #343434;
          }
          span:first-child{
            float: left;
            color: #9A9A9A;
            margin-right: 0.2rem;
          }
          span:last-child{
            float: right;
            color: #9A9A9A;
          }
        }
        .fuwu{
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          overflow: hidden;
          span{
            font-size: 0.26rem;
            color: #343434;
          }
          span:first-child{
            float: left;
            color: #9A9A9A;
            margin-right: 0.2rem;
          }
        }
      }
      .pindan{
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background-color: #ffffff;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          span:first-child{
            float: left;
            font-size: 0.28rem;
            color: #343434;
          }
          span:last-child{
            float: right;
            font-size: 0.28rem;
            color: #9A9A9A;
          }
        }
        .pindan_li{
          width: 100%;
          height: 1.17rem;
          overflow: hidden;
          img{
            width: 0.74rem;
            height: 0.74rem;
            display: block;
            float: left;
            border-radius: 50%;
            margin-top: 0.2rem;
            border: 1px solid #dddddd;
          }
          .text1{
            float: left;
            margin-left: 0.1rem;
            font-size: 0.26rem;
            color: #343434;
            margin-top: 0.4rem;
          }
          .text2{
            width: 1.36rem;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            float: right;
            font-size: 0.28rem;
            background-color: #E02E24;
            color: #ffffff;
            border-radius: 0.1rem;
            margin-top: 0.3rem;
            margin-left: 0.2rem;
          }
          .text3{
            float: right;
            font-size: 0.26rem;
            color: #666666;
            margin-top: 0.4rem;
          }
        }
      }
      .pingjia_wrap{
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background-color: #ffffff;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:first-child{
            color: #343434;
            font-size: 0.28rem;
          }
          span:last-child{
            color: #9A9A9A;
            font-size: 0.28rem;
          }
        }
        .pingjia_li{
          width: 100%;
          margin-bottom: 0.2rem;
          .user{
            width: 100%;
            overflow: hidden;
            img{
              width: 0.74rem;
              height: 0.74rem;
              border-radius: 50%;
              display: block;
              float: left;
              border: 1px solid #dddddd;
            }
            span{
              float: left;
              margin-left: 0.2rem;
              font-size: 0.24rem;
              color: #A8A8A8;
              margin-top: 0.2rem;
            }
          }
          .cont{
            width: 100%;
            // height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.26rem;
            color: #343434;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .cont1{
            width: 100%;
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.26rem;
            color: #B4B4B4;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
      .tuijian{
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background-color: #ffffff;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.28rem;
          color: #343434;
        }
        .tj_wrap{
          width: 100%;
          overflow: hidden;
          .tj_good{
            width: 2.27rem;
            float: left;
            margin-bottom: 0.1rem;
            img{
              width: 100%;
              height: 2.28rem;
              display: block;
              border: 1px solid #dddddd;
            }
            .text{
              font-size: 0.26rem;
              color: #343434;
              height: 0.8rem;
              margin-top: 0.1rem;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .text1{
              font-size: 0.28rem;
              color: #FF043A;
            }
          }
          .tj_good1{
            margin-right: 0.12rem;
          }
        }
      }
      .xiangqing{
        width: 100%;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          font-size: 0.26rem;
          color: #9A9A9A;
        }
        .xq_img{
          width: 100%;
          img{
            width: 100%;
            margin-bottom: 0.2rem;
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
    }  
  }
  .footer{
    height:1.1rem;
    width:100%;
    background:#fff;
    position: fixed;
    bottom:0;
    overflow: hidden;
    border-top:1px solid #f2f2f2;
    .left{
      height: 100%;
      float: left;
      overflow: hidden;
      .div_flex{
        width: 1rem;
        text-align: center;
        float: left;
        margin-top: 0.2rem;
        p{
          width: 100%;
          img{
            width: 0.36rem;
            height: 0.36rem;
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
    .right_btn{
      height: 100%;
      float: right;
      overflow: hidden;
      >div{
        height:100%;
        float: left;
        color:#fff;
        text-align:center;
        font-size: 0.28rem;
      }
      .btn1{
        width: 2.2rem;
        font-size: 0.28rem;
        background:#F4AAA8;
        div:first-child{
          margin-top: 0.1rem;
        }
      }
      .btn2{
        width: 2.2rem;
        font-size: 0.28rem;
        background:#E02E24;
        div:first-child{
          margin-top: 0.1rem;
        }
      }
    }
  }
  .show_pin{
    width: 5.8rem;
    height: 7.74rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    margin: 2rem auto 0;
    position: relative;
    .title{
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.34rem;
      color: #121212;
      border-bottom: 1px solid #EDEDED;
    }
    .cont{
      width: 100%;
      height: 6.9rem;
      overflow-y: auto;
      .cont_li{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        overflow: hidden;
        border-bottom: 1px solid #EDEDED;
        img{
          width: 0.72rem;
          height: 0.72rem;
          float: left;
          display: block;
          border-radius: 50%;
          margin-top: 0.1rem;
          border: 1px solid #dddddd;
        }
        .text1{
          float: left;
          font-size: 0.26rem;
          color: #121212;
        }
        .text2{
          width: 1.36rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          float: right;
          font-size: 0.26rem;
          color: #ffffff;
          background-color: #E02E24;
          border-radius: 0.2rem;
          margin-top: 0.2rem;
        }
      }
      .cont_li:last-child{
        border-bottom: 0;
      }
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
  .show_join{
    width: 5.8rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    margin: 2rem auto 0;
    position: relative;
    .title{
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.34rem;
      color: #121212;
    }
    .title1{
      font-size: 0.26rem;
      color: #676767;
    }
    .cont{
      width: 100%;
      margin-top: 0.3rem;
      padding: 0 0.5rem;
      box-sizing: border-box;
      .group_wrap{
        width: 100%;
        overflow: hidden;
        .group_li{
          width: 25%;
          float: left;
          margin-bottom: 0.3rem;
          position: relative;
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
          .host{
            position: absolute;
            top: 0;
            left: 0;
            width: 0.6rem;
            height: 0.36rem;
            border-radius: 0.3rem;
            color: #AE6A00;
            padding: 0 0.05rem;
            background-color: #ffac35;
          }
        }
        .group_li:last-child{
          margin-bottom: 0;
        }
      }
      .join_btn{
        width: 5rem;
        height: 0.86rem;
        line-height: 0.86rem;
        text-align: center;
        margin: 0 auto;
        margin-top: 0.2rem;
        color: #ffffff;
        font-size: 0.32rem;
        border-radius: 0.2rem;
        background-color: #E02E24;
      }
    }
    .content{
      width: 100%;
      height: 1.4rem;
      overflow: hidden;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin: 0.3rem 0;
      margin-bottom: 0;
      background-color: #F5F5F5;
      img{
        float: left;
        width: 1.21rem;
        height: 1.21rem;
        border: 1px solid #dddddd;
        margin-top: 0.08rem;
      }
      .cont_right1{
        float: left;
        width: calc(100% - 3rem);
        height: 1.4rem;
        margin-left: 0.2rem;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.4rem;
          font-size: 0.2rem;
          font-weight: 500;
          color: #121212;
          margin-top: 0.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .rg_bt{
          width: 100%;
          font-size: 0.18rem;
          font-weight: 500;
          color: #9A9A9A;
          text-align: left;
        }
      }
      .cont_right2{
        float: right;
        height: 1.4rem;
        overflow: hidden;
        div{
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.2rem;
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
    .bt_full{
      width: 100%;
      height: 0.3rem;
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
.detail_model{
  background:#fff;
  padding:0 0.2rem;
  box-sizing: border-box;
  position:relative;
  .sku_header{
    width:100%;
    height: 1.52rem;
    position: relative;
    .header_main{
      height: 100%;
      display: flex;
      border-bottom:1px solid #EEEEEE;
      .img_box{
        position: absolute;
        top: -0.4rem;
        left: 0;
        img{
          height:1.8rem;
          width:1.8rem;
          border-radius: 0.1rem;
          background: #dddddd;
        }
      }
      .right_main{
        margin-left:2.1rem;
        .div1{
          color:#DF271D;
          font-size:0.3rem;
          margin-top: 0.1rem;
        }
        .div2{
          font-size:0.24rem;
          color:#343434;
        }
      }
    }
  }
  .model_main{
    padding:0.2rem 0;
    border-bottom:1px solid #EEEEEE;
    p{
      font-size:0.24rem;
      color:#343434;
    }
    .list{
      margin-top:0.25rem;
      display: flex;
      padding-left:0.4rem;
      display: -webkit-box;
      overflow-x: auto;
      div{
        padding:0.05rem 0.2rem;
        background:#F4F4F4;
        border-radius: 0.1rem;
        margin-right:0.2rem;
        font-size:0.24rem;
        color: #343434;
      }
      .active{
        background:#ED2800;
        color:#fff;
      }
    }
  }
  .num_main{
    padding:0.4rem 0;
    border-bottom:1px solid #EEEEEE;
    .vux-number-round .vux-number-selector-sub, .vux-number-round .vux-number-selector-plus{
      padding:0.02rem;
    }
    .svg{
      width:0.18rem !important;
      height:0.18rem !important;
    }
    p{
      font-size:0.26rem;
    }
    .weui-cell{
      padding:0;
    }
  }
  .footer_btn{
    padding:0.25rem 0.6rem;
    display: flex;
    div{
      width:50%;
      text-align: center;
      height:0.8rem;
      line-height:0.8rem;
      background:#fe6c77;
      color:#fff;
      font-size:0.32rem;
    }
    .btn1{
      background:#fff;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
    }
    .btn2{
      background:#fff;
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
    }
    .btn3{
      width:100%;
      border-radius: 20px;
      background:#fff
    }
  }
  .footer_buy{
    padding:0.25rem 0.6rem;
    display: flex;
    div{
      width:100%;
      text-align: center;
      height:0.8rem;
      line-height:0.8rem;
      background:#ED2800;
      color:#fff;
      font-size:0.3rem;
    }
  }
  .btn_close{
    position: absolute;
    top:0.25rem;
    right:0.3rem;
    img{
      width:0.37rem;
      height:0.37rem;
    }
  }
}
</style>
