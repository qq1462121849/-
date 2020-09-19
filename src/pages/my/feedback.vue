<template>
  <div id="feedback">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">功能反馈</div>
    </div>
    <div class="page_wrap">
      <div class="cont">
        <div class="title">问题反馈类型</div>
        <div class="backType">
          <div :class="type==1?'active':''" @click="chooseType(1)">
            <van-icon class="icon" v-if="type==1" name="success" />
            <span>功能异常</span>
          </div>
          <div :class="type==2?'active':''" @click="chooseType(2)">
            <van-icon class="icon" v-if="type==2" name="success" />
            <span>优化建议</span>
          </div>
          <div :class="type==3?'active':''" @click="chooseType(3)">
            <van-icon class="icon" v-if="type==3" name="success" />
            <span>其他反馈</span>
          </div>
        </div>
        <van-field
          v-model="remark"
          rows="5"
          autosize
          type="textarea"
          maxlength="500"
          placeholder="选择问题类型，并填写3字以上的反馈，我们将尽快解决"
          show-word-limit/>
        <div class="upload_img">
          <div class="img_wrap" v-if="imgArray.length">
            <img :src="item" v-for="(item,index) in imgArray" :key="index" :style="{marginRight:index==2?'0':'0.3rem'}">
          </div>
          <div class="up_btn" @click="showPopup" v-if="imgArray.length<3">
            <img src="../../assets/img/my/camera.png" alt="">
            <div>上传图片</div>
          </div>
        </div>
      </div>
      <div class="btn" @click="send">提 交</div>
    </div>
    <!-- 弹出层选择拍照还是相册 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '2rem' }">
      <div class="label" @click="choose(1)">从相册选择</div>
      <div class="label" @click="choose(2)">拍照</div>
    </van-popup>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "feedback",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      remark:'',
      type:1,
      show:false,
      sourceType: "camera",
      imgArray:[]
    };
  },
  methods: {
    chooseType(num){
      this.type = num
    },
    showPopup(num) {
      if(this.imgArray.length<3){
        this.show = true;
      }else{
        this.$vux.toast.text("上传图片不能超过三张！");
      }
    },
    choose(n) {
      /* 1 相册 album      2 拍照   camera*/
      this.sourceType = n == 1 ? "library" : "camera";
      this.camera();
    },
    camera() {
      this.show = false;
      var that = this;
      api.getPicture(
        {
          sourceType: that.sourceType,
          destinationType: "base64",
          quality: 70,
          // targetWidth: 1500,
          // targetHeight: 500,
          saveToPhotoAlbum: false
        },
        function(ret, err) {
          if (ret) {
            that.updateImg(ret.base64Data)
          } else {
            /* alert(JSON.stringify(err)); */
          }
        }
      );
    },
    updateImg(img){
      this.$http
        .post(
          "/mc/upload",
          {thumb:img},
          true
        )
        .then(res => {
          if(res.code == 1){
            console.log(res.data)
            this.imgArray.push(res.data.thumb)
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    send() {
      if (!this.remark) {
        this.$vux.toast.text("请填写反馈内容");
        return;
      }
      if(this.type==1){
        var title = '功能异常'
      }else if(this.type==2){
        var title = '优化建议'
      }else if(this.type==3){
        var title = '其他反馈'
      }
      var info = {
        title:title,
        info: this.remark,
        thumbs: this.imgArray.toString(),
      };
      this.$http.get("/mc/feedback", info, true).then(res => {
        if (res.code === 1) {
          this.$vux.toast.text(res.msg);
          this.type = 1
          this.remark = ''
          this.imgArray = []
        } else {
          this.$vux.toast.text(res.msg);
        }
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
#feedback {
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
      width: 3rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      ;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    margin-top: 0.88rem;
    background: #ffffff;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .cont{
      width: 100%;
      .title{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.32rem;
        color: #1A1A1A;
        font-weight: bold;
      }
      .backType{
        width: 100%;
        overflow: hidden;
        div{
          width: 2.3rem;
          height: 0.56rem;
          line-height: 0.56rem;
          text-align: center;
          float: left;
          color: #1A1A1A;
          font-size: 0.26rem;
          border: 1px solid #EEEEEE;
          margin-right: 0.06rem;
          box-sizing: border-box;
          .icon{
            font-size: 0.26rem;
            margin-right: 0.1rem;
          }
        }
        .active{
          border: 1px solid #F2281C;
          color: #F2281C;
        }
      }
      .van-cell{
        padding: 0 0.2rem;
        box-sizing: border-box;
        margin-top: 0.2rem;
        background: #FBFBFB;
        border-radius: 0.24rem;
        font-size: 0.24rem;
      }
      .upload_img{
        width: 100%;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        .img_wrap{
          width: 100%;
          overflow: hidden;
          img{
            width: 2rem;
            height: 2rem;
            float: left;
            background-color: #dddddd;
          }
        }
        .up_btn{
          width: 2.8rem;
          height: 2rem;
          background-color: #FBFAFA;
          border: 1px solid #EFEFEF;
          img{
            width: 0.54rem;
            height: 0.54rem;
            display: block;
            margin: 0 auto;
            margin-top: 0.5rem;
          }
          div{
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
          }
        }
      }
    }
    .btn{
      width: 7.1rem;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #ffffff;
      text-align: center;
      font-size: 0.32rem;
      border-radius: 0.5rem;
      background: linear-gradient(-12deg, #B01CCA, #7830F0);
      margin: 0 auto;
      margin-top: 3rem;
      box-shadow: 1px 0.08rem 0.27rem 0px rgba(120, 48, 240, 0.45);
    }
  }
}
.van-popup {
  .label {
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid #eee;
    color: #05e;
    font-size: 0.3rem;
    line-height: 1rem;
    text-align: center;
  }
}
</style>
