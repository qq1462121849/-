<template>
  <div id="appraisal">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.24+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">评价</div>
      <div class="header_rg" @click="save">发布</div>
    </div>
    <div class="page_wrap" :style="{top: 1.08+'rem'}">
      <div class="content1">
        <div class="goods_title" v-if="info">
          <img :src="info.thumb" alt="">
          <div class="title">{{info.goodsName}}</div>
        </div>
        <div class="rater">
          <div class="text">描述相符</div>
          <div class="star"><van-rate v-model="raterNum" color="#ff5013" /></div>
          <div class="remark">{{raterNum | rateFliter}}</div>
        </div>
        <textarea class="text_enter" v-model="rater" autofocus placeholder="从多个角度评价宝贝，可以帮助更多想买的人"></textarea>
        <div class="upload_img">
          <div class="img_wrap" v-if="imgArray.length">
            <img :src="item" v-for="(item,index) in imgArray" :key="index" :style="{marginRight:index==2?'0':'0.3rem'}">
          </div>
          <div class="up_btn" @click="showPopup" v-if="imgArray.length<3">
            <img src="../../assets/img/my/camera.png" alt="">
            <div>为宝贝拍买家秀</div>
            <input v-if="test" type="file" accept="image/*" class="upload-img" id="files" @change="tobase()" />
          </div>
        </div>
      </div>
      <div class="content2">
        <div class="star_li">物流服务<div class="star"><van-rate v-model="raterNum1" color="#ff5013" /></div><div class="remark">{{raterNum1 | rateFliter}}</div></div>
        <div class="star_li">服务态度<div class="star"><van-rate v-model="raterNum2" color="#ff5013" /></div><div class="remark">{{raterNum2 | rateFliter}}</div></div>
      </div>
    </div>
    <!-- 弹出层选择拍照还是相册 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '2rem' }">
      <div class="label" @click="choose(1)">从相册选择</div>
      <div class="label" @click="choose(2)">拍照</div>
    </van-popup>
  </div>
</template>

<script>
import * as utils from "../../utils";
export default {
  name: "appraisal",
  data() {
    return {
      test: false,
      statusH:0,
      raterNum:0,
      raterNum1:0,
      raterNum2:0,
      rater: '',
      show:false,
      sourceType: "camera",
      imgArray:[],
      info: ''
    };
  },
  created() {
    this.info = utils.storage.get('orderItem');
  },
  methods: {
    showPopup(num) {
      if(this.imgArray.length<3){
        this.show = true;
      }else{
        this.$vux.toast.text("上传图片不能超过三张！");
      }
    },
    choose(n) {  /* 1 相册 album      2 拍照   camera*/
      this.sourceType = n == 1 ? "album" : "camera";
      this.camera();
    },
    camera() {
      this.show = false;
      var that = this;
      api.getPicture({
        sourceType: that.sourceType,
        destinationType: "base64",
        quality: 70,
        saveToPhotoAlbum: false
      },function(ret, err) {
        if (ret) {
          that.imgArray.push(ret.base64Data)
        }
      });
    },
    tobase () {
      if(!document.getElementById('files').value){return ""}
      let file = document.getElementById('files').files[0];
      let reader = new FileReader();
      reader.onload = () => {
        this.imgArray.push(reader.result);
      }
      reader.readAsDataURL(file);
    },
    save () {
      if(!this.raterNum){this.$vux.toast.text('请选择描述相关'); return false;}
      if(!this.raterNum1){this.$vux.toast.text('请选择物流服务'); return false;}
      if(!this.raterNum2){this.$vux.toast.text('请选择服务态度'); return false;}
      if(!this.rater){this.$vux.toast.text('请填写评论'); return false;}
      this.$http.post('/spell/commentOrder', {orderId: this.info.orderId, goods: this.raterNum, info: this.rater, express: this.raterNum1, service: this.raterNum2, thumbs: this.imgArray}).then((res) => {
        if(res.code == 1){
          this.$vux.toast.text('评论成功');
          this.goBack();
        }
      })
    }
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  },
  filters:{
    rateFliter(v){
      v = parseInt(v)
      let res = ''
      switch (v) {
        case 1: res = '很差'; break;
        case 2: res = '一般'; break;
        case 3: res = '满意'; break;
        case 4: res = '非常满意'; break;
        case 5: res = '无可挑剔'; break;
      }
      return res;
    }
  }
};
</script>

<style scoped lang='less'>
#appraisal {
  position: relative;
  height: 100%;
  input.upload-img{ position:absolute;width:100%;height:100%;z-index:999;opacity:0;top:0;left:0 }
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    overflow: hidden;
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
      width: 4rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      color: #222222;
      font-size: 0.36rem;
      font-weight: 700;
      margin: 0 auto;
    }
    .header_rg{
      position: absolute;
      bottom: 0;
      right: 0;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      padding: 0 0.2rem;
      font-size: 0.3rem;
      color: #333;
    }
  }
  .page_wrap{
    position: absolute;
    bottom: 0;
    width: 7.14rem;
    margin-left: auto;
    margin-right: auto;
    .content1{
      width: 100%;
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      .goods_title{
        width: 100%;
        overflow: hidden;
        img{
          width: 1rem;
          height: 1rem;
          float: left;
          background-color: #dddddd;
        }
        .title{
          width: calc(100% - 1.1rem);
          margin-left: 0.1rem;
          float: left;
          height: 1rem;
          font-size: 0.28rem;
          line-height: 0.5rem;
          color: #525252;
          display: flex;
          align-items: center;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .rater{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        .text{
          font-size: 0.29rem;
          color: #525252;
        }
        .star{
          float: left;
          margin-left: 0.2rem;
          display: flex;
          align-items: center;
        }
        .remark{
          margin-left: 0.2rem;
          font-size: 0.26rem;
          color: #666;
        }
      }
      .text_enter{
        width: 100%;
        height: 3rem;
        border: none;
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
          position: relative;
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
    .content2{
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      background-color: #ffffff;
      .star_li{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        align-items: center;
        .star{
          margin-left: 0.2rem;
          display: flex;
          align-items: center;
        }
        .remark{
          margin-left: 0.2rem;
          font-size: 0.26rem;
          color: #666;
        }
      }
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
