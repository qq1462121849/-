<template> 
  <div id="realName">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">实名认证</div>
    </div>
    <div class="realname" :style="{top: 0.88+'rem'}">
      <div class="rn_bg">
        <div class="rn_bg_img" @click="jumpTo('realNameInfo')"><img src="../../assets/img/my/realname_img.png" alt=""></div>
        <div class="rn_bg_tit" @click="success=true">进行实名认证</div>
      </div>
      <div class="rn_main">
        <div class="rn_main_list">
          <p class="rn_main_tit">真实姓名</p>
          <input class="rn_main_num" type="text" v-model="username" placeholder="请输入真实姓名">
        </div>
        <div class="rn_main_list">
          <p class="rn_main_tit">身份证号</p>
          <input class="rn_main_num" type="number" v-model="cardId" placeholder="请输入真实的身份证号">
        </div>
      </div>
      <div class="rn_btn" @click="toAttest">下一步（人脸识别）</div>
    <!-- 版本升级 -->
    <van-popup position="center"
      v-model="success"
      :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}"
      :mask-z-index="5000"
      :hide-on-blur="true">
      <div class="order_pup">
        <div class="order_pup_main">
          <div class="rn_success_img"><img src="../../assets/img/my/rn_success_bg.png" alt=""></div>
          <div class="rn_success_tit">实名认证成功</div>
          <div class="rn_success_btn" @click="jumpTo('/setting')">确认</div>
        </div>
      </div>
    </van-popup>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "refundList",
  data() {
    return {
      statusH:0,
      success: false,
      cardId:'',
      username:''
    };
  },
  methods: {
    getAttestStatus(){
      this.$http
        .post(
          "/mc/authFace",
        )
        .then(res => {
          if(res.code == 1){
            this.success = true
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //去实名
    toAttest(){
      this.$http
        .post(
          "/mc/auth",
          {
            username:this.username,
            idcard:this.cardId
          }
        )
        .then(res => {
          if(res.code == 1){
            window.location.href = res.data.authUrl
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    }
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    let that = this
    // api.addEventListener({ name:'resume' },function(ret,err){
    //   that.getAttestStatus()
    // });
    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        // 页面被挂起 
      }else {
        // 页面呼出
        that.getAttestStatus()
      }
    })
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#realName {
  position: relative;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
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
      width: 2rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      color: #222222;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .realname{
    width: 7.5rem;
    height: 100%;
    padding-top: 0.88rem;
    box-sizing: border-box;
    background: #FFFFFF;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .rn_bg{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #1A1A1A;
      font-size: 0.32rem;
      font-weight: 500;
      margin: 10% 0.1rem;
      .rn_bg_img{
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.27rem;
      }
    }
    .rn_main{
      height: 2rem;
      margin: 0 0.4rem;
      .rn_main_list{
        width: 6.72rem;
        height: 1rem;
        border-bottom: 1px solid #F0F0F0;
        font-size: 0.30rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .rn_main_tit{
          width: 1.6rem;
          text-align: center;
          display: inline-block;
          color: #1A1A1A;
          margin-right: 0.3rem;
        }
        .rn_main_num{
          transform-origin: center center;
          display: inline-block;
          color: #A5A5A5;
          border: 0;
          outline: none;
          background-color: rgba(0, 0, 0, 0);
        }
      }
    } 
    .rn_btn{
      width: 7rem;
      height: 0.9rem;
      margin: 2rem 0.25rem 0.5rem;
      background: rgb(135, 50, 179,0.4);
      color: #FFFFFF;
      font-size: 0.36rem;
      border-radius: 0.1rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
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
        height: 4.5rem;
        border-radius: 0.1rem;
        background: #ffffff;
        font-size: 0.36rem;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .rn_success_img{
          width: 1rem;
          height: 1rem;
          margin: 0.4rem 0 0.3rem;
        }
        .rn_success_tit{
          color: #0D0D0D;
          margin-bottom: 0.72rem;
        }
        .rn_success_btn{
          width: 5rem;
          height: 0.9rem;
          background: #E12F23;
          color: #FFFFFF;
          border-radius: 0.1rem;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  
}
</style>
