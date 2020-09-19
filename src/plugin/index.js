import { formatDate } from './data'
import * as utils from '../utils'
export default {
  install(Vue, options) {
    Vue.prototype.jumpLink = function (link) {
      if (typeof link === 'string') {
        link = JSON.parse(link)
      }
      console.log(link)
      if (link) {
        if (link.type == 0) {
          // type:0 vue内打开指定路由
        }
      }
    }
    Vue.prototype.jumpTo = function (path) {
      options.router.push(path)
      // api.addEventListener({
      //   name: 'jumpTo',
      // },function (ret) {
      //   alert(ret)
      // })
    }
    Vue.prototype.noPastTo = function (path) {
      options.router.replace(path)
    }
    Vue.prototype.goBack = function (path) {
      if (path) {
        options.router.go(path);
      } else{
        window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
      }
      
    }
    Vue.prototype.hide = function () {
      this.$vux.toast.show({ type: 'cancel', text: '功能即将开放，敬请期待' })
    }
    Vue.prototype.formatDate = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
    Vue.prototype.formatDate2 = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'MM-dd hh:mm')
    }
    Vue.prototype.formatDate3 = function (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'MM月dd日')
    }
    Vue.prototype.jumpTos = function (item) {
      switch (item.types) {
        case 'mallHomeDetail':
          if (item.goodsId !== '0' && item.goodsId) {
            options.router.push({ 'name': item.types, 'query': { 'title': item.goodsId } })
          }
          break
        case 'mallSeller':
          if (item.shopsId !== '0' && item.shopsId) {
            options.router.push({ 'name': item.types, 'query': { 'spid': item.shopsId } })
          }
          break
        default:
          options.router.push(item.types)
      }
    }
    Vue.prototype.copyTextShare = function (text) {
      var that = this;
      return new Promise(function (resolve, reject) {
        // 复制链接
        const input = document.createElement("input");
        input.setAttribute("readonly", "readonly");
        input.setAttribute("value", text);
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 9999);
        if (document.execCommand("copy")) {
          document.execCommand("copy");
          that.$vux.toast.text("复制成功！");
        }
        document.body.removeChild(input);
        resolve()

      })
    }
  }
}
