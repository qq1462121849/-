<template>
  <div id="sharePic">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">画报分享</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <div class="list">
        <van-swipe
          class="my-swipe"
          :show-indicators="false"
          :loop="false"
          @change="changeIndex"
          :width="80">
          <van-swipe-item v-for="(item,index) in posterInfo" :key="index">
            <div class="swip_list">
              <img :src="item.thumb" alt="" @click="chooseLabel(item.thumb)">
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="share_img">
        <div class="img_wrap">
          <img class="img1" :src="shareImg" alt="">
          <!-- <div class="img_wrap1">
            <img class="img2" src="" alt="">
          </div> -->
        </div>
        <div class="cont">
          <img class="img1" src="../../assets/img/my/invit/save_text.png" alt="">
          <img class="img2" :src="logo" alt="">
        </div>
      </div>
      <div class="btn_wrap">
        <div class="btn" @click="copyLink">复制邀请链接</div>
        <div class="btn" @click="shareTask">分享邀请海报</div>
      </div>
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
      </div>
      <div class="bt_btn" @click="showShare = false">取消</div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "sharePic",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      type:1,
      posterInfo:[],
      shareImg:'',
      shareUrl:'',
      logo:'',
      showShare:false,
    };
  },
  watch:{
    $route (to,from) {
      if(to.name=="share"){
        this.type = this.$route.query.type?Number(this.$route.query.type):1
      }
    }
  },
  methods: {
    chooseLabel(url){
      this.shareImg = url
    },
    changeIndex(e) {
      /*  this.tabIndex = e * 1 + 1;
      this.getLevelInfo(e * 1 + 1); */
    },
    //获取邀请海报信息
    getPoster(){
      this.$http
        .post(
          "/mc/poster",
        )
        .then(res => {
          if(res.code == 1){
            this.posterInfo = res.data.thumbs
            this.shareUrl = res.data.url
            this.shareImg = this.posterInfo[0].thumb
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //复制链接
    copyLink(){
      this.copyTextShare(this.shareUrl)
    },
    //分享
    shareTask(){
      this.showShare =true
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
    this.type = this.$route.query.type?Number(this.$route.query.type):1
    this.logo = this.$store.state.global.initData?this.$store.state.global.initData.logo:''
    this.getPoster()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#sharePic {
  position: relative;
  height: 100%;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 0.88rem;
    background: #ffffff;
    background-size: 100% 100%;
    // border-bottom: 1px solid #EEEEEE;
    .backBox {
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
      .iconfont {
        font-weight: 1000;
      }
    }
    .title {
      width: 2.5rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .page_wrap{
    width: 100%;
    bottom: 0;
    position: absolute;
    left: 0;
    padding: 0 0.2rem;
    box-sizing: border-box;
    overflow: auto;
    .list {
      width: 100%;
      height: 1.8rem;
      .swip_list{
        width: 1.4rem;
        height: 1.6rem;
        margin: 0 auto;
        margin-top: 0.2rem;
        background-color: #ffffff;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .share_img{
      width: 5.4rem;
      margin: 0 auto;
      margin-top: 0.2rem;
      background-color: #ffffff;
      .img_wrap{
        width: 100%;
        height: 6.2rem;
        position: relative;
        background-color: #dddddd;
        .img1{
          width: 100%;
          height: 100%;
          display: block;
        }
        .img_wrap1{
          width: 4rem;
          height: 4rem;
          position: absolute;
          top: 0.7rem;
          left: 0.7rem;
          background-color: #ffffff;
          padding: 0.3rem;
          box-sizing: border-box;
          .img2{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      .cont{
        width: 100%;
        height: 1.69rem;
        display: flex;
        align-items: center;
        // justify-content: center;
        position: relative;
        padding: 0 0.24rem;
        box-sizing: border-box;
        .img1{
          width: 2.08rem;
          height: 0.61rem;
          display: block;
        }
        .img2{
          position: absolute;
          right: 0.24rem;
          width: 0.8rem;
          height: 0.8rem;
          display: block;
          border-radius: 0.1rem;
        }
      }
    }
    .btn_wrap{
      width: 100%;
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      .btn{
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 0.1rem;
        padding: 0 0.2rem;
        background-color: #ED2800;
        color: #ffffff;
      }
      .btn:last-child{
        margin-left: 0.2rem;
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
</style>
