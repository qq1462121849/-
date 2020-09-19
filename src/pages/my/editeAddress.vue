<template>
  <div id="editeAddress">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">{{type ? '新建收货人' : '编辑收货人'}}</div>
      <div class="del" @click="handDel" v-if="type != 1">删除</div>
    </div>
    <div class="page_wrap">
      <div class="cont1">
        <div class="cont_li">
          <span>收货人</span>
          <van-field class="text" v-model="username" placeholder="请输入收货人姓名" />
        </div>
        <div class="cont_li">
          <span>手机号码</span>
          <van-field class="text" v-model="mobile" placeholder="请输入收货人手机号码" />
        </div>
        <div class="cont_li">
          <span>所在地区</span>
          <span @click="AddressShow=true" :class="['cont_right',value ? 'cont_black' : 'cont_gray']">{{value ? (province+', '+city+', '+district):'点击选择省市县'}}</span>
        </div>
        <div class="cont_li1">
          <span>详细地址</span>
          <van-field class="text" rows="2" autosize type="textarea" v-model="address" placeholder="请输入收货详细地址" />
        </div>
      </div>
      <div class="gempty"></div>
      <div class="cont2">
        <!-- <div class="cont_li">
          <span class="text1">标签</span>
          <span class="text2" :class="labelStatus==1?'text3':''" @click="chooseLabel(1)">家</span>
          <span class="text2" :class="labelStatus==2?'text3':''" @click="chooseLabel(2)">公司</span>
          <span class="text2" :class="labelStatus==3?'text3':''" @click="chooseLabel(3)">学校</span>
        </div> -->
        <div class="set_default">
          <div class="lf">
            <div>设置默认地址</div>
            <div>提醒：每次下单会默认推荐使用该地址</div>
          </div>
          <div class="rg">
            <van-switch v-model="setStatus" @change="handChange" size="22px" active-color="#AA54D8"/>
          </div>
        </div>
        <div class="btn" @click="submit">保存</div>
      </div>
    </div>
    <van-popup v-model="AddressShow" position="bottom">
      <van-area :area-list="areaList" @cancel="AddressShow=false" @confirm="handOk" :value="value" />
    </van-popup>
  </div>
</template>

<script>
import area from '@/components/area';
import * as utils from "../../utils";
export default {
  name: "editeAddress",
  data() {
    return {
      type: 1,     // 1-新建  2-编辑
      statusH:0,
      id: 0,          // type-2必传
      username: '',   // 用户名
      mobile: '',     // 手机号
      province: '',   // 省份
      city: '',       // 市
      district: '',   // 县/区
      value: '',      // 城市编号
      address: "",    // 详细地址
      isDefault: 0,   // 0-不是默认地址  1-默认地址
      AddressShow: false,
      areaList: '',
      setStatus: false
    };
  },
  created() {
    this.type = this.$route.query.type || 1;
    this.areaList = area;
    if(this.type == 2){
      let address = utils.storage.get("gAddress");
      this.id = address.id || 0;
      this.username = address.username; 
      this.mobile = address.mobile;
      this.province = address.province;
      this.city = address.city; 
      this.district = address.district; 
      this.address = address.address; 
      this.value = address.code; 
      this.isDefault = address.isdefault;
      this.setStatus = address.isdefault == 1 ? true : false;
    }
  },
  methods: {
    handOk(v){
      this.province = v[0].name;
      this.city = v[1].name;
      this.district = v[2].name;
      this.value = v[2].code;
      this.AddressShow = false;
    },
    submit () { // 提交
      if(!this.username){this.$vux.toast.text('请填写姓名'); return false}
      if(!this.mobile){this.$vux.toast.text('请填写手机号'); return false}
      if (!(/^1[0-9]{10}$/.test(this.mobile))) { this.$vux.toast.text('请输入正确的手机号');return}
      if(!this.value){this.$vux.toast.text('请选择地址'); return false}
      if(!this.address){this.$vux.toast.text('请填写具体地址'); return false}
      let req = {
        username: this.username,
        mobile: this.mobile,
        province: this.province,
        city: this.city,
        district: this.district,
        code: this.value+'',
        address: this.address,
        isdefault: this.isDefault
      }
      let url = '/address/add'
      if(this.type == 2){
        req.id = this.id;
        url = '/address/update'
      }
      this.$http.post(url, req, true).then(res => {
        if(res.code == 1){
          if(this.type == 1){
            this.$vux.toast.text("新增地址成功");
          }else{
            this.$vux.toast.text("修改地址成功");
          }
          this.goBack();
        }
      }).catch((err) => {});
    },
    handChange(v){
      if(this.setStatus){
        this.isDefault = '1'
      }else{
        this.isDefault = '0'
      }
    },
    handDel () { // 删除
      this.$dialog.confirm({ message: '您确定要删除这个地址？'}).then((e) => {
        this.$http.post('/address/remove', {id: this.id}).then(res => {
          if(res.code == 1){
            this.goBack();
          }
        })
      }).catch(() => {});
    }
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#editeAddress {
  position: relative;
  height: 100%;
  /deep/ .van-cell{padding: 10px 0;}
  .gempty{width: 100%;height: 0.2rem;background: #F5F5F5;}
  background-color: #ffffff;
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
      width: 4rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.36rem;
      margin: 0 auto;
    }
    .del{
      position: absolute;
      bottom: 0;
      right: 0.3rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.28rem;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    margin-top: 0.88rem;
    .cont_black{
      color: #333;
    }
    .cont_gray{
      color: #ccc
    }
    .cont_right{
      flex: 1;
    }
    .cont1{
      width: 100%;
      padding: 0 0.3rem;
      box-sizing: border-box;
      background-color: #ffffff;
      .cont_li{
        width: 100%;
        height: 1rem;
        overflow: hidden;
        border-bottom: 1px solid #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          float: left;
          width: 1.5rem;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.29rem;
        }
        .text{
          float: left;
          width: calc(100% - 1.5rem);
          margin-top: 0.05rem;
          font-size: 0.29rem;
        }
      }
      .cont_li1{
        width: 100%;
        overflow: hidden;
        span{
          float: left;
          width: 1.5rem;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.29rem;
        }
        .text{
          float: left;
          width: calc(100% - 1.5rem);
          margin-top: 0.05rem;
          font-size: 0.29rem;
        }
      }
    }
    .cont2{
      width: 100%;
      padding: 0 0.3rem;
      box-sizing: border-box;
      overflow: hidden;
      .cont_li{
        width: 100%;
        height: 1rem;
        overflow: hidden;
        border-bottom: 1px solid #F5F5F5;
        .text1{
          float: left;
          width: 1.5rem;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.29rem;
        }
        .text2{
          float: left;
          width: 1.2rem;
          height: 0.5rem;
          display: block;
          line-height: 0.5rem;
          text-align: center;
          border-radius: 0.2rem;
          border: 1px solid #EFEEEE;
          margin-right: 0.1rem;
          margin-top: 0.2rem;
        }
        .text3{
          background-color: #3292FF;
          color: #ffffff;
        }
      }
      .set_default{
        width: 100%;
        height: 2rem;
        overflow: hidden;
        .lf{
          width: 80%;
          float: left;
          margin-top: 0.2rem;
          div{
            width: 100%;
          }
          div:first-child{
            font-size: 0.29rem;
          }
          div:last-child{
            font-size: 0.22rem;
            color: #232323;
          }
        }
        .rg{
          width: 20%;
          float: right;
          margin-top: 0.3rem;
          text-align: right;
        }
      }
      .btn{
        width: 6.78rem;
        height: 0.76rem;
        text-align: center;
        line-height: 0.76rem;
        font-size: 0.3rem;
        color: #ffffff;
        margin: 2rem auto 0;
        border-radius: 0.4rem;
        background: linear-gradient(270deg, #933EDA, #7830F0);
      }
    }
  }
}
</style>
