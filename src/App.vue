<template>
  <div id="app">
    <div id="header" :style="{height: h, background:colors}"></div>
    <transition :name="transitionName">
      <div class="viewBox" :style="{top: h}">
        <router-view v-if="isRouterAlive" />
      </div>
    </transition>
    
    <div v-transfer-dom>
      <x-dialog v-model="showToast1" class="updateBox">
        <div class="update">
          <img src="./assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add">
              <p class="t">升级到新版本</p>
            </div>
            <div class="update_btn">
              <span @click="showToast1 = false" v-if="version.update">稍后提醒</span>
              <span @click="downWgt">立即升级</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog
        v-model="showToast3"
        :dialog-style="{'max-width': '100%', 'background-color': 'transparent'}"
        class="progressBox">
        <div class="progressBg">
          <img src="./assets/img/updateBox.png" alt />
          <x-progress :percent="percent" :show-cancel="false" v-if="showToast5"></x-progress>
          <span class="title" v-if="showToast5">新版本正在努力的更新中，请稍等</span>
          <div class="update_btn" v-if="!showToast5">
            <span @click="showToast3 = false">稍后提醒</span>
            <span @click="startSmart">立即升级</span>
          </div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast4" class="updateBox">
        <div class="update">
          <img src="./assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add">
              <p class="t" v-if="smart && smart.extra">新版本特性</p>
              <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
            </div>
            <div class="update_btn">
              <span @click="reboot">立即重启</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog
        v-model="showToast2"
        :dialog-style="{'max-width': '100%', 'background-color': 'transparent'}"
        class="progressBox">
        <div class="progressBg">
          <img src="./assets/img/updateBox.png" alt />
          <x-progress :percent="percent" :show-cancel="false"></x-progress>
          <span class="title">新版本正在努力的更新中，请稍等</span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <div id="spinnerBox" v-if="loading">
        <div class="spinner">
          <div class="bounce1" :style="{background: $store.state.global.theme.mainColor}"></div>
          <div class="bounce2" :style="{background: $store.state.global.theme.mainColor}"></div>
          <div class="bounce3" :style="{background: $store.state.global.theme.mainColor}"></div>
        </div>
      </div>
    </div>
    <!--     <div v-transfer-dom>
      <x-dialog v-model="showActivity" class="showActivity"  hide-on-blur>
        <div class="update">
          <img :src="img" alt="" class="bg" @click="activity">
          <img src="./assets/img/jdmy/smrz/close.png" alt="" @click="showActivityClose = false" class="activityClose">
        </div>
      </x-dialog>
    </div>-->
    <!--     <div v-transfer-dom>
      <x-dialog v-model="showRedPacket" class="showActivity"  hide-on-blur>
        <div class="update" v-if="packet">
          <img :src="packet.img" alt="" class="bg" @click="goMoney">
          <p class="money" v-if="packet.money && packet.money.length>2" style="font-size: 1rem;top: 3.8rem;">{{packet.money}}</p>
          <img src="./assets/img/jdmy/smrz/close.png" alt="" @click="showRedPacketClose = false" class="close">
        </div>
      </x-dialog>
    </div>-->
    <!-- 拼单弹窗 -->
    <x-dialog
      v-model="dayPinPoup"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="browseshop_main_day">
        <div class="browseshop_a">
          <div class="drawback_money">
            <span>可选</span>
            <img v-if="upList[0]" :src="upList[0].avatar" alt="">
            <span v-if="upList[0]">{{upList[0].mobile}}的拼团</span>
          </div>
          <div class="drawback_xunhuan_list">
            <div class="drawback_card" v-for="(item,index) in upList" :key="index">
              <div class="drawback_card_img">
                <img :src="item.thumb | addUrlHeader" alt="">
              </div>
              <div class="drawback_card_list">
                <span class="drawback_card_list_tit">{{item.goodsName}}</span>
                <!-- <span class="drawback_card_list_specs">khkkjjkk</span> -->
                <div class="drawback_card_list_price">
                  <span class="drawback_card_list_price_left">￥{{item.goodsPrice}}</span>
                  <span class="drawback_card_list_but" v-if="!item.isAdd" @click="saveInvitInfo(item.ptid)">参团</span>
                  <span class="drawback_card_list_but1" v-if="item.isAdd">已参团</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="browseshop_b" @click="dayPinPoup=false">
          <img src="./assets/img/home/cancel.png" alt="">
          </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import * as utils from "./utils";
import {
  XDialog,
  XCircle,
  TransferDomDirective as TransferDom,
  XProgress
} from "vux";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    XDialog,
    XCircle,
    XProgress
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      packet: "",
      isRouterAlive: true,
      showToast: false,
      showToast1: false,
      showToast2: false,
      showToast3: false,
      showToast4: false,
      showToast5: false,
      showActivityClose: true,
      showRedPacketClose: false,
      percent: 0,
      perCon: "0%",
      progressState: "准备中",
      word: "",
      copyWord: "",
      result: "",
      h: "",
      anh: 25,
      iosh: 20,
      colors: "",
      r: true,
      hideTitle: [
        "login",
        "home",
        "my",
        "taskEarnings",
        "myTeam",
        "contactUs",
        "browseLog",
        "leaderboard",
      ],
      version: "",
      smart: "",
      transitionName: "",
      img: "",
      link: "",
      dayPinPoup:false,
      upList:[]
    };
  },
  computed: {
    loading() {
      return this.$store.state.user.loading;
    },
    showActivityTime() {
      if (
        this.$store.state.global.activity &&
        this.$store.state.global.activity.items
      ) {
        for (let i in this.$store.state.global.activity.items) {
          if (this.$store.state.global.activity.items[i].img) {
            this.img = this.$store.state.global.activity.items[i].img;
            this.link = this.$store.state.global.activity.items[i].link;
            return true;
          }
        }
      } else {
        return false;
      }
    },
    showToastCopy: {
      get() {
        return (
          this.showToast &&
          !this.showToast1 &&
          !this.showToast2 &&
          !this.showToast3 &&
          !this.showToast4 &&
          this.$route.name !== "guide" &&
          !this.showActivity &&
          this.$bizId !== 56
        );
      },
      set() {
        this.showToast = false;
      }
    },
    // showToastCopy () {
    //   return (this.showToast && !this.showToast1 && !this.showToast2 && !this.showToast3 && !this.showToast4 && this.$route.name !== 'guide' && !this.showActivity && this.$bizId !== 56)
    // },
    showActivity() {
      return (
        this.showActivityClose &&
        !this.showToast1 &&
        !this.showToast2 &&
        !this.showToast3 &&
        !this.showToast4 &&
        this.$route.name !== "guide" &&
        this.showActivityTime &&
        !this.showRedPacket
      );
    },
    showRedPacket() {
      return (
        this.showRedPacketClose &&
        !this.showToast1 &&
        !this.showToast2 &&
        !this.showToast3 &&
        !this.showToast4 &&
        this.$route.name !== "guide"
      );
    }
  },
  methods: {
    getVersion() {
      let that = this;
      this.$http.get("/auth/checkUpdate", {
        deviceType: window.api ? (api.systemType === "android" ? "android" : 'ios') : 'ios',
        version: window.api ? api.appVersion : '1.0.0',
      }, false).then(res => {
        if (res.code === 1) {
          this.version = res.data;
          localStorage.setItem('versionInfo',res.data)
          localStorage.setItem('newVersion',res.data.new_version)
          if(res.data.url){
            this.showToast1 = true;
          }else{
            let mam = api.require("mam");
            mam.checkSmartUpdate(function(ret, err) {
              console.log("检测到" + JSON.stringify(ret));
              if (ret && ret.packages.length > 0) {
                // 返回的结果有可能会空数组
                if (ret.packages[0].silent) {
                  that.smart = ret.packages[0];
                  mam.startSmartUpdate(function(ret, err) {
                    if (ret.state === 3) {
                      if (that.smart && that.smart.extra) {
                        api.addEventListener(
                          {
                            name: "smartupdatefinish"
                          },
                          function(ret, err) {
                            that.showToast4 = true;
                          }
                        );
                      }
                    } else {
                      console.log(JSON.stringify(err));
                    }
                  });
                } else {
                  that.showToast3 = true;
                  that.smart = ret.packages[0];
                }
              }
            });
          }
        }
      });
    },
    downWgt() {
      let that = this;
      if (that.version.types === 1) {
        if (api.systemType === "android") {
          that.showToast1 = false;
          that.showToast2 = true;
          api.download(
            {
              url: that.version.url,
              report: true
            },
            function(ret, err) {
              if (ret && ret.state === 0) {
                that.percent = parseInt(ret.percent);
                // that.perCon = parseInt(ret.percent) + '%'
                // that.progressState = '下载中' + that.percent + '%'
              }
              if (ret && ret.state === 1) {
                utils.storage.remove("Uquanyun");
                // that.progressState = '安装中'
                let savePath = ret.savePath;
                api.installApp({
                  appUri: savePath
                });
              }
            }
          );
        }
        if (api.systemType === "ios") {
          utils.storage.remove("Uquanyun");
          api.installApp({
            appUri: that.version.url
          });
        }
      } else {
        api.openApp({
          uri: that.version.url,
          iosUrl: that.version.url
        });
      }
    },
    startSmart() {
      let that = this;
      let mam = api.require("mam");
      mam.startSmartUpdate(function(ret, err) {
        if (ret) {
          that.showToast5 = true;
          if (ret.state === 0) {
            that.percent = parseInt(ret.progress / 10);
          } else if (ret.state === 1) {
            that.percent = parseInt(ret.progress / 2 + 10);
          } else if (ret.state === 2) {
            that.percent = parseInt((ret.progress * 4) / 10 + 60);
          } else if (ret.state === 3) {
            that.percent = 100;
            utils.storage.remove("Uquanyun");
            api.rebootApp();
          } else if (ret.state === 4) {
            that.showToast3 = false;
          }
        } else {
          console.log(JSON.stringify(err));
        }
      });
    },
    reboot() {
      api.rebootApp();
    },
    copy() {
      let that = this;
      if (that.$store.state.global.firstNav !== "/home") {
        return;
      }
      let copy = [
        "wechatLogin",
        "login",
        "register",
        "forget",
        "mobileLogin",
        "revise",
        "upgradeAgency",
        "partnership",
        "info",
        "wxbind"
      ];
      let clipBoard = api.require("clipBoard");
      clipBoard.get(function(ret, err) {
        if (ret) {
          if (copy.indexOf(that.$route.name) < 0) {
            let word = ret.value.replace(/(^\s*)|(\s*$)/g, "");
            if (word !== "" && ret.value !== utils.storage.get("copyWord")) {
              that.copyWord = ret.value;
              let reg = /(￥([a-zA-Z0-9]+)￥)/;
              let arr = ret.value.match(reg);
              if (arr) {
                that.word = arr[0];
              } else {
                that.word = ret.value;
              }
              that.showToast = true;
            }
          }
        } else {
          console.log(JSON.stringify(err));
        }
      });
    },
    startUp() {
      this.$http
        .post("/amoy/user/get-app-start-img", {}, false, true)
        .then(res => {
          console.log("download111" + res);
          if (res.code === 0) {
            const downLoader = plus.downloader.createDownload(
              res.data,
              { filename: "_downloads/start.png" },
              function(download, status) {
                if (status === 200) {
                  plus.navigator.updateSplashscreen({
                    image: download.filename
                  });
                }
              }
            );
            downLoader.start();
          }
        });
    },
    //获取可加入拼团数据
    getJoinInfo(){
      this.$http
        .post(
          "/task/joinInfo",
          {}
        )
        .then(res => {
          if(res.code == 1){
            if(!res.data.spellInfo.length){
              this.upList = res.data.upList
              if(this.upList.length){
                this.dayPinPoup = true
              }
            }else{
              this.dayPinPoup = false
            }
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //参团
    saveInvitInfo(id){
      this.$http
          .post(
            "/task/userSpell",
            {
              ptid:id,
              type:2
            },
            true
          )
          .then(res => {
            if(res.code == 1){
              this.getJoinInfo()
              this.$vux.toast.text(res.msg);
            }
          });
    },
  },
  watch: {
    $route(to, from) {
      if (this.hideTitle.indexOf(to.name) > -1 || !window.api) {
        this.h = 0;
      } else {
        if (api.systemType === "android") {
          this.h = this.anh;
        } else {
          this.h = this.iosh;
        }
      }
        // this.colors = "#ffffff";
      if (from.meta.routerZindex > to.meta.routerZindex) {
        this.transitionName = "slide-right";
      } else if (from.meta.routerZindex < to.meta.routerZindex) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-none";
      }
    }
  },
  created() {
    let that = this;
    let isGuid = localStorage.getItem('isGuid')?localStorage.getItem('isGuid'):false
    if(!isGuid){
      this.$router.push('/guide')
    }
    this.getJoinInfo()
    window.api && that.getVersion();
    // 进入前台
    let size = document.documentElement.clientWidth / 7.5;
    if (window.api) {
      let H = 0;
      if (api.systemType === "android") {
        this.h = api.safeArea.top / size + "rem";
        H = api.safeArea.top / size;
        this.anh = this.h;
      } else {
        this.h = api.safeArea.top / size + "rem";
        H = api.safeArea.top / size;
        this.iosh = this.h;
      }
      this.$store.commit("setStatusH", H);
    }
    if (this.hideTitle.indexOf(that.$route.name) > -1) {
      this.h = 0;
    }
    window.api && api.setStatusBarStyle({ style: "dark", color: "rgba(255, 255, 255, 0)"});
      // that.colors = "#ffffff";

    if (window.api && api.pageParam.openUrl) {
      // 当打开此window时指定的有要打开的界面
      this.jumpTo(api.pageParam.openUrl);
    }
    var appVersion = window.api ? api.appVersion : '1.0.0';
    localStorage.setItem("version", appVersion);
  },
  mounted() {
    // this.getPacket();
    if (window.api) {
      api.removeLaunchView();
      if (api.systemType === "android") {
        api.requestPermission(
          {
            list: ["camera", "photos", "location", "notification", "storage"],
            code: 1
          },
          function(ret, err) {}
        );
      }
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "assets/less/app.less";
@import "assets/mall/style/App";
@import "./assets/less/common";
/*.weui-toast__content{*/
/*font-size: .24rem;*/
/*padding: .14rem !important;*/
/*}*/
.header{
  .backBox{
    i{
      color: #333333;
    }
  }
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar {
  display: none;
}
.van-dialog__header{font-weight: 600}
.weui-toast.weui-toast_text {
  width: auto !important;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.mescroll-totop {
  bottom: 100px !important;
  right: 0.34rem !important;
}
.mescroll {
  .mescroll-downwarp .downwarp-content {
    height: 75px;
    padding-bottom: 0;
  }
  /*下拉刷新--标语*/
  .mescroll-downwarp .downwarp-slogan {
    padding: 16px 0 0 18px;
    font-size: 13px;
    color: gray;
  }
  /*下拉刷新--进度提示*/
  .mescroll-downwarp .downwarp-text {
    font-size: 11px;
    color: darkgray;
  }
  /*下拉刷新--向下进度动画*/
  .mescroll-downwarp .downwarp-progress {
    position: absolute;
    top: 0;
    left: 50%;
    width: auto;
    height: auto;
    border: none;
    border-radius: 0;
    margin-right: 0;
    margin-left: -90px;
  }
  /*下拉刷新--人*/
  .mescroll-downwarp .downwarp-man {
    width: 40px;
    height: 60px;
    vertical-align: middle;
    -webkit-transform-origin: left 60%;
    transform-origin: left bottom;
  }
  /*下拉刷新--盒子*/
  .mescroll-downwarp .downwarp-box {
    width: 18px;
    margin-top: 10px;
    margin-left: -20px;
    vertical-align: middle;
    -webkit-transform-origin: right -100%;
    transform-origin: right -100%;
  }
  /*下拉刷新--进度条*/
  .mescroll-downwarp .downwarp-loading {
    /*display: none; 不预先隐藏,避免首次显示动画时,图片没及时加载完毕导致短暂的白屏*/
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -88px;
    width: 40px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-animation: animManRun 0.3s steps(1, end) infinite;
    animation: animManRun 0.3s steps(1, end) infinite;
  }
  /*   @-webkit-keyframes animManRun {
    0% {background-image: url('./assets/img/loading/4.png')}
    50% {background-image: url('./assets/img/loading/5.png')}
    100% {background-image: url('./assets/img/loading/4.png')}
  }
  @keyframes animManRun {
    0% {background-image: url('./assets/img/loading/4.png')}
    50% {background-image: url('./assets/img/loading/5.png')}
    100% {background-image: url('./assets/img/loading/5.png')}
  } */
  .mescroll-downwarp .downwarp-loading:before {
    position: absolute;
    top: 15px;
    left: 50%;
    margin-left: -50px;
    content: "";
    width: 30px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    /* background-image: url('./assets/img/loading/6.png'); */
  }
}
.progressBox {
  .weui-dialog {
    border-radius: 0;
    max-width: 5.35rem !important;
    width: 5.35rem !important;
  }
  /*.title{*/
  /*display: block;*/
  /*margin-bottom: 10px;*/
  /*}*/
  .progressBg {
    position: relative;
    width: 5.35rem;
    height: 4.35rem;
    img {
      width: 100%;
      height: 100%;
    }
    .weui-progress {
      position: absolute;
      left: 6%;
      width: 88%;
      bottom: 0.9rem;
      .weui-progress__bar {
        height: 0.2rem;
        border-radius: 0.1rem;
      }
      .weui-progress__inner-bar {
        background: #ff9b84;
        border-radius: 0.1rem;
      }
    }
    .title {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0.14rem;
      text-align: center;
      color: #999;
      font-size: 0.24rem;
    }
    .update_btn {
      position: absolute;
      bottom: 0.3rem;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 2rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        text-align: center;
        background: #e5e5e5;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #999;
      }
      span:last-of-type {
        color: #fff;
        background: linear-gradient(to right, #d456ff, #7468ff);
      }
    }
  }
}
#app {
  height: 100%;
  position: relative;
  #header {
    position: relative;
    z-index: 1000000;
    overflow: hidden;
    width: 100%;
    /*height: 25px;*/
  }
  .viewBox {
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    bottom: 0;
  }
  .browseshop_main_day{
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
        font-size: 0.32rem;
        font-weight: 500;
        color: #333333;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 0.6rem;
          height: 0.6rem;
          display: block;
          border-radius: 50%;
        }
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
                background: linear-gradient(-35deg, #AF1CCA, #7730F0);
                font-size: 0.22rem;
                color: #ffffff;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              }
              .drawback_card_list_but1{
                width: 1.4rem;
                height: 0.48rem;
                margin-top: 0.2rem;
                border-radius: 0.26rem;
                background: #A387A9;
                font-size: 0.22rem;
                color: #ffffff;
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
#spinnerBox {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -75px;
}
.spinner {
  margin: 0 auto;
  width: 150px;
  text-align: center;
}

.spinner > div {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
.weui-tabbar__icon {
  width: 20px !important;
  height: 20px !important;
}
/**{*/
/*user-select:auto !important;*/
/*-webkit-tap-highlight-color: rgba(255, 255, 255, 0);*/
/*-webkit-user-select: none;*/
/*-moz-user-focus: ignore;*/
/*-moz-user-select: none;*/
/*-webkit-appearance:none;*/
/*}*/
* {
  /*user-select:auto !important;*/
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: ignore;
  -moz-user-select: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
  user-select: none;
}
input,
textarea {
  user-select: auto !important;
}

.vux-loading {
  font-size: 0.3rem;
}
.infinite-loading-container {
  width: 100%;
}
img {
  max-width: 100%;
}
.text-html {
  max-width: 100%;
  overflow: hidden;
  p {
    font-size: 0.3rem;
  }
}

.am-g {
  display: none !important;
}
.updateBox {
  .weui-dialog {
    max-width: 5.4rem !important;
    width: 5.4rem !important;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.7);
  }
  .weui-dialog {
    background: none;
  }
  .update {
    position: relative;
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translate(-50%, -50%);*/
    background: rgba(255, 255, 255, 1);
    width: 5.4rem;
    overflow: hidden;
    border-radius: 0.2rem;
    .bg {
      width: 100%;
      float: left;
    }
    .contentBox {
      width: 100%;
      float: left;
      background: #fff;
      padding: 0.2rem 0.4rem 0.4rem;
      box-sizing: border-box;
      /*border-radius:  0 0 0.2rem 0.2rem;*/
    }
    .add {
      width: 100%;
      text-align: center;
      p {
        text-align: center;
        color: #666;
      }
      .t {
        font-size: 0.36rem;
        color: #3c3c3c;
      }
      .info {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #666;
        padding: 0 0.3rem;
        display: flex;
        align-items: flex-start;
        p {
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: left;
        }
        span {
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background: linear-gradient(to right, #d479ef, #a282ed);
          transform: rotate(45deg);
          margin-right: 0.1rem;
          margin-top: 0.16rem;
        }
      }
      img {
        margin-top: 0.6rem;
        width: 0.76rem;
        height: 0.76rem;
      }
    }
    .update_btn {
      margin-top: 0.6rem;
      display: flex;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 2rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        text-align: center;
        background: #e5e5e5;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #999;
      }
      span:last-of-type {
        color: #fff;
        background: linear-gradient(to right, #d456ff, #7468ff);
      }
    }
    .close {
      width: 0.76rem;
      height: 0.76rem;
      position: absolute;
      bottom: -0.76rem;
      left: 50%;
      margin-left: -0.38rem;
    }
  }
}
.copyBox {
  .weui-dialog {
    max-width: 5rem !important;
    width: 5rem !important;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.7);
  }
  .weui-dialog {
    background: none;
    overflow-y: auto;
  }
  .update {
    position: relative;
    background: rgba(255, 255, 255, 0);
    width: 5rem;
    .bg {
      width: 100%;
      float: left;
    }
    .search {
      width: 100%;
      float: left;
      position: relative;
      .add {
        background: rgba(255, 255, 255, 1);
        width: 100%;
        text-align: center;
        p {
          text-align: center;
          color: #666;
        }
        .t {
          font-size: 0.36rem;
        }
        .info {
          max-height: 1rem;
          padding: 0.2rem 0.3rem 0.2rem;
          text-align: center;
          font-size: 0.24rem;
          color: #333;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 3;
          span {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: linear-gradient(to right, #d479ef, #a282ed);
          }
        }
        img {
          margin-top: 0.6rem;
          width: 0.76rem;
          height: 0.76rem;
        }
      }
      .update_btn {
        background: rgba(255, 255, 255, 1);
        width: 100%;
        display: flex;
        justify-content: center;
        span {
          display: inline-block;
          width: 4.3rem;
          height: 0.7rem;
          line-height: 0.7rem;
          border-radius: 0.35rem;
          text-align: center;
          font-size: 0.32rem;
          color: #fff;
        }
      }
      .line {
        background: rgba(255, 255, 255, 1);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: inline-block;
          width: 1.5rem;
          border-bottom: 1px solid #c6c6c6;
        }
        p {
          color: #999;
          margin: 0 0.1rem;
          font-size: 0.28rem;
        }
      }
      .other {
        background: rgba(255, 255, 255, 1);
        padding: 0.3rem 0;
        width: 100%;
        border-radius: 0 0 0.14rem 0.14rem;
        div {
          width: 4.3rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            img {
              width: 0.7rem;
              height: 0.7rem;
              margin-bottom: 0.1rem;
            }
            span {
              font-size: 0.24rem;
              color: #333;
            }
          }
        }
      }
      .closeBox {
        height: 1rem;
        background: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        .closeCopy {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
    }
  }
}
.showActivity {
  .weui-dialog {
    max-width: 6.1rem !important;
    width: 6.1rem !important;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.7);
  }
  .weui-dialog {
    background: none;
  }
  .update {
    position: relative;
    background: rgba(255, 255, 255, 0);
    width: 6.1rem;
    height: 8.8rem;
    .bg {
      width: 100%;
      float: left;
    }
    .activityClose {
      width: 0.46rem;
      height: 0.46rem;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -0.23rem;
    }
    .close {
      width: 0.76rem;
      height: 0.76rem;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -0.38rem;
    }
    .money {
      position: absolute;
      left: 0;
      top: 3.2rem;
      right: 0;
      font-size: 1.6rem;
      text-align: center;
      color: #ff5847;
    }
  }
}
/*上拉加载无数据的时候图片的样式*/
.mescroll-empty {
  padding-top: 1.3rem !important;
}
.mescroll-empty .empty-icon {
  width: 1.08rem !important;
  height: 1.28rem;
}
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInLeft 0.2s linear forwards;
}
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInRight 0.2s linear forwards;
}
@keyframes slideOutLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1 !important;
  }
  to {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-right-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutLeft 0.2s linear forwards;
}
.slide-right-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutRight 0.2s linear forwards;
}
</style>
