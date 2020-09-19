<template>
  <div id="editeBank">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH +0.15+'rem'}">
        取消
      </a>
    </div>
    <div class="page_wrap" :style="{top: 0.88+'rem'}">
      <div class="title">
        <div>修改银行卡信息</div>
        <div>请输入正确的银行卡信息</div>
      </div>
      <van-cell-group>
        <van-field v-model="username" label="持卡人" placeholder="持卡人姓名" />
        <van-field v-model="bankno" type="number" label="卡号" placeholder="持卡人本人银行卡号" />
        <!-- <van-field v-model="bankname" label="所属银行" placeholder="所属银行信息" /> -->
        <van-field label="所属银行">
          <template #input>
            <van-dropdown-menu active-color="#1989fa">
              <van-dropdown-item v-model="bankname" :options="option" title-class="select"/>
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field v-model="bankbranch" label="开户行" placeholder="开户行信息" />
        <van-field v-model="idcard" type="number" label="身份证" placeholder="身份证号码" />
      </van-cell-group>
      <div class="btn" @click="addPayType">下一步</div>
    </div>
  </div>
</template>

<script>
import { XDialog, } from "vux";
export default {
  name: "editeBank",
  components: {
    XDialog,
  },
  data() {
    return {
      statusH:0,
      username:'',
      bankno:'',
      bankname:'中国银行',
      bankbranch:'',
      idcard:'',
      option:null,
      id:''
    };
  },
  methods: {
    addPayType(){
      if (!this.username) {
        this.$vux.toast.text("请输入持卡人姓名");
        return;
      }
      if (!this.bankno) {
        this.$vux.toast.text("请输入银行卡号");
        return;
      }
      if (!this.bankname) {
        this.$vux.toast.text("请输入所属银行信息");
        return;
      }
      if (!this.bankbranch) {
        this.$vux.toast.text("请输入开户行信息");
        return;
      }
      if (!this.idcard) {
        this.$vux.toast.text("请输入身份证号码");
        return;
      }
      let info = {
        id:this.id?this.id:'',
        type:'bank',
        username:this.username,
        bankname:this.bankname,
        bankbranch:this.bankbranch,
        bankno:this.bankno,
        idcard:this.idcard
      }
      this.$http
        .post(
          "/mc/addAccount",
          info,
          true
        )
        .then(res => {
          if(res.code == 1){
            this.$vux.toast.text(res.msg);
            this.$router.push({
              name:'paymentList',
              query:{}
            });
          }else{
            this.$vux.toast.text(res.msg);
          }
        });
    }
  },
  created() {
    this.id = this.$route.query.id?this.$route.query.id:''
    this.username = this.$route.query.username?this.$route.query.username:''
    this.bankname = this.$route.query.bankname?this.$route.query.bankname:'中国银行'
    this.bankbranch = this.$route.query.bankbranch?this.$route.query.bankbranch:''
    this.bankno = this.$route.query.bankno?this.$route.query.bankno:''
    this.idcard = this.$route.query.idcard?this.$route.query.idcard:''
    let selectData = JSON.parse(localStorage.getItem('payData')).bankList
    let selectData1 = []
    selectData.forEach((item,index) => {
      selectData1.push({
        text: item,
        value: item 
      })
    });
    this.option = selectData1
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  }
};
</script>

<style scoped lang='less'>
#editeBank {
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
      font-size: 0.3rem;
    }
  }
  .page_wrap{
    width: 100%;
    height: calc(100% - 0.88rem);
    position: absolute;
    left: 0;
    padding: 0 0.2rem;
    box-sizing: border-box;
    background-color: #ffffff;
    .title{
      width: 100%;
      height: 3rem;
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;
      div:first-child{
        width: 100%;
        text-align: center;
        font-size: 0.44rem;
        font-weight: bold;
        margin-top: 1rem;
      }
      div:last-child{
        width: 100%;
        text-align: center;
        font-size: 0.34rem;
      }
    }
    .btn{
      width: 3.68rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.32rem;
      color: #ffffff;
      background: #AA54D8;
      margin: 2rem auto 0;
      border-radius: 0.2rem;
    }
  }
}
</style>
<style lang="less" >
  #editeBank {
    .van-dropdown-menu{
      .van-dropdown-menu__bar{
        height: 100%;
        box-shadow: none;
      }
      .van-overlay{
        display: none;
      }
      .van-popup--top{
        padding: 0 0.2rem;
        box-sizing: border-box;
      }
    }
  }
</style>
