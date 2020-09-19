<template>
    <div class="guide">
      <swiper height="100%" :show-dots="dots">
        <swiper-item class="swiper-demo-img" v-for="(item, index) of list" :key="index"><img :src="item.image"  @click="change(index)"></swiper-item>
      </swiper>
    </div>
</template>

<script>
import {Swiper, SwiperItem} from 'vux'
import * as utils from '../../utils'
export default {
  name: 'guide',
  components: {
    Swiper, SwiperItem
  },
  data () {
    return {
      dots: false,
      list: utils.storage.get('guideList')
    }
  },
  methods: {
    change (index) {
      if (index + 1 === this.list.length) {
        localStorage.setItem("isGuid",true)
        this.$router.replace('/home')
      }
    }
  }
}
</script>

<style lang="less">
  .guide{
    .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
      width: 100%;
      left: 0;
      right: 0;
      text-align: center;
      a{
        float: none !important;
      }
    }
  }
</style>
<style scoped lang="less">
.guide{
  height: 100%;
  width: 100%;
  .vux-slider{
    height: 100%;
    width: 100%;
    .vux-swiper-item{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
