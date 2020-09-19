<template>
  <div id="addAddress">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">地址管理</div>
    </div>
    <div class="page_wrap" :style="{paddingTop: 0.88+'rem'}">
      <div class="dizhi_li" v-for="(item,index) in addressList" :key="index">
        <van-swipe-cell>
          <div class="cont">
            <div class="text1">
              <span class="text3">{{item.username}}</span>
              <span class="text4">{{item.mobile}}</span>
              <span class="btn1" v-if="item.isdefault">默认</span>
              <!-- <span class="btn2">家</span> -->
            </div>
            <div class="text2">{{item.province}}{{item.city}}{{item.district}}{{item.address}}</div>
            <van-icon name="edit" class="icon-edit" @click="handEdit(item)"/>
          </div>
          <div slot="right" class="cont_rg">
            <div class="title" @click="handDefault(item)">设为默认</div>
            <div class="text" @click="handDel(item.id, index)">删除</div>
          </div>
        </van-swipe-cell>
      </div>
      <div style="height: 2.6rem;width: 100%;"></div>
    </div>
    <div class="footer"><span @click="jumpTo('/editeAddress?type=1')">+ 新建收货地址</span></div>
  </div>
</template>

<script>
import * as utils from "../../utils";
export default {
  name: "addAddress",
  data() {
    return {
      statusH:0,
      addressList:null
    };
  },
  methods: {
    getAddressList(){//获取收货地址
      this.$http.post("/address/getlist", {}, true).then(res => {
        if(res.code == 1){
          this.addressList = res.data
        }else{
          this.$vux.toast.text(res.msg);
        }
      });
    },
    handDel(id, i){
      let btn = true;
      this.$dialog.confirm({ message: '您确定要删除这个地址？'}).then((e) => {
        this.$http.post('/address/remove', {id: id}).then(res => {
          if(res.code == 1){
            this.addressList.splice(i, 1);
          }
        })
      }).catch(() => {});
    },
    handEdit(item){
      let req = {
        id: item.id,
        username: item.username,
        mobile: item.mobile,
        province: item.province,
        city: item.city,
        district: item.district,
        code: item.code,
        address: item.address,
        isdefault: item.isdefault
      }
      utils.storage.set("gAddress", req);
      this.jumpTo('/editeAddress?type=2')
    },
    handDefault(item){
      if(item.isdefault != 1){
        item.isdefault = 1;
        this.$http.post("/address/update", item, true).then(res => {
          if(res.code == 1){
            this.getAddressList()
            this.$vux.toast.text("修改默认地址成功");
          }
        }).catch((err) => {})
      }
    }
  },
  created() {
    this.getAddressList()
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#addAddress {
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
      bottom: 0;
      left: 0.3rem;
      height: 0.88rem;
      line-height: 0.94rem;
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
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    .dizhi_li{
      width: 100%;
      .cont{
        width: 7.1rem;
        margin: 0 0.2rem;
        border-bottom: 1px solid #F5F5F5;
        position: relative;
        .text1{
          width: 100%;
          height: 0.8rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding-top: 0.1rem;
          span{
            font-size: 0.32rem;
            color: #222226;
          }
          .text3{
            font-weight: bold;
          }
          .text4{
            font-size: 0.3rem;
            margin-left: 0.1rem;
          }
          .btn1{
            font-size: 0.2rem;
            padding: 0.04rem 0.1rem;
            background-color: #F2261A;
            color: #ffffff;
            border-radius: 0.1rem;
            margin-left: 0.1rem;
          }
          .btn2{
            font-size: 0.2rem;
            padding: 0.04rem 0.12rem;
            background-color: #4E88FF;
            color: #ffffff;
            border-radius: 0.1rem;
            margin-left: 0.1rem;
          }
        }
        .text2{
          width: 6.6rem;
          line-height: 0.4rem;
          padding: 0 0.5rem 0.2rem 0;
          overflow: hidden;
          font-size: 0.24rem;
          color: #262626;
        }
        .icon-edit{
          font-size: 0.34rem;
          position: absolute;
          right: 0;
          bottom: 0.2rem;
        }
      }
      .cont_rg{
        width: 3rem;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        .title{
          width: 1.5rem;
          height: 100%;
          font-size: 0.24rem;
          background-color: #F6F6F6;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text{
          width: 1.5rem;
          height: 100%;
          text-align: center;
          color: #ffffff;
          font-size: 0.24rem;
          background: linear-gradient(-12deg, #E82016, #FF5418);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 1rem;
    left: 0;
    height: 0.8rem;
    width: 100%;
    text-align: center;
    span{
      display: inline-block;
      cursor: pointer;
      width: 6.78rem;
      height: 0.8rem;
      line-height: 0.8rem;
      border-radius: 0.4rem;
      text-align: center;
      color: #ffffff;
      font-size: 0.3rem;
      background: linear-gradient(270deg, #933EDA, #7830F0);
    }
  }
}
</style>
