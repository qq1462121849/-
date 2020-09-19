<template>
  <div id="setting">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">设置</div>
    </div>
    <div class="page_wrap" v-if="setInfo" :style="{top: 0.88+'rem'}">
      <van-cell title="绑定上级" value="绑定" is-link v-if="!shangji" @click="jumpTo({path:'bindSuperior'})"/>
      <van-cell title="我的上级" :value="setInfo.upInfo.nickname" v-if="shangji" is-link/>
      <van-cell title="实名认证" value="" is-link @click="goShiming"/>
      <van-cell title="绑定手机号" :value="setInfo.mobile" is-link @click="jumpTo({path:'setMobile',query:{'mobile':setInfo.mobile}})"/>
      <!-- <van-cell title="修改密码" value="" is-link @click="jumpTo({path:'setPw'})"/> -->
      <van-cell title="问题反馈" value="" is-link @click="jumpTo({path:'feedback'})"/>
      <van-cell title="清除缓存" :value="cacheSize" is-link @click="isClear"/>
      <van-cell title="版本信息" :value="version" is-link @click="update"/>
      <van-cell title="关于" value="" is-link @click="jumpTo({path:'aboutUs'})"/>
      <div class="btn" @click="loginOut">退出登录</div>
    </div>
    <!-- 版本升级 -->
    <van-popup position="center"
      v-model="versioninfo"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="order_pup">
        <div class="order_pup_main">
          <div class="order_pup_a">是否更新至最新{{newVersion}}版本?</div>
          <div class="order_pup_b">
            <div class="order_pup_btn_a" @click="versioninfo=false">取消</div>
            <div class="order_pup_btn_b">确定</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 退出登录 -->
    <van-popup position="center"
      v-model="loginOutStatus"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="isloginOut">
        <div class="text1">是否确认退出登录</div>
        <div class="cont">
          <div @click="cancelLoginOut">取消</div>
          <div @click="isloginOut">确定</div>
        </div>
      </div>
    </van-popup>
    <!-- 清除缓存 -->
    <van-popup position="center"
      v-model="isClearCache"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="isloginOut">
        <div class="text1">确认清除缓存</div>
        <div class="cont">
          <div @click="isClearCache=false">取消</div>
          <div @click="clearCache">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "setting",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      shangji:false,
      loginOutStatus:false,
      version:'',
      mobile:'',
      setInfo:null,
      cacheSize:'',
      versioninfo: false,
      newVersion:'',
      isClearCache:false
    };
  },
  watch:{
    $route (to,from) {
      if(to.name=="setting"){
        this.getsetInfo()
      }
    }
  },
  methods: {
    chooseLabel(num){
      this.labelStatus = num
    },
    loginOut(){
      this.loginOutStatus = true
    },
    cancelLoginOut(){
      this.loginOutStatus = false
    },
    //退出登录
    isloginOut(){
      this.$http
        .post(
          "/auth/logout",
          {},
          true
        )
        .then(res => {
          this.loginOutStatus = false
          this.$store.commit("logout");
          this.$router.push("login");
        });
    },
    //获取设置信息
    getsetInfo(){
      this.$http
        .post(
          "/mc/setting",
          {},
          true
        )
        .then(res => {
          if(res.code == 1){
            console.log(res.data)
            this.setInfo = res.data
            if(res.data.referee){
              this.shangji = true
            }else{
              this.shangji = false
            }
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //更新
    update(){
      // if(){

      // }
      this.versioninfo = true
    },
    isClear(){
      this.isClearCache = true
    },
    //清除缓存
    clearCache(){
      api.clearCache(function() {
        this.$vux.toast.text('清除完成');
      });
      api.getCacheSize(function(ret) {
        this.cacheSize = ret.size;
      });
    },
    //去实名
    goShiming(){
      if(this.setInfo&&this.setInfo.isauth){
        this.$vux.toast.text('已实名');
      }else{
        this.$router.push("realName")
      }
    }
  },
  created() {
    this.getsetInfo()
    this.version = localStorage.getItem("version");
    this.newVersion = localStorage.getItem("newVersion");
    // api.getCacheSize(function(ret) {
    //   this.cacheSize = ret.size;
    // });
    if(window.api){
      api.getCacheSize(function(ret) {
        this.cacheSize = ret.size;
      });  
    }
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#setting {
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
    border-bottom: 1px solid #EEEEEE;
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
      ;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .page_wrap{
    position: absolute;
    bottom: 0;
    width: 100%;
    // height: calc(100% - 0.88rem);
    // margin-top: 0.88rem;
    background: #ffffff;
    .btn{
      width: 100%;
      text-align: center;
      font-size: 0.32rem;
      margin-top: 4rem;
      color: #333333;
    }
  }
  .isloginOut{
    width: 5.8rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    // margin: 4rem auto 0;
    position: relative;
    padding: 0.3rem 0 0 0;
    .text1{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.32rem;
      color: #302E2E;
    }
    .cont{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      margin-top: 0.2rem;
      border-top: 1px solid #f2f2f2;
      div{
        width: 50%;
        height: 1rem;
        text-align: center;
        float: left;
        font-size: 0.34rem;
        box-sizing: border-box;
      }
      div:first-child{
        border-right: 1px solid #f2f2f2;
        color: #9C9C9C;
      }
      div:last-child{
        color: #7E38D2;
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
}
</style>
