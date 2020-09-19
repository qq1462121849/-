<template>
  <div id="collect">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">商品收藏夹</div>
      <div class="edite" @click="editeList">{{isEdite? '完成' : '编辑'}}</div>
      <div class="news" @click="handSearch">
        <img class="xxicon" src="../../assets/img/home/search.png" alt />
      </div>
    </div>
    <div class="page_wrap" :style="{paddingTop: statusH+0.88+'rem'}">        
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="collect_wrap">
            <div class="collect_li" v-for="(item,index) in list" :key="index">
              <div class="title">{{item.title}}</div>
              <div :class="['cont_wrap', isEdite ? 'cont_wrap1' : '']">
                <div class="cont_li" v-for="(itm,idex) in item.mock" :key="idex">
                  <div class="edite_wrap" v-show="isEdite">
                    <van-checkbox v-model="itm.check" @change="handCheck(itm)" checked-color="#D272E3" icon-size="0.3rem"></van-checkbox>
                  </div>
                  <van-swipe-cell :disabled="isEdite || itm.status != 1">
                    <div class="cont_box">
                      <img class="goodImg" :src="itm.image" alt="">
                      <div class="cont_rg">
                        <div class="title1">{{itm.title}}</div>
                        <div class="text">¥{{itm.price}}</div>
                      </div>
                      <span class="goodNo" v-if="itm.status != 1">失效</span>
                      <img class="goodCart" v-if="itm.status == 1" @click="handDetail(itm)" src="../../assets/img/my/cart.png" alt="">
                    </div>
                    <div slot="right" class="cont_rg1">
                      <div class="title1" @click="handShare(itm)">分享</div>
                      <div class="text" @click="handDelSingle(itm, index, idex)">删除</div>
                    </div>
                  </van-swipe-cell>
                </div>
              </div>
            </div>
          </div>
          <div id="empty_collect"></div>
        </mescroll-vue>
      </div>
    </div>
    <!--选择规格-->
    <van-popup v-model="isShowNum" position="bottom" :overlay="false">
      <div class="collect_model">
        <div class="text">已选{{deleteArry.length}}件</div>
        <div class="btn" @click="handDel"><van-icon name="delete" class="icon"/><span>删除</span></div>
      </div>
    </van-popup>
    <van-popup v-model="showSearch" style="width: 100%; height:100%;" position="right" transition="fade" duration="0">
      <div class="collect-search">
        <div class="gheader" :style="{paddingTop: statusH +'rem'}">
          <img src="../../assets/img/home/search.png" alt="">
          <input type="search" ref="search" placeholder="搜索收藏的商品" @keyup.enter="goSearch" v-model="words" />
          <span @click="searchClose">取消</span>
        </div>
      </div>
    </van-popup>
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
        <img class="pos_img" src="../../assets/img/home/dowload.png" alt="" @click="dowloadImg">
      </div>
      <div class="bt_btn" @click="showShare = false">取消</div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from "../../utils";
export default {
  name: "collect",
  components: {
    MescrollVue,
  },
  data() {
    return {
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
          warpId: "empty_order",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div><div>没找到订单？试试查看全部或更换登录方式</div>"
        },
      },
      isEdite:false,
      isShowNum:false,
      deleteArry:[],
      list:[],
      showSearch: false,
      words: '',
      showShare:false,
      shareImg:'',
      shareUrl:'',
    };
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
      this.$http.get("/collect/getList", { pn: page.num }).then(response => {
        if (page.num === 1) this.list = [];
        let arr = response.data || [];
        setTimeout(() => { mescroll.endSuccess(arr.length);}, 600);
        this.checkArr(arr)
      }).catch(e => {mescroll.endErr();});
    },
    checkArr (arr) {
      let res = [], list = JSON.parse(JSON.stringify(this.list));
      for(let i=0; i<arr.length; i++) {
        if(list.length){
          let btn = true;
          for(let j=0; j<list.length; j++) {
            if(utils.parseTime(list[j].times) == utils.parseTime(arr[i].createtime)){
              btn = false;
            }
          }
          btn && list.push({times: arr[i].createtime, title: utils.timeago(arr[i].createtime*1000),  mock: []});
        } else{
          list.push({times: arr[i].createtime, title: utils.timeago(arr[i].createtime*1000), mock: []});
        }
      }
      for(let i=0; i<arr.length; i++) {
        for(let j=0; j<list.length; j++) {
          if(utils.parseTime(list[j].times) == utils.parseTime(arr[i].createtime)){
            list[j].mock.push(Object.assign(arr[i], {check: false}));
          }
        }
      }
      this.list = list;
      console.log(this.list);
    },
    editeList(){
      this.isEdite = !this.isEdite
      this.isShowNum = !this.isShowNum
    },
    goRefresh() {
      this.mescrollUp.page.num = 1;
      this.mescroll.scrollTo(0, 0);
      this.$nextTick(() => {
        this.upCallback(this.mescrollUp.page, this.mescroll);
      })
    },
    handCheck(v){
      if(v.check){
        this.deleteArry.push(v.goodsid);
      } else {
        for(let i=0; i<this.deleteArry.length; i++){
          if(v.goodsid == this.deleteArry[i]){
            this.deleteArry.splice(i, 1);
            break;
          }
        }
      }
    },
    handDel () { // 删除
      if(!this.deleteArry.length){this.$vux.toast.text('请选择要删除的收藏'); return ;}
      this.$http.post("/collect/remove", {goodsIds: this.deleteArry.join(',')}, true).then(res => {
        if(res.code == 1){
          this.$vux.toast.text('删除成功');
          this.goRefresh()
        }
      }).catch(() => {});
    },
    handDelSingle (v, index, i) {
      this.$http.post("/collect/remove", {goodsIds: v.goodsid}, true).then(res => {
        if(res.code == 1){
          this.$vux.toast.text('删除成功');
          this.list[index].mock.splice(i, 1);
        }
      }).catch(() => {});
    },
    handSearch() {
      this.showSearch = true;
      this.words = '';
      this.$nextTick(() => {
        this.$refs.search.focus();
      })
    },
    searchClose(){
      this.$refs.search && this.$refs.search.blur();
      this.showSearch = false;
    },
    goSearch () {
      this.jumpTo('/collectSearch?tit='+encodeURIComponent(this.words));
    },
    handShare (v) {
      this.$http.post('/task/shareGoods', {goodsId: v.goodsid}, true).then(res => {
        if(res.code == 1){
          this.showShare =true
          this.shareImg = res.data.thumb
          this.shareUrl = res.data.url
        }
      })
    },
    handDetail (v) {
      this.jumpTo('/goodsDetail?goodsId='+v.goodsid)
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
  beforeRouteLeave(to, from, next){
    this.$refs.search && this.$refs.search.blur();
    this.showSearch = false;
    next();
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#collect {
  position: relative;
  height: 100%;
  .mescrollBox{
    height: 100%;
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
    border-bottom: 1px solid #EEEEEE;
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
      width: 4rem;
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
      height: 0.88rem;
      position: absolute;
      bottom: 0;
      right: 0.2rem;
      display: flex;
      align-items: center;
      img{
        height: 0.3rem;
      }
    }
    .edite{
      position: absolute;
      bottom: 0;
      right: 0.9rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.26rem;
      color: #646464;
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
    .collect_wrap{
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .collect_li{
        width: 100%;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.29rem;
          color: #545454;
        }
        .cont_wrap{
          width: 100%;
          .cont_li{
            width: 100%;
            height: 2.3rem;
            overflow: hidden;
            border-radius: 0.2rem;
            margin-bottom: 0.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .van-swipe-cell{
              width: 100%;
            }
            .van-swipe-cell__wrapper{
              overflow: hidden;width: 100%;
            }
            .cont_box{
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 0.2rem;
              background-color: #fff;
              overflow: hidden;
              position: relative;
              img.goodImg{
                width: 2.3rem;
                height: 2.3rem;
                display: inline-block;
                vertical-align: top;
              }
              img.goodCart{
                width: 0.26rem;
                padding: 0.1rem 0.2rem;
                border: 1px solid #e5e5e5;
                border-radius: 0.2rem;
                display: inline-block;
                vertical-align: top;
                position: absolute;
                right: 0.2rem;
                bottom: 0.2rem;
              }
              .goodNo{
                padding: 0.04rem 0.14rem;
                background: rgba(0,0,0,0.7);
                font-size: 0.18rem;
                color: #fff;
                position: absolute;
                left: 0;
                top: 0;
                border-bottom-right-radius: 0.2rem;
              }
            }
            .cont_rg{
              flex: 1;
              padding-left: 0.2rem;
              height: 2.3rem;
              .title1{
                width: 4.4rem;
                font-size: 0.26rem;
                color: #545454;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient:vertical;
                flex-direction: column;
                padding-top: 0.2rem;
              }
              .text{
                font-size: 0.36rem;
                color: #FF0034;
                margin-top: 0.5rem;
              }
            }
            .cont_rg1{
              width: 2.3rem;
              height: 2.3rem;
              overflow: hidden;
              div{
                width: 50%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 2.3rem;
                color: #fff;
              }
              div:first-child{
                background: linear-gradient(0deg, #BF39D2, #E851BC);
              }
              div:last-child{
                background: linear-gradient(0deg, #7E38D2, #AE51E8);
              }
            }
          }
        }
        .cont_wrap1{
          width: 100%;
          .cont_li{
            .edite_wrap{
              width: 0.6rem;
              overflow: hidden;
              height: 2.3rem;
              display: flex;
              align-items: center;
            }
            .cont_rg{
              .title1{
                width: 3.9rem;
              }
            }
          }
        }
      }
    }
  }
  /deep/ .van-popup--right{
    top: 0;
    transform: translate3d(0,0,0);
  }
  .collect-search{
    width: 100%;
    height: 100%;
    .gheader{
      width: 6.9rem;
      height: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.3rem;
      position: relative;
      .back{
        width: 0.4rem;
        padding-right: 0.1rem;
        font-weight: 1000;
      }
      img{
        position: absolute;
        bottom: 0.3rem;
        width: 0.26rem;
        left: 0.4rem;
      }
      input{
        flex: 0 0 5.9rem;
        background: #EEEEEF;
        border:none;
        color:#000;
        font-size:0.28rem;
        line-height:0.3rem;
        height: 0.6rem;
        border-radius:0.1rem;
        text-indent:0.46rem;
        outline:none;
        resize:none;
        padding: 0.15rem 0;
      }
      span{
        width: 0.9rem;
        text-align: center;
        display: inline-block;
        line-height: 0.88rem;
        font-size: 0.28rem;
        color: #525252;
        padding-left: 0.1rem;
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
.collect_model{
  height: 1rem;
  background:#fff;
  padding:0 0.2rem;
  box-sizing: border-box;
  overflow: hidden;
  border-top: 1px solid #D8D8D8;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .btn{
    width: 1.6rem;
    height: 0.6rem;
    border: 1px solid #E0E0E0;
    font-size: 0.29rem;
    color: #303030;
    border-radius: 0.2rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon{
      font-size: 0.36rem;
    }
  }
  .text{
    font-size: 0.3rem;
    color: #7E38D2;
    margin-right: 0.14rem;
  }
}
</style>
