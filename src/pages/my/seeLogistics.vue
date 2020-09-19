<template>
  <div id="logistics">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.24+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">查看物流</div>
    </div>
    <div class="page_wrap" :style="{top: statusH+0.88+'rem'}">
      <div class="good_info" v-if="info">
        <img :src="info.thumb" alt="">
        <div class="title">{{info.goodsName}}</div>
        <div class="rg_text">
          <span>{{orderStatus[info.orderStatus]}}</span>
        </div>
      </div>
      <div class="logistics_info">
        <div class="title">
          <span>{{info.expressName}} {{info.expressNo}}</span>
          <img src="../../assets/img/my/logistics/copy.png" alt="" @click="copyTextShare(info.expressNo)">
        </div>
        <div class="info_wrap">
          <div class="info_li" v-for="(v, i) in list" :key="i">
            <div class="time time1">
              <div>{{v.day}}</div>
              <div>{{v.times}}</div>
            </div>
            <div class="vertical">
              <div :class="['icon_img', i == 0 ? 'active' : '']">
                <img src="../../assets/img/my/logistics/yilanjian.png" v-if="v.status.indexOf('揽收') > -1" alt="">
                <img src="../../assets/img/my/logistics/yifahuo.png" v-else-if="v.status.indexOf('备货') > -1" alt="">
                <img src="../../assets/img/my/logistics/yunshuzhong.png" v-else-if="v.status.indexOf('运输') > -1" alt="">
                <img src="../../assets/img/my/logistics/paijianzhong.png" v-else-if="v.status.indexOf('派件') > -1" alt="">
                <img src="../../assets/img/my/logistics/qianshou.png" v-else alt="">
              </div>
              <div class="line"></div>
            </div>
            <div class="cont cont1">
              <div class="text1">{{v.status}}</div>
              <div>{{v.context}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from "../../utils";
export default {
  name: "logistics",
  data() {
    return {
      statusH:0,
      active: 1,
      id: '',
      list: [],
      info: '',
      orderStatus: ''
    };
  },
  methods: {
    init(){
      if(this.id){
        this.orderStatus = utils.storage.get('orderStatus');
        this.$http.post("/spell/logisticsInfo", {orderId: this.id}, true).then(res => {
          if(res.code == 1){
            this.info = res.data.orderInfo;
            this.list = res.data.list;
          }
        }).catch(() => {});
      } else {
        this.$vux.toast.text("物流信息出现异常");
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.init()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#logistics {
  position: relative;
  height: 100%;
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
      width: 2rem;
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
    position: absolute;
    left: 0;
    right: 0;
    overflow-y: auto;
    .good_info{
      width: 7.1rem;
      height: 1.1rem;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 0.2rem;
      margin-top: 0.2rem;
      overflow: hidden;
      padding: 0 0.3rem;
      box-sizing: border-box;
      img{
        width: 0.64rem;
        height: 0.64rem;
        float: left;
        margin-top: 0.25rem;
        background-color: #dddddd;
      }
      .title{
        width: 4.2rem;
        height: 0.7rem;
        overflow: hidden;
        margin-top: 0.2rem;
        margin-left: 0.1rem;
        float: left;
        font-size: 0.22rem;
        color: #333333;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .rg_text{
        width: 1.2rem;
        height: 100%;
        float: right;
        span{
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          text-align: right;
          display: inline-block;
          margin-top: 0.3rem;
          font-weight: 600;
          font-size: 0.3rem;
          border-left: 1px solid #D5D5D5;
        }
      }
    }
    .logistics_info{
      width: 7.1rem;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 0.2rem;
      margin-top: 0.2rem;
      margin-bottom: 0.5rem;
      .title{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.22rem;
        padding: 0 0.3rem;
        box-sizing: border-box;
        span{
          float: left;
        }
        img{
          width: 0.3rem;
          height: 0.3rem;
          float: left;
          margin-top: 0.28rem;
          margin-left: 0.1rem;
        }
      }
      .info_wrap{
        width: 100%;
        padding: 0 0.2rem;
        margin-top: 0.5rem;
        box-sizing: border-box;
        .info_li{
          width: 100%;
          overflow: hidden;
          .time{
            width: 0.8rem;
            float: left;
            text-align: center;
            color: #9B9B9B;
            font-size: 0.24rem;
          }
          .time1{
            color: #616161;
          }
          .vertical{
            width: 0.6rem;
            height: 100%;
            float: left;
            position: relative;
            .icon_img{
              position: absolute;
              left: 0.05rem;
              width: 0.46rem;
              height: 0.46rem;
              border: 1px solid #CDCDCD;
              border-radius: 50%;
              background: #f4f4f4;
              img{
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .line{
              width: 2px;
              height: 100%;
              min-height: 1.8rem;
              margin: 0 auto;
              background: #dddddd;
            }
            .active{
              background: linear-gradient(-12deg,rgba(175,27,201,1),rgba(119,47,239,1));
            }
          }
          .cont{
            width: 5.3rem;
            float: left;
            padding-left: 0.1rem;
            box-sizing: border-box;
            color: #9B9B9B;
            .text1{
              font-size: 0.28rem;
            }
            .text2{
              color: #842BE6;
            }
          }
          .cont1{
            color: #616161;
          }
        }
        .info_li:last-child .vertical .line{
          background: #fff
        }
      }
    }
  }
}
</style>
