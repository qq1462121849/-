<template>
  <div id="upgrade">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">升级代理</div>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <!-- <div class="top_title">
        <span class="text1">代理规则</span>
        <span class="text2">详情></span>
      </div> -->
      <div class="rule">
        <div class="title">规则说明</div>
        <div class="cont" :class="showRuleStatus?'cont1':''">
          <div class="text" v-html="rules"></div>
        </div>
        <div class="btn" @click="showRule" v-if="rules.length>138">
          <img src="../../assets/img/task/down_show.png" alt="">
        </div>
      </div>
      <div class="info_li_wrap">
        <div class="info_li" v-for="(item,index) in dlInfo.list" :key="item.id">
          <div class="content" :class="classArry[index]">
            <img class="lf_img" :src="item.thumb" alt="">
            <div class="cont">
              <p class="text1">{{item.title}}</p>
              <p class="text2">直缴{{item.price}}元{{item.zhi>0?'或直邀'+item.zhi+"人":''}} </p>
            </div>
            <img class="rg_img" v-if="dlInfo.agent >= item.id" src="../../assets/img/my/right.png" alt="">
            <img class="rg_img1" v-if="dlInfo.agent < item.id" src="../../assets/img/my/up.png" alt="" @click="levelUp(item.id)">
            <!-- <div class="rg_btn">升级</div> -->
          </div>
          <div class="li_bt">
            <div class="hide_cont slide" :class="item.show?animate:''">
              <div>
                <p>团队({{item.plevel}}级)拼单</p>
                <p>直邀用户升代理</p>
              </div>
              <div>
                <p>{{item.ping}}%</p>
                <p>{{item.agent}}%</p>
              </div>
              <div>
                <p>立即发放</p>
                <p>立即发放</p>
              </div>
            </div>
            <div class="bt_wrap">
              <x-icon type="ios-arrow-up" size="30" v-if="item.show" @click="showCont(index)"></x-icon>
              <x-icon type="ios-arrow-down" size="30" v-else @click="showCont(index)"></x-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XDialog, Tab, TabItem, Cell, Group } from "vux";
export default {
  name: "upgrade",
  components: {
    XDialog,
    Tab,
    TabItem,
    Cell,
    Group
  },
  data() {
    return {
      nowIndex:1,
      statusH:0,
      animate:'animate',
      classArry:[
        'content1',
        'content2',
        'content3',
        'content4',
        'content5',
      ],
      data:[
        {show:false},
        {show:false},
        {show:false},
        {show:false},
        {show:false},
      ],
      showRuleStatus:false,
      dlInfo:null,
      rules:''
    };
  },
  methods: {
    showCont(num){
      this.dlInfo.list.forEach((item,index)=>{
        if(index==num){
          item.show = !item.show
        }
      })
      console.log(this.showStatus)
    },
    showRule(){
      this.showRuleStatus = !this.showRuleStatus
    },
    //获取规则
    getRule(){
      this.$http
        .post(
          "/auth/agreement",
          {type:6}
        )
        .then(res => {
          if(res.code == 1){
            this.rules = res.data.info
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //获取代理列表信息
    getUAInfo(){
      this.$http
        .post(
          "/mc/agentInfo",
        )
        .then(res => {
          if(res.code == 1){
            console.log(res.data)
            res.data.list.forEach((item,index)=>{
              item.show = false
            })
            this.dlInfo = res.data
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    },
    //升级
    levelUp(id){
      // let num1=0,num2=0,num3=0
      // this.dlInfo.list.forEach((item,index)=>{
      //   if(item.id==this.dlInfo.agent){
      //     num1 = item.price
      //   }
      //   if(item.id==id){
      //     num2 = item.price
      //   }
      // })
      // num3 = num2-num1
      this.$http
        .post(
          "/mc/agentUp",
          {agentId:id}
        )
        .then(res => {
          if(res.code == 1){
            this.$router.push({
              name:'verify_order1',
              query:{
                id:res.data.orderId,
                // price:num3
              }
            })
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    }
  },
  created() {
    this.getUAInfo()
    this.getRule()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
#upgrade {
  position: relative;
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
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
      width: 2.5rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      color: #222222;
      font-size: 0.32rem;
      font-weight: 700;
      margin: 0 auto;
    }
  }
  .page_wrap{
    position: absolute;
    left: 0;
    right: 0;
    height: calc(100% - 1rem);
    overflow-y: auto;
    width: 100%;
    .top_title{
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      background-color: #efdcf3;
      overflow: hidden;
      .text1{
        float: left;
        font-size: 0.24rem;
        font-weight: 500;
        color: #D75DEF;
        margin-left: 0.3rem;
      }
      .text2{
        float: right;
        font-size: 0.24rem;
        font-weight: 500;
        color: #D75DEF;
        margin-right: 0.5rem;
      }
    }
    .rule{
      width: 6.9rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      background-color: #fff;
      margin: 0 auto;
      margin-top: 0.2rem;
      border-radius: 0.2rem;
      background: url("../../assets/img/task/bg2.png") no-repeat;
      background-size: 100% 100%;
      .title{
        font-size: 0.3rem;
        font-weight: 600;
      }
      .cont{
        width: 100%;
        height: auto;
        max-height: 2.55rem;
        overflow: hidden;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
        .text{
          font-size: 0.28rem;
          font-weight: 500;
          color:rgba(51,51,51,1);
        }
      }
      .cont1{
        max-height: 9999px;
        height: auto;
        overflow: auto;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
      }
      .btn{
        width: 100%;
        overflow: hidden;
        img{
          width: 0.35rem;
          height: 0.28rem;
          display: block;
          margin: 0 auto;
          margin-top: 0.1rem;
        }
      }
    }
    .info_li_wrap{
      width: 100%;
      margin-top: 0.3rem;
      padding: 0 0.3rem;
      box-sizing: border-box;
      .info_li{
        width: 100%;
        margin-bottom: 0.2rem;
        background-color: #fff;
        border-radius: 0.2rem;
        .content{
          width: 100%;
          height: 1.9rem;
          overflow: hidden;
          .lf_img{
            width: 1.34rem;
            height: 1.34rem;
            float: left;
            margin-top: 0.3rem;
            margin-left: 0.2rem;
          }
          .cont{
            float: left;
            overflow: hidden;
            .text1{
              font-size: 0.3rem;
              font-weight: 600;
              color: #ffffff;
              margin-top: 0.5rem;
            }
            .text2{
              font-size: 0.24rem;
              font-weight: 500;
              color: #ffffff;
              margin-top: 0.1rem;
            }
          }
          .rg_img{
            width: 0.56rem;
            height: 0.56rem;
            float: right;
            margin-top: 0.6rem;
            margin-right: 0.5rem;
          }
          .rg_img1{
            width: 1.7rem;
            height: 1.13rem;
            float: right;
            margin-top: 0.6rem;
          }
          .rg_btn{
            width: 1.1rem;
            height: 0.52rem;
            line-height: 0.52rem;
            float: right;
            margin-top: 0.6rem;
            margin-right: 0.5rem;
            text-align: center;
            background-color: #fff;
            border-radius: 0.1rem;
          }
        }
        .content1{
          background: url("../../assets/img/my/agent_grade_bac1.png") no-repeat;
          background-size: 100% 100%;
        }
        .content2{
          background: url("../../assets/img/my/agent_grade_bac2.png") no-repeat;
          background-size: 100% 100%;
        }
        .content3{
          background: url("../../assets/img/my/agent_grade_bac3.png") no-repeat;
          background-size: 100% 100%;
        }
        .content4{
          background: url("../../assets/img/my/agent_grade_bac4.png") no-repeat;
          background-size: 100% 100%;
        }
        .content5{
          background: url("../../assets/img/my/agent_grade_bac5.png") no-repeat;
          background-size: 100% 100%;
        }
        .li_bt{
          width: 100%;
          overflow: hidden;
          .hide_cont{
            background-color: #ffe7f5;
            >div{
              width: 100%;
              height: 0.6rem;
              line-height: 0.6rem;
              overflow: hidden;
              p{
                float: left;
                width: 50%;
                text-align: center;
              }
            }
          }
          .bt_wrap{
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
