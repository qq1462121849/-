<template>
  <div id="browseLog">
    <div class="header" :style="{paddingTop: statusH +'rem'}">
      <a slot="left" class="backBox" @click="goBack()" :style="{top: statusH+0.24+'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="title">浏览记录</div>
      <div class="delAll" @click="isdelAll" :style="{top: statusH+0.24+'rem'}">清空</div>
      <div class="edite" :style="{top: statusH+0.24+'rem'}" v-if="list&&list.length">
        <span @click="editeList">{{isEdite ? '完成' : '编辑'}}</span>
      </div>
    </div>
    <div class="page_wrap" :style="{paddingTop: statusH+0.88+'rem'}">
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="collect_wrap">
            <div class="collect_li" v-for="(item, index) in list" :key="index">
              <div class="title">{{item.title}}</div>
              <div class="cont_wrap" v-if="!isEdite">
                <div class="cont_li" v-for="(itm, idex) in item.mock" :key="idex">
                  <img :src="itm.image | addUrlHeader" alt="">
                  <div class="cont_rg">
                    <div class="title1">{{itm.title}}</div>
                    <div class="text">¥{{itm.price}}</div>
                  </div>
                </div>
              </div>
              <div class="cont_wrap1" v-if="isEdite">
                <div class="cont_li" v-for="(itm,idex) in item.mock" :key="idex">
                  <div class="edite_wrap">
                    <van-checkbox v-model="check[itm.index]" @change="handCheck" checked-color="#D272E3" icon-size="0.3rem"></van-checkbox>
                  </div>
                  <img :src="itm.image" alt="">
                  <div class="cont_rg">
                    <div class="title1">{{itm.title}} 手工创意茶盘托盘茶道功夫盘子</div>
                    <div class="text">¥{{itm.price}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="empty_collect"></div>
        </mescroll-vue>
      </div>
    </div>
    <!--选择规格-->
    <van-popup position="bottom" v-model="isShowNum" :overlay="false">
      <div class="browseLog_model">
        <div class="btn" @click="handDel">删除</div>
        <div class="text">
          <van-checkbox v-model="allCheck" @click="handAllCheck" checked-color="#D272E3" icon-size="0.3rem">全选</van-checkbox>
        </div>
      </div>
    </van-popup>
    <!-- 清空 -->
    <van-popup position="center" v-model="showDelList">
      <div class="isdel_all">
        <div class="text1">确定清空浏览记录?</div>
        <div class="cont">
          <div @click="cancelDel">取消</div>
          <div @click="clearLikes">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from "../../utils";
export default {
  name: "browseLog",
  components:{
    MescrollVue
  },
  data() {
    return {
      statusH:0,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: "empty_order",
          icon: require("../../assets/img/coupon/empty.png"),
          tip: "<div>暂无相关数据~</div><div>没找到订单？试试查看全部或更换登录方式</div>"
        },
      },
      isEdite:false,
      list:[],
      allCheck: false,
      isShowNum: false,
      showDelList: false,
      check:[]
    };
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function() {
      this.mescrollUp.page.num = 1;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    upCallback (page, mescroll) {
      let ids = utils.storage.get('goodsLike') || [], size = 10;
      if(ids.length){
        const pluck = (arr, str) => { return arr.map(x => { return x[str]; })};
        let req = ids.slice((page.num-1)*size, page.num*size);
        if(req.length){
          let req1 = pluck(req, 'id');
          this.$http.post("/goods/getInfo", { goodsId: req1.join(',')}).then(response => {
            if (page.num === 1) this.list = [];
            let arr = response.data || [];
            setTimeout(() => { mescroll.endSuccess(arr.length);}, 600);
            this.checkArr(arr, req)
          }).catch(e => { mescroll.endErr();});
        } else{
          setTimeout(() => {mescroll.endSuccess(0);}, 500)
        }
      } else {
        this.list = [];
        setTimeout(() => {mescroll.endSuccess(0);}, 500)
      }
    },
    checkArr (arr, ids) {
      let res = [], check = JSON.parse(JSON.stringify(this.check)), list = JSON.parse(JSON.stringify(this.list)), len = check.length;
      for(let i=0; i<arr.length; i++) {
        if(list.length){
          let btn = true;
          for(let j=0; j<list.length; j++) {
            if(utils.parseTime(list[j].times) == utils.parseTime(ids[i].times)){
              btn = false;
            }
          }
          btn && list.push({times: ids[i].times, title: utils.timeago(ids[i].times), id: ids[i].id, mock: []});
        } else{
          list.push({times: ids[i].times, title: utils.timeago(ids[i].times), id: ids[i].id, mock: []});
        }
      }
      for(let i=0; i<arr.length; i++) {
        for(let j=0; j<list.length; j++) {
          if(utils.parseTime(list[j].times) == utils.parseTime(ids[i].times)){
            list[j].mock.push(Object.assign(arr[i], {index: len+i}));
            check.push(false);
          }
        }
      }
      this.list = list;
      this.check = check;
      console.log(this.list);
      console.log(ids);
    },
    clearLikes () {
      utils.storage.remove('goodsLike');
      this.$router.go(0);
    },
    handCheck(){
      let count=0;
      for(let i=0; i<this.check.length; i++){
        if(!this.check[i]){
          this.allCheck = false;
        }
        if(this.check[i]){
          count++
        }
      }
      if(count == this.check.length){this.allCheck = true}
    },
    handAllCheck () {
      if(this.allCheck){
        for(let i=0; i<this.check.length; i++){
          this.check.splice(i, 1, true);
        }
      } else{
        for(let i=0; i<this.check.length; i++){
          this.check.splice(i, 1, false);
        }
      }
    },
    handDel () {
      let dels = [];
      for(let i=0; i< this.check.length; i++){
        if(this.check[i]){
          dels.push(i);
        }
      }
      if(dels.length){
        let ids = utils.storage.get('goodsLike') || []
        for(let i=0; i<dels.length; i++){
          ids.splice(dels[i], 1);
        }
        utils.storage.set('goodsLike', ids);
        this.editeList();
        this.mescrollUp.page.num = 1;
        this.mescroll.scrollTo(0, 0);
        this.$nextTick(() => {
          this.upCallback(this.mescrollUp.page, this.mescroll);
        })
      } else{
        this.$vux.toast.text('请选择商品');
      }
    },
    editeList(){
      this.isEdite = !this.isEdite
      this.isShowNum = !this.isShowNum
      this.deleteArry = []
    },
    isdelAll(){
      this.showDelList = true
    },
    cancelDel(){
      this.showDelList = false
    },
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = window.api ? api.safeArea.top / size : 0;
  }
};
</script>

<style scoped lang='less'>
#browseLog {
  position: relative;
  height: 100%;
  background: #fff;
  .van-popup--center{
    border-radius: 0.14rem;
  }
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 0.88rem;
    background: linear-gradient(267deg, #CA40CC, #7830F0);
    background-size: 100% 100%;
    border-bottom: 1px solid #EEEEEE;
    color: #ffffff;
    .backBox {
      position: absolute;
      color: #ffffff;
      left: 0.3rem;
      .iconfont {
        color: #ffffff;
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
    .news{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 0.25rem;
      right: 0.2rem;
    }
    .edite{
      position: absolute;
      top: 0.25rem;
      right: 0.4rem;
      font-size: 0.26rem;
    }
    .delAll{
      position: absolute;
      top: 0.25rem;
      right: 1.2rem;
      font-size: 0.26rem;
    }
  }
  .page_wrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .mescrollBox{
      height: 100%;
    }
    .collect_wrap{
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .collect_li{
        width: 100%;
        .title{
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.28rem;
          color: #545454;
          font-weight: 600;
        }
        .cont_wrap{
          width: 100%;
          .cont_li{
            width: 100%;
            height: 2.3rem;
            overflow: hidden;
            margin-bottom: 0.2rem;
            background-color: #ffffff;
            .van-swipe-cell__wrapper{
              overflow: hidden;
            }
            img{
              width: 2.3rem;
              height: 2.3rem;
              display: block;
              float: left;
            }
            .cont_rg{
              width: calc(100% - 2.5rem);
              float: left;
              margin-top: 0.2rem;
              padding-left: 0.2rem;
              box-sizing: border-box;
              .title1{
                font-size: 0.26rem;
                color: #545454;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient:vertical;
                flex-direction: column;
              }
              .text{
                font-size: 0.36rem;
                color: #FF0034;
                margin-top: 0.5rem;
              }
            }
            .cont_rg1{
              width: 2.3rem;
              height: 2.3rem;
              overflow: hidden;
              div{
                width: 50%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 2.3rem;
              }
              div:first-child{
                background: linear-gradient(0deg, #BF39D2, #E851BC);
              }
              div:last-child{
                background: linear-gradient(0deg, #7E38D2, #AE51E8);
              }
            }
          }
        }
        .cont_wrap1{
          width: 100%;
          .cont_li{
            width: 100%;
            height: 2.3rem;
            overflow: hidden;
            margin-bottom: 0.2rem;
            .edite_wrap{
              width: 0.6rem;
              float: left;
              overflow: hidden;
              height: 2.3rem;
              display: flex;
              align-items: center;
            }
            img{
              width: 2.3rem;
              height: 100%;
              display: block;
              float: left;
              background-color: #ffffff;
            }
            .cont_rg{
              width: calc(100% - 3.3rem);
              height: 100%;
              float: left;
              padding-top: 0.2rem;
              box-sizing: border-box;
              background-color: #ffffff;
              border-radius: 0 0.2rem 0.2rem 0;
              margin-left: 0.2rem;
              .title1{
                font-size: 0.26rem;
                color: #545454;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient:vertical;
                flex-direction: column;
              }
              .text{
                font-size: 0.36rem;
                color: #FF0034;
                margin-top: 0.5rem;
              }
            }
          }
        }
      }
    }
  }
  .isdel_all{
    width: 5.8rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
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
      margin-top: 0.2rem;
      display: flex;
      justify-content: center;
      div{
        width: 1.91rem;
        height: 0.68rem;
        line-height: 0.68rem;
        text-align: center;
        font-size: 0.26rem;
        border-radius: 0.34rem;
      }
      div:first-child{
        border: 1px solid #7E38D2;
        color: #7E38D2;
        box-sizing: border-box;
      }
      div:last-child{
        background: #7E38D2;
        color: #ffffff;
        margin-left: 0.2rem;
      }
    }
  }
}
.browseLog_model{
  height: 1rem;
  background:#fff;
  overflow: hidden;
  border-top: 1px solid #f1f1f1;
  .btn{
    width: 3.26rem;
    height: 100%;
    float: right;
    font-size: 0.29rem;
    color: #ffffff;
    text-align: center;
    line-height: 1rem;
    background-color: #7D38D2;
  }
  .text{
    float: left;
    font-size: 0.3rem;
    color: #7E38D2;
    margin-top: 0.3rem;
    margin-left: 0.2rem;
  }
}
</style>
