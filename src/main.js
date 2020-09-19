import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'
import http from './api/http'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'
import VueLazyload from 'vue-lazyload'
import { XHeader, ToastPlugin, ConfirmPlugin, LoadingPlugin, DatetimePlugin } from 'vux'
import '../static/libs/iconfont/iconfont.css'
import VueScroller from 'vue-scroller'
import 'swiper/dist/css/swiper.css'
import * as utils from './utils'
import Vant from 'vant';
import 'vant/lib/index.css';
import Video from 'video.js'
import 'video.js/dist/video-js.css'

require('./api/mock.js')
Vue.prototype.$video = Video
Vue.use(Clipboard).use(Vuex).use(ToastPlugin, { position: 'bottom' }).use(ConfirmPlugin).use(DatetimePlugin).use(LoadingPlugin).use(VueScroller).use(Vant)
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$img = utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png')
Vue.use(VueLazyload, {
  loading: utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png'),
  preLoad: 2,
  error: utils.storage.get('errorImg') ? utils.storage.get('errorImg') : require('@/assets/img/error.png'),
  adapter: 1
})
Vue.prototype.$logo = utils.storage.get('appLoginLogo') ? utils.storage.get('appLoginLogo') : ''

utils.storage.set('imgUrl', "http://172.16.1.51:80")

http.post("/auth/init",{},true).then(res => {
  if (res.code == 1) {
    store.commit('setInitData', res.data)
    store.commit('setFirstNav', '/home')
  } else {
    this.$vux.toast.text(res.msg);
  }
});


Vue.component('x-header', XHeader)

Vue.use(plugin, { router: router })
Vue.filter('addUrlHeader', (value) => {
  let regx = /^\/\//.test(value)
  if(regx){
    value = 'http:'+ value
  }
  return value;
})

Vue.config.productionTip = false
Vue.prototype.link = 'http://develop.ymses.com/api/' + config.bizId
Vue.prototype.$color = '#fc3357'
// 控制线下的内容是否开启
Vue.prototype.$isMallUnderShop = config.isMallUnderShop
// 支付宝支付模块
Vue.prototype.$aliPay = config.aliPay
Vue.prototype.$bizId = config.bizId
// 控制线上的内容是否开启
Vue.prototype.$isMallShop = config.isMallShop

if (config.pcWebDebug) {
  Vue.prototype.$type = 1;
  // Vue.prototype.$type = null;
  // 开启了pc端浏览器开发调试模式时
    // vueObj 为了方便别的webview调用此vue对象
    window.vueObj = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
    getGuideMap()
    function getGuideMap(){
      http.post("/index/getStartImg",{},true).then(res => {
        if (res.code == 1) {
          utils.storage.set('guideList', res.data)
        } else {
          this.$vux.toast.text(res.msg);
        }
      });
    }
} else {
  // 没有开启PC浏览器端调试模式时
  window.apiready = function () {
    var systemType = api.systemType;
    api.addEventListener({ name:'appintent' },function(ret,err){
      if(err){return ;}
      if(ret.appParam.url){
        router.push(ret.appParam.url)
      }
      if(ret.appParam.ptid){
        localStorage.setItem('ptid',ret.appParam.ptid)
        if(ret.appParam.inviteCode){
          localStorage.setItem('inviteCode',ret.appParam.inviteCode)
          if(utils.storage.get('token')){
            http.post("/task/userSpell",{
              inviteCode:ret.appParam.inviteCode,
              ptid:ret.appParam.ptid,
              type:1
            },true).then(res => {
              if (res.code == 1) {
                localStorage.removeItem("inviteCode");
                localStorage.removeItem("ptid");
              } else {
                this.$vux.toast.text(res.msg);
              }
            });
          }
        }
      }
      if(ret.appParam.goodsId){
        router.push({
          name:'goodsDetail',
          query:{
            goodsId:ret.appParam.goodsId,
          }
        })
      }
    });
    getGuideMap()
    function getGuideMap(){
      http.post("/index/getStartImg",{},true).then(res => {
        if (res.code == 1) {
          utils.storage.set('guideList', res.data)
        } else {
          // this.$vux.toast.text(res.msg);
        }
      });
    }
    if (systemType == 'android') {
      Vue.prototype.$type = 1;
      var app
      app = new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
      })
      // vueObj 为了方便别的webview调用此vue对象
      window.vueObj = app
    } else if (systemType == 'ios') {
      Vue.prototype.$type = 1;
      var app
      app = new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
      })
      // vueObj 为了方便别的webview调用此vue对象
      window.vueObj = app
    }
    //返回的逻辑
    let gnow = false
    let gtime = null
    api.addEventListener({
      name: 'keyback'
    }, function (ret, err) {
      if (window.api && api.pageParam.backToWin) {
        api.closeWin()
        api.closeFrame()
        return
      }
      if (ret) {
        if(gApp.$route.path === '/classification' || gApp.$route.path === '/joinGroup' || gApp.$route.path === '/taskEarnings' || gApp.$route.path === '/my'){
          router.replace('/home');
        }else if (gApp.$route.path === '/home' || gApp.$route.path === '/login') {
          clearTimeout(gtime);
          if (gnow) {
            gnow = false
            api.closeWidget({ silent: true })
          } else {
            gnow = true
            mui.toast('再按一次返回键退出');
            gtime = setTimeout(() => {
              gnow = false
            }, 1000)
          }
        } else {
          router.go(-1)
        }
      }
    })
  }
}