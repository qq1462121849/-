<template>
  <view-box
    ref="viewBox"
    id="layout"
    :body-padding-top="$route.meta.isShowHead || $route.meta.isShowSearch ? '.88rem' : '0'"
    :body-padding-bottom="$route.meta.isShowTab ? h : '0'"
  >
    <x-header
      v-show="$route.meta.isShowHead"
      slot="header"
      :left-options="{showBack: false}"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      <a
        v-show="!$route.meta.goBack"
        slot="left"
        @click="$route.meta.address ? jumpTo($route.meta.address) : goBack()"
        class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      {{$route.query.title ? $route.query.title : $route.meta.title}}
    </x-header>
    <transition :name="transitionName">
      <keep-alive include="home">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div
      class="tabbarBox"
      id="tabbarBox"
      v-show="$route.meta.isShowTab"
      :style="{paddingBottom: bot + 'px',background:$store.state.global.footer.bgColor}">
      <template>
        <div class="tabbar" @click="jumpTo('/home')">
          <div class="tabbarIcon" v-if="$route.path == '/home'">
            <img src="@/assets/img/tabbar/bt_nav1_tab2.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="@/assets/img/tabbar/bt_nav1_tab1.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/home'?'color:#FC0706':''">首页</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/classification')">
          <div class="tabbarIcon" v-if="$route.path == '/classification'">
            <img src="@/assets/img/tabbar/bt_nav2_tab2.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="@/assets/img/tabbar/bt_nav2_tab1.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/classification'?'color:#FC0706':''">分类</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/joinGroup')">
          <div class="tabbarIcon tabbernext" v-if="$route.path == '/joinGroup'">
            <img src="@/assets/img/tabbar/bt_nav3_tab2.png" alt />
          </div>
          <div class="tabbarIcon tabbernext" v-else>
            <img src="@/assets/img/tabbar/bt_nav3_tab1.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/joinGroup'?'color:#FC0706':''">我的拼单</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/taskEarnings')">
          <div class="tabbarIcon" v-if="$route.path == '/taskEarnings'">
            <img src="@/assets/img/tabbar/bt_nav4_tab2.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="@/assets/img/tabbar/bt_nav4_tab1.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/taskEarnings'?'color:#FC0706':''">任务赚</p>
        </div>
      </template>
      <template>
        <div class="tabbar" @click="jumpTo('/my')">
          <div class="tabbarIcon" v-if="$route.path == '/my'">
            <img src="@/assets/img/tabbar/bt_nav5_tab2.png" alt />
          </div>
          <div class="tabbarIcon" v-else>
            <img src="@/assets/img/tabbar/bt_nav5_tab1.png" alt />
          </div>
          <p class="tabbarName" :style="$route.path == '/my'?'color:#FC0706':''">我的</p>
        </div>
      </template>
    </div>
  </view-box>
</template>

<script>
import "../../assets/js/api";
import { ViewBox, Tabbar, TabbarItem, XHeader } from "vux";
export default {
  name: "index",
  data() {
    return {
      h: 49 + Number((window.api && api.safeArea.bottom) || 0) + "px",
      transitionName: "",
      pageName: ["home", "my"],
      bot: (window.api && api.safeArea.bottom) || 0
    };
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    XHeader
  },
  mounted() {
    if (window.api) {
      document.getElementById("tabbarBox") &&
        (document.getElementById("tabbarBox").style.paddingBottom =
          api.safeArea.bottom + "px");
      document.getElementById("tabbar1") &&
        (document.getElementById("tabbar1").style.paddingBottom =
          api.safeArea.bottom + "px");
    }
  },
  // 此段添加内容
  watch: {
    $route(to, from) {
      if (from.meta.routerZindex > to.meta.routerZindex) {
        this.transitionName = "slide-right";
      } else if (from.meta.routerZindex < to.meta.routerZindex) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-none";
      }
    }
  },
  methods: {
    rout(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="less">
#tabbar {
  height: 49px;
}
#tabbar1 {
  height: 49px;
}
.router-fade-enter-active,
.router-fade-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
.weui-tabbar {
  background: #fff;
}
.weui-tabbar:before {
  border-top: 1px solid #e0dee6;
}
</style>
<style lang="less">
#layout {
  .tabbar{
    position: relative;
    .tabbernext{
        width: 99px;
        height: 99px;
        background: #FFFFFF;
        box-shadow: 0px 0px 35px 0px rgba(0, 0, 0, 0.17);
        border-radius: 50%;

    }
  }
  .weui-tabbar__item {
    padding-top: 7px;
  }
  .vux-header {
    .vux-header-left {
      left: 0;
      top: 0;
      .backBox {
        display: block;
        height: 0.88rem;
        line-height: 0.88rem;
        padding: 0 0.3rem;
      }
    }
  }
  .tabbarBox {
    z-index: 2000;
    // box-shadow: 0 4px 8px #525252;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 49px;
    padding-top: 5px;
    box-sizing: content-box;
    width: 100%;
    display: flex;
    background: #fff;
    border-top: 1px solid #efefef;
    .tabbar {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tabbarIcon {
        width: 23px;
        height: 23px;
        display: inline-block;
        margin-bottom: 1px;
        img {
          width: 23px;
          height: 23px;
          display: inline-block;
        }
      }
      .tabbarName {
        font-size: 12px;
        color: #999;
        line-height: 1.8;
        text-align: center;
      }
    }
    .upTab {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .tabbarIcon {
        background: #fff;
        margin-top: -0.5rem;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }
  }
}
</style>
<style lang="less">
// #layout  #tabbarBox{
//   .tabbar{
//     position: relative;
//     .tabbernext{
//        position: absolute;
//         width: 99px;
//         height: 99px;
//         background: #FFFFFF;
//         box-shadow: 0px 0px 35px 0px rgba(0, 0, 0, 0.17);
//         border-radius: 50%;

//     }
//   }
// }
</style>
