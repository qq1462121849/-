<template>
  <div id="invit">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">邀请好友</div>
    </div>
    <div class="rule" :style="{top: statusH +0.88+'rem'}"></div>
    <div class="rule1" :style="{top: statusH +0.88+'rem'}">
      <span>155*****035 刚刚邀请了一位好友 赚取15元</span>
      <span @click="isShowRule=true">活动规则</span>
    </div>
    <div class="page_wrap" :style="{top: statusH +0.88+'rem'}">
      <img class="top_img" src="../../assets/img/my/invit/top_img1.png" alt="">
      <div class="top_text" @click="copyTextShare('A11978942')">我的邀请码：A11978942（点击复制）</div>
      <img class="top_btn" src="../../assets/img/my/invit/btn1.png" alt="">
      <div class="cont1">
        <div class="cont">
          <div class="cont_li">
            <div>
              <span>{{inviteInfo.nums}}</span>
              <span>人</span>
            </div>
            <div class="text">已邀请</div>
          </div>
          <div class="cont_li">
            <div>
              <span>{{inviteInfo.price}}</span>
              <span>元</span>
            </div>
            <div>已到账</div>
          </div>
        </div>
      </div>
      <div class="cont2">
        <div class="nav">
          <div class="nav_li">
            <img src="../../assets/img/my/invit/icon4.png" alt="">
            <div>点击按钮</div>
            <div>分享给好友</div>
          </div>
          <img class="next" src="../../assets/img/my/invit/next.png" alt="">
          <div class="nav_li">
            <img src="../../assets/img/my/invit/icon5.png" alt="">
            <div>好友打开链接</div>
            <div>下载安装</div>
          </div>
          <img class="next" src="../../assets/img/my/invit/next.png" alt="">
          <div class="nav_li">
            <img src="../../assets/img/my/invit/icon6.png" alt="">
            <div>好友登录</div>
            <div>获得红包</div>
          </div>
        </div>
        <div class="cont">
          <div class="cont_li">
            <div class="cont_img">1</div>
            <div class="text">邀请您的家人、朋友、同学、同事<span class="text1">成功率更高</span>。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">2</div>
            <div class="text">邀请您的家人、朋友、同学、同事成功率更高。邀请您的家人、朋友、同学、同事成功率更高。邀请您的家人、朋友、同学、同事成功率更高。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">3</div>
            <div class="text">邀请您的家人、朋友、同学、同事成功率更高。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">4</div>
            <div class="text">邀请您的家人、朋友、同学、同事成功率更高。邀请您的家人、朋友、同学、同事<span class="text1">成功率更高</span>。邀请您的家人、朋友、同学、同事成功率更高。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">5</div>
            <div class="text">邀请您的家人、朋友、同学、同事成功率更高。邀请您的家人、朋友、同学、同事成功率更高。邀请您的家人、朋友、同学、同事<span class="text1">成功率更高</span>。</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div @click="jumpTo('share?type=1')">
        <img src="../../assets/img/my/invit/wx.png" alt="">
        <div>邀请好友</div>
      </div>
      <div @click="jumpTo('share?type=2')">
        <img src="../../assets/img/my/invit/download.png" alt="">
        <div>保存图片</div>
      </div>
      <div @click="jumpTo('share?type=1')">
        <img src="../../assets/img/my/invit/qq.png" alt="">
        <div>QQ邀请</div>
      </div>
    </div>
    <!-- 规则 -->
    <x-dialog
      v-model="isShowRule"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="rule_wrap">
        <div class="rule_cont">
          <div class="cont_li">
            <div class="cont_img">1</div>
            <div class="text">分享给好友，好友通过您分享的链接下载并登陆。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">2</div>
            <div class="text">登陆后第2-10天，好友单天内阅读满3篇资讯，您可以获得3-6元（根据当前所处红包额度而定），共两次。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">3</div>
            <div class="text">分享给好友，好友通过您分享的链接下载并登陆。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">4</div>
            <div class="text">登陆后第2-10天，好友单天内阅读满3篇资讯，您可以获得3-6元（根据当前所处红包额度而定），共两次。</div>
          </div>
          <div class="cont_li">
            <div class="cont_img">5</div>
            <div class="text">邀请您的家人、朋友、同学、同事成功率更高。</div>
          </div>
        </div>
        <div class="close_icon" @click="isShowRule=false">
          <img src="../../assets/img/my/invit/close.png" alt="">
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "invit",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      labelStatus:1,
      isShowRule:false,
      inviteInfo:null
    }
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
    },
    //获取邀请信息
    getInviteInfo(){
      this.$vux.loading.show()
      this.$http
        .post(
          "/mc/inviteInfo",
        )
        .then(res => {
          if(res.code == 1){
            this.$vux.loading.hide()
            this.inviteInfo = res.data
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //获取邀请海报信息
    getPoster(){
      this.$http
        .post(
          "/mc/poster",
        )
        .then(res => {
          if(res.code == 1){
            localStorage.setItem("posterInfo",res.data)
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
  },
  created() {
    this.getInviteInfo()
    this.getPoster()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#invit {
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
  .rule{
    width: 100%;
    height: 0.55rem;
    background-color: #000;
    opacity: 0.1;
    position: fixed;
    left: 0;
    z-index: 10;
  }
  .rule1{
    width: 100%;
    height: 0.55rem;
    line-height: 0.55rem;
    color: #ffffff;
    position: fixed;
    left: 0;
    z-index: 11;
    padding: 0 0.2rem;
    box-sizing: border-box;
    font-size: 0.24rem;
    span:first-child{
      float: left;
    }
    span:last-child{
      float: right;
      width: 1.26rem;
      height: 0.36rem;
      line-height: 0.36rem;
      text-align: center;
      background-color: #ffffff;
      color: #ED2800;
      border-radius: 0.18rem;
      margin-top: 0.1rem;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    position: absolute;
    left: 0;
    background: url("../../assets/img/my/invit/bg1.png") no-repeat;
    background-size: 100% 7rem;
    overflow-y: auto;
    .top_img{
      width: 5.61rem;
      height: 1.4rem;
      display: block;
      margin: 0 auto;
      margin-top: 0.85rem;
    }
    .top_text{
      width: 100%;
      text-align: center;
      font-size: 0.24rem;
      color: #ffffff;
      margin-top: 0.25rem;
    }
    .top_btn{
      width: 4.5rem;
      height: 0.93rem;
      display: block;
      margin: 0 auto;
      margin-top: 0.5rem;
    }
    .cont1{
      width: 7rem;
      height: 4rem;
      background: url("../../assets/img/my/invit/wrap3.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 0.5rem;
      padding: 1.5rem 0.5rem 0;
      box-sizing: border-box;
      .cont{
        width: 100%;
        overflow: hidden;
        .cont_li{
          width: 50%;
          float: left;
          text-align: center;
          span:first-child{
            font-size: 0.8rem;
            font-weight: bold;
            color: #ED2800;
          }
          span:last-child{
            font-size: 0.3rem;
            color: #ED2800;
          }
          .text{
            font-size: 0.28rem;
            color: #666666;
          }
        }
        .cont_li:first-child{
          border-right: 1px dashed #dddddd;
          box-sizing: border-box;
        }
      }
    }
    .cont2{
      width: 100%;
      height: 9.5rem;
      background: url("../../assets/img/my/invit/wrap4.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 0.3rem;
      margin-bottom: 2rem;
      padding: 0 0.4rem;
      box-sizing: border-box;
      overflow: hidden;
      .nav{
        width: 100%;
        overflow: hidden;
        margin-top: 1.7rem;
        .nav_li{
          width: 1.5rem;
          float: left;
          img{
            width: 0.92rem;
            height: 0.92rem;
            display: block;
            margin: 0 auto;
          }
          div{
            font-size: 0.24rem;
            color: #666666;
            text-align: center;
          }
        }
        .next{
          width: 0.7rem;
          height: 0.25rem;
          display: block;
          float: left;
          margin: 0.3rem 0.2rem 0 0.2rem;
        }
      }
      .cont{
        width: 100%;
        margin-top: 0.8rem;
        .cont_li{
          width: 100%;
          overflow: hidden;
          .cont_img{
            width: 0.55rem;
            height: 0.55rem;
            float: left;
            text-align: center;
            line-height: 0.45rem;
            color: #ffffff;
            background: url("../../assets/img/my/invit/icon7.png") no-repeat;
            background-size: 100% 100%;
          }
          .text{
            width: calc(100% - 0.55rem);
            margin-top: 0.05rem;
            font-size: 0.24rem;
            float: left;
            .text1{
              color: #ED2800;
            }
          }
        }
      }
    }
  }
  .footer{
    width: 100%;
    height: 1.5rem;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    overflow: hidden;
    >div{
      width: 33.33%;
      float: left;
      margin-top: 0.2rem;
      img{
        width: 0.8rem;
        height: 0.8rem;
        display: block;
        margin: 0 auto;
      }
      div{
        text-align: center;
        font-size: 0.2rem;
        color: #666666;
      }
    }
  }
  .rule_wrap{
    width: 6.9rem;
    height: 5.85rem;
    margin: 0 auto;
    margin-top: 3rem;
    background: url(../../assets/img/my/invit/wrap5.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 1rem;
    box-sizing: border-box;
    position: relative;
    .rule_cont{
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .cont_li{
        width: 100%;
        overflow: hidden;
        .cont_img{
          width: 0.55rem;
          height: 0.55rem;
          float: left;
          text-align: center;
          line-height: 0.45rem;
          color: #ffffff;
          background: url("../../assets/img/my/invit/icon7.png") no-repeat;
          background-size: 100% 100%;
        }
        .text{
          width: calc(100% - 0.55rem);
          margin-top: 0.05rem;
          font-size: 0.26rem;
          text-align: left;
          float: left;
          color: #666666;
        }
      }
    }
    .close_icon{
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      left: 3rem;
      bottom: -2rem;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
