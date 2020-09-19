<template>
  <div id="lock_up">
    <div class="header">
      <div class="search">
        <i class="iconfont1" @click="toSearch"></i>
        <input type="text" v-model="searchText" placeholder="请输入搜索内容"/>
      </div>
    </div>
    <div class="page_wrap">
      <div class="nav">
        <div v-for="(v, i) in navList" :key="i" :class="['nav_li', navStatus == i ? 'navActive' : '']" @click="selectClass(i)">
          <span class="text">{{v.name}}</span>
        </div>
      </div>
      <div class="brand_wrap">
          <div class="banner" @click="jumpTo({path:'search',query:{recommendId:poster.id}})">
            <img :src="poster.image" alt="">
          </div>
          <div class="brand_box" v-if="navList.length && navList[navStatus].childlist && navList[navStatus].childlist.length">
            <div class="brand" v-for="(m, n) in navList[navStatus].childlist" :key="n">
              <div class="title">{{m.name}}</div>
              <div class="brand_ul" v-if="m.childlist && m.childlist.length">
                <div class="brand_li" v-for="(x, y) in m.childlist" :key="y" @click="jumpTo('/search?selfCateId='+x.id)">
                  <img :src="x.image" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="brand_empty" v-else-if="navList.length">暂无二级分类!</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "classification",
  data() {
    return {
      navList: [],
      navStatus: 0,
      poster:'',
      searchText:''
    };
  },
  created() {
    this.navStatus = this.$route.query.i || 0;
    this.getCate()
    this.getCategory()
  },
  methods: {
    //搜索
    toSearch(){
      if(this.searchText){
        this.$router.push({
          name:'search',
          query:{
            keyword:this.searchText
          }
        })
      }else{
        this.$vux.toast.text('请输入搜索内容');
      }
    },
    getCate () {  // 获取分类数据  
      this.$http.get("/goods/getcategory", {}, true).then(res => {
        let arr = res.data || [];
        this.navList = arr;
      }).catch(e => {
        mescroll.endErr();
      });
    },
    selectClass(num){
      if(num == this.navStatus){
        return;
      }
      console.log(num)
      this.navStatus = num
    },
    getCategory(){//获取海报
      this.$http.get("/index/getIndexCategory",{type:''},true).then(res => {
        if (res.code == 1) {
          this.poster = res.data.category[0]
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    },
  }
};
</script>

<style scoped lang='less'>
#lock_up{
  height: 100%;
  .header {
    position: relative;
    overflow: hidden;
    height: 0.88rem;
    background-color: #fff;
    .search {
      width: 6.9rem;
      height: 0.6rem;
      line-height: 0.6rem;
      background: #F5F5F5;
      border-radius: 0.5rem;
      margin: 0 auto;
      margin-top: 0.15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont1 {
        width: 0.3rem;
        height: 0.3rem;
        background: url("../../assets/img/home/search.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
      input {
        width: 5.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        border: none;
        background: #F5F5F5;
      }
    }
  }
  .page_wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .nav{
      width: 1.8rem;
      height: calc(100% - 1rem);
      float: left;
      overflow-y: auto;
      padding-top: 0.1rem;
      box-sizing: border-box;
      .nav_li{
        width: 100%;
        height: 1rem;
        text-align: center;
        font-size: 0.3rem;
        font-weight: 500;
        color: #333333;
        overflow: hidden;
        .text{
          width: 100%;
          height: 0.4rem;
          line-height: 0.4rem;
          display: block;
          margin-top: 0.3rem;
        }
      }
      .navActive{
        background-color: #fff;
        .text{
          border-left: 0.08rem solid #EF250F;
          font-weight: 600;
        }
      }
    }
    .brand_empty{
      width: 100%;
      text-align: center;
      margin-top: 0.5rem;
      color:#999;
    }
    .brand_wrap{
      width: calc(100% - 1.8rem);
      height: calc(100% - 1rem);
      float: left;
      background-color: #fff;
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .banner{
        width: 100%;
        height: 1.8rem;
        border-radius: 0.2rem;
        background-color: #dddddd;
        margin-top: 0.1rem;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .brand{
        width: 100%;
        margin: 0.25rem 0;
        box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        .title{
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.25rem;
          padding-left: 0.1rem;
          color: rgba(51,51,51,1);
        }
        .brand_ul{
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          padding: 0.1rem 0 0.1rem;
          display: flex;
          flex-wrap: wrap;
          .brand_li{
            width: 1.6rem;
            height: 1.2rem;
            border: 1px solid #F5F5F5;
            margin:0 0 0.1rem 0.1rem;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
