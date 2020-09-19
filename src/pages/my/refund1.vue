<template>
  <div id="refund1">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.24+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">申请退款</div>
    </div>
    <div class="page_wrap">
      <div class="status_wrap">
        <div class="model" @click="select(1)">
          <p class="text1">申请类型</p>
          <p class="text2">{{commonList[checklist]}}</p>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="model" @click="select(2)" v-if="checklist == 1">
          <p class="text1">收货状态</p>
          <p :class="[checklist2 > -1 ? 'text2' : 'text3']">{{checklist2 > -1 ? commonList2[checklist2] : '点击选择货物状态'}}</p>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="model" @click="select(3)">
          <p class="text1">申请原因</p>
          <p :class="[checklist3 > -1 ? 'text2' : 'text3']">{{checklist3 > -1 ? commonList3[checklist3] : '点击选择申请原因'}}</p>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="price_wrap">
        <div class="title">退款金额</div>
        <div class="cont">
          <span class="text1" v-if="!isEdite">¥ {{info ? info.price : '0'}}</span>
          <input class="text2" v-if="isEdite" type="number" placeholder="请输入金额" v-model="price">
          <span class="text3" @click="editePrice">修改金额</span>
          <img @click="editePrice" src="../../assets/img/my/edite.png" alt="">
        </div>
        <div class="bt">若退款成功，将退还给您 ¥{{price}} 现金</div>
      </div>
      <div class="remark">
        <div class="title">
          <span>申请说明</span>
          <span>您还可以输入{{remarkLength}}字</span>
        </div>
        <textarea class="text" placeholder="必填，请您详细填写申请说明" v-model="remark" @change="monitorLength"></textarea>
        <div class="upload_img">
          <div class="img_wrap" v-if="imgArray.length">
            <img :src="item" v-for="(item,index) in imgArray" :key="index" :style="{marginRight:index==2?'0':'0.3rem'}">
          </div>
          <div class="up_btn" @click="showPopup" v-if="imgArray.length<3">
            <img src="../../assets/img/my/update_img.png" alt="">
            <input v-if="test" type="file" accept="image/*" class="upload-img" id="files" @change="tobase()" />
          </div>
        </div>
      </div>
      <div class="tel_num">
        <span>联系电话</span>
        <input class="text2" type="number" placeholder="请输入联系电话" v-model="mobile">
      </div>
      <div class="submit" @click="submit">提交申请</div>
    </div>
    <van-popup v-model="showModel1" position="bottom">
      <div class="model_cont">
        <van-radio-group v-model="checklist" @change="showModel1=false">
          <van-radio v-for="(item, index) in commonList" :key="index" :name="index">{{ item }}</van-radio>
        </van-radio-group>
      </div>
    </van-popup>
    <van-popup v-model="showModel2" position="bottom">
      <div class="model_cont">
        <van-radio-group v-model="checklist2" @change="showModel2=false">
          <van-radio v-for="(item, index) in commonList2" :key="index" :name="index">{{ item }}</van-radio>
        </van-radio-group>
      </div>
    </van-popup>
    <van-popup v-model="showModel3" position="bottom">
      <div class="model_cont">
        <van-radio-group v-model="checklist3" @change="showModel3=false">
          <van-radio v-for="(item, index) in commonList3" :key="index" :name="index">{{ item }}</van-radio>
        </van-radio-group>
      </div>
    </van-popup>
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
  name: "refund1",
  data() {
    return {
      statusH:0,
      showModel1:false,
      showModel2:false,
      showModel3:false,
      checklist:0,
      checklist2:-1,
      checklist3:-1,
      commonList:['我要退货退款','我要退款（无需退货)'],
      commonList2:['未收到货','已收到货'],
      commonList3:['不喜欢、效果不好','多拍、错拍、不想要', '材质问题', '功能性能问题', '做工瑕疵', '货物与描述不符', '质量问题', '收到商品少件、破损或污渍', '颜色、款式、图案与描述不符', '商家发错货', '其他'],
      isEdite:false,
      price:null,
      imgArray:[],
      show:false,
      sourceType: "camera",
      remark:'',
      remarkLength: 170,
      mobile: '',
      test: false,
    };
  },
  created() {
    let info = utils.storage.get("refund") || '', user = utils.storage.get("userInfo") || '';
    this.info = info;
    this.price = info.price
    this.mobile = user ? user.mobile : ''
    this.checklist = this.$route.query.type ? parseInt(this.$route.query.type) : 0;
    console.log(info);
  },
  methods: {
    select(num){
      if(num == 1){
        this.showModel1 = true
      }else if(num == 2){
        this.showModel2 = true
      }else if(num == 3){
        this.showModel3 = true
      }
    },
    change (val, label) {
      console.log('change', val, label)
    },
    editePrice(){
      this.isEdite = true
    },
    showPopup(num) {
      if(this.imgArray.length<3){
        this.show = true;
      }else{
        this.$vux.toast.text("上传图片不能超过三张！");
      }
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
    choose(n) {
      /* 1 相册 album      2 拍照   camera*/
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
      },
      function(ret, err) {
        if (ret) {
          that.imgArray.push(ret.base64Data)
        }
      });
    },
    submit () { // 提交
      if(this.checklist == 1 && this.checklist2 == -1){this.$vux.toast.text('请选择收货状态'); return false;}
      if(this.checklist3 == -1){this.$vux.toast.text('请选择申请原因'); return false;}
      if(!this.price){this.$vux.toast.text('请填写退款金额'); return false;}
      if(!this.remark){this.$vux.toast.text('请填写退款申请说明'); return false;}
      if(!this.imgArray.length){this.$vux.toast.text('请上传图片'); return false;}
      if(!this.mobile){this.$vux.toast.text('请填写联系电话'); return false;}
      this.$http.post('/spell/returnOrder', {
        orderId: this.info.orderId, 
        detailId: this.info.id,
        applyModel: this.checklist == 1 ? 2 : 1,
        orderStatus: this.checklist2 == 1 ? 2 : (this.checklist2 == 0 ? 1 : ''),
        applyInfo: this.commonList3[this.checklist3],
        info: this.remark,
        thumbs: this.imgArray,
        mobile: this.mobile,
        price: this.price,
      }).then(res => {
        if(res.code == 1){
          this.$vux.toast.text(res.msg || '申请退款成功');
          this.goBack(-2)
        }
      })
    },
    monitorLength(){
      this.remarkLength = 170 - this.remark.length
    }
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#refund1 {
  position: relative;
  height: 100%;
  input.upload-img{ position:absolute;width:100%;height:100%;z-index:999;opacity:0;top:0;left:0 }
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
      color: #222222;
      font-size: 0.36rem;
      font-weight: 700;
      margin: 0 auto;
    }
  }
  .page_wrap{
    width: 100%;
    margin-top: 0.88rem;
    margin-bottom: 1rem;
    overflow-y: auto;
    .status_wrap{
      width: 100%;
      padding: 0 0.3rem;
      box-sizing: border-box;
      background: #fff;
      .model {
        height: 1rem;
        border-bottom: 0.01rem solid #eee;
        > p {
          font-size: 0.32rem;
          color: #333;
          height: 1rem;
          line-height: 1rem;
          float: left;
        }
        > i {
          float: right;
          line-height: 1rem;
          color: #999;
        }
        > span {
          float: right;
          color: #666;
          font-size: 0.28rem;
          line-height: 1rem;
          margin-right: 0.22rem;
        }
        .text1{
          color: #666666;
        }
        .text2{
          color: #333333;
          margin-left: 0.2rem;
        }
        .text3{
          color: #CCCCCC;
          margin-left: 0.2rem;
        }
      }
      .model:last-child{
        border-bottom: none;
      }
    } 
    .price_wrap{
      width: 100%;
      padding-top: 0.2rem;
      box-sizing: border-box;
      .title{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.32rem;
        color: #666666;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background-color: #ffffff;
      }
      .cont{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background-color: #ffffff;
        .text1{
          float: left;
          font-size: 0.48rem;
          color: #333333;
          font-weight: 600;
        }
        .text2{
          font-size: 0.32rem;
          border: none;
          width: 3rem;
          float: left;
        }
        img{
          width: 0.24rem;
          height: 0.24rem;
          display: block;
          float: right;
          margin-top: 0.28rem;
        }
        .text3{
          float: right;
          font-size: 0.32rem;
          color: #999999;
          margin-left: 0.1rem;
        }
      }
      .bt{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-indent: 0.2rem;
        font-size: 0.24rem;
        color: #999999;
      }
    }
    .remark{
      width: 100%;
      padding: 0 0.2rem;
      padding-bottom: 0.2rem;
      box-sizing: border-box;
      background-color: #ffffff;
      .title{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        overflow: hidden;
        span:first-child{
          float: left;
          font-size: 0.32rem;
          color: #666666;
        }
        span:last-child{
          float: right;
          font-size: 0.24rem;
          color: #999999;
        }
      }
      .text{
        width: 100%;
        height: 2rem;
        border: none;
        resize:none;
        font-size: 0.32rem;
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
          width: 1.6rem;
          height: 1.6rem;
          border: 1px solid #EFEFEF;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            display: block;
            margin: 0 auto;
          }
          div{
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
          }
        }
      }
    }
    .tel_num{
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      padding: 0 0.2rem;
      font-size: 0.32rem;
      color: #333333;
      margin-top: 0.2rem;
      background: #fff;
      box-sizing: border-box;
      input{
        border:none;
        text-indent: 0.1rem;
      }
    }
    .submit{
      width: 6.9rem;
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.32rem;
      text-align: center;
      color: #ffffff;
      background-color: #ED2800;
      margin: 0.5rem auto 0;
      border-radius: 0.1rem;
    }
  }
  .model_cont{
    width: 5.8rem;
    padding: 0.5rem 0.2rem;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 0.2rem;
    position: relative;
  }
  .van-radio{margin: 0.14rem 0;}
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
}
</style>
