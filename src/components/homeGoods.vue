<template>
  <div class="good_wrap">
    <div class="goods_item" v-for="(v, i) in goods" :key="i">
      <div class="goods" v-for="(item, index) in v" :key="index" @click="jumpTo({path:'goodsDetail',query:{goodsId:item.goodsid}})">
        <img :src="item.image | addUrlHeader" alt="">
        <!-- <div class="text"><span>补水</span><span>保湿</span><span>抗痘</span></div> -->
        <div class="title">{{item.title}}</div>
        <div class="price">
          <span>拼单价</span>
          <span>￥{{item.price}}</span>
        </div>
        <div class="sales">
          <span>{{item.sales}}</span>
          <span></span>
          <!-- <span>94.27%好评</span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['list', 'len'],
    name: "goods-list",
    data () {
      return {
        goods: [[]]
      }
    },
    watch: {
      len(v){
        if(v == 0){
          this.goods = [[]]
        } else {
          let arr = [[], []];
          for(let i=0; i<v; i++){
            i%2 == 0 && arr[0].push(this.list[i]);
            i%2 == 1 && arr[1].push(this.list[i]);
          }
          this.goods = arr;
          console.log(this.goods)
        }
      }
    },
  }
</script>
<style lang="less">
.good_wrap{
  width: 7.1rem;
  padding: 0.3rem 0.2rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .goods_item{
    width: 3.42rem;
  }
  .goods{
    width: 3.42rem;
    border-radius: 0.25rem;
    overflow: hidden;
    background-color: #ffffff;
    margin-bottom: 0.2rem;
    box-shadow: 2px 2px 6px 3px rgba(149, 149, 149, 0.3);
    display: flex;
    flex-direction: column;
    img{
      width: 100%;
      height: 3.42rem;
      display: inline-block;
      vertical-align: top;
    }
    .text{
      width: 3.02rem;
      padding: 0.2rem 0.2rem 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
      span{
        display: inline-block;
        width: 0.66rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.24rem;
        border-radius: 0.15rem;
        background: #FAF9FA;
        color: #6A6A6A;
        flex-shrink: 0;
        text-align: center;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
      }
    }
    .title{
      width: 100%;
      padding: 0.2rem 0.2rem 0;
      box-sizing: border-box;
      font-size: 0.28rem;
      line-height: 0.34rem;
      color: #343434;
      word-break: break-all;
      word-wrap: break-word;
    }
    .price{
      margin-top: 0.2rem;
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      span:first-child{
        font-size: 0.24rem;
        color: #343434;
      }
      span:last-child{
        font-size: 0.36rem;
        font-weight: 800;
        color: #FF3434;
      }
    }
    .sales{
      width: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin: 0.2rem 0;
      overflow: hidden;
      span:first-child{
        font-size: 0.2rem;
        color: #666666;
      }
      span:first-child{
        float: left;
      }
      span:last-child{
        float: right;
      }
    }
  }
}
</style>