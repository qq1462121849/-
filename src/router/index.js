import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: resolve => require(['@/pages/layout/'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/login',
          name: 'login',
          component: resolve => require(['@/pages/auth/login'], resolve),
          meta: { title: '登录' }
        },
        {
          path: '/register',
          name: 'register',
          component: resolve => require(['@/pages/auth/register'], resolve),
          meta: { title: '注册' }
        },
        {
          path: '/register1',
          name: 'register1',
          component: resolve => require(['@/pages/auth/register1'], resolve),
          meta: { title: '注册' }
        },
        {
          path: '/setPw',
          name: 'setPw',
          component: resolve => require(['@/pages/auth/setPw'], resolve),
          meta: { title: '修改密码' }
        },
        {
          path: '/guide',
          name: 'guide',
          component: resolve => require(['@/pages/layout/guide'], resolve)
        },
        {
          path: '/protocolTxt',
          name: 'protocolTxt',
          component: resolve => require(['@/pages/auth/protocolTxt'], resolve),
          meta: { title: '用户协议', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 5 }
        },
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/pages/home/'], resolve),
          meta: { title: '首页', keepAlive: false, isShowHead: false, isShowTab: true, routerZindex: 2 }
        },
        {
          path: '/shopingCart',
          name: 'shopingCart',
          component: resolve => require(['@/pages/home/shopingCart'], resolve),
          meta: { title: '购物车', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/classification',
          name: 'classification',
          component: resolve => require(['@/pages/home/classification'], resolve),
          meta: { title: '分类', keepAlive: false, isShowHead: false, isShowTab: true, routerZindex: 2 }
        },
        {
          path: '/joinGroup',
          name: 'joinGroup',
          component: resolve => require(['@/pages/group/'], resolve),
          meta: { title: '我的拼', keepAlive: false, isShowHead: false, isShowTab: true, routerZindex: 2 }
        },
        {
          path: '/taskEarnings',
          name: 'taskEarnings',
          component: resolve => require(['@/pages/task/'], resolve),
          meta: { title: '任务赚', keepAlive: false, isShowHead: false, isShowTab: true, routerZindex: 2 }
        },
        {
          path: '/my',
          name: 'my',
          component: resolve => require(['@/pages/my/index4'], resolve),
          meta: { title: '我的', keepAlive: false, isShowHead: false, isShowTab: true, routerZindex: 2 }
        },
        {
          path: '/acountBalance',
          name: 'acountBalance',
          component: resolve => require(['@/pages/my/acountBalance'], resolve),
          meta: { title: '账户余额', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['@/pages/my/order'], resolve),
          meta: { title: '我的订单', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/grandTotalOrder',
          name: 'grandTotalOrder',
          component: resolve => require(['@/pages/my/grandTotalOrder'], resolve),
          meta: { title: '累计成交订单', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/seeLogistics',
          name: 'seeLogistics',
          component: resolve => require(['@/pages/my/seeLogistics'], resolve),
          meta: { title: '查看物流', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/upgradeAgent',
          name: 'upgradeAgent',
          component: resolve => require(['@/pages/my/upgradeAgent'], resolve),
          meta: { title: '升级代理', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/appraisalList',
          name: 'appraisalList',
          component: resolve => require(['@/pages/home/appraisalList'], resolve),
          meta: { title: '评价', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/appraisal',
          name: 'appraisal',
          component: resolve => require(['@/pages/my/appraisal'], resolve),
          meta: { title: '评价', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/goodsDetail',
          name: 'goodsDetail',
          component: resolve => require(['@/pages/home/goodsDetail'], resolve),
          meta: { title: '商品详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/verify_order',
          name: 'verify_order',
          component: resolve => require(['@/pages/home/verify_order'], resolve),
          meta: { title: '支付', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/verify_order1',
          name: 'verify_order1',
          component: resolve => require(['@/pages/home/verify_order1'], resolve),
          meta: { title: '支付', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/search',
          name: 'search',
          component: resolve => require(['@/pages/home/search'], resolve),
          meta: { title: '搜索', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/refund',
          name: 'refund',
          component: resolve => require(['@/pages/my/refund'], resolve),
          meta: { title: '申请退款', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/refund1',
          name: 'refund1',
          component: resolve => require(['@/pages/my/refund1'], resolve),
          meta: { title: '旧申请退款', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/refundDetail',
          name: 'refundDetail',
          component: resolve => require(['@/pages/my/refundDetail'], resolve),
          meta: { title: '退款详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/refundWaybill',
          name: 'refundWaybill',
          component: resolve => require(['@/pages/my/refundWaybill'], resolve),
          meta: { title: '退款填写运单', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/collect',
          name: 'collect',
          component: resolve => require(['@/pages/my/collect'], resolve),
          meta: { title: '收藏', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/collectSearch',
          name: 'collectSearch',
          component: resolve => require(['@/pages/my/collectSearch'], resolve),
          meta: { title: '收藏搜索', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 3 }
        },
        {
          path: '/browseLog',
          name: 'browseLog',
          component: resolve => require(['@/pages/my/browseLog'], resolve),
          meta: { title: '浏览历史', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/addAddress',
          name: 'addAddress',
          component: resolve => require(['@/pages/my/addAddress'], resolve),
          meta: { title: '地址管理', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/editeAddress',
          name: 'editeAddress',
          component: resolve => require(['@/pages/my/editeAddress'], resolve),
          meta: { title: '编辑收货人', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/setting',
          name: 'setting',
          component: resolve => require(['@/pages/my/setting'], resolve),
          meta: { title: '设置', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/setMobile',
          name: 'setMobile',
          component: resolve => require(['@/pages/my/setMobile'], resolve),
          meta: { title: '设置手机号', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: resolve => require(['@/pages/my/feedback'], resolve),
          meta: { title: '问题反馈', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/aboutUs',
          name: 'aboutUs',
          component: resolve => require(['@/pages/my/aboutUs'], resolve),
          meta: { title: '关于我们', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/bindSuperior',
          name: 'bindSuperior',
          component: resolve => require(['@/pages/my/bindSuperior'], resolve),
          meta: { title: '绑定上级', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/realName',
          name: 'realName',
          component: resolve => require(['@/pages/my/realName'], resolve),
          meta: { title: '实名认证', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/realNameInfo',
          name: 'realNameInfo',
          component: resolve => require(['@/pages/my/realNameInfo'], resolve),
          meta: { title: '实名认证详情', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/realNamelist',
          name: 'realNamelist',
          component: resolve => require(['@/pages/my/realNamelist'], resolve),
          meta: { title: '实名认证信息', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/withdraw',
          name: 'withdraw',
          component: resolve => require(['@/pages/my/withdraw'], resolve),
          meta: { title: '提现', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/wdRule',
          name: 'wdRule',
          component: resolve => require(['@/pages/my/withdrawRule'], resolve),
          meta: { title: '提现规则', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/paymentList',
          name: 'paymentList',
          component: resolve => require(['@/pages/my/paymentList'], resolve),
          meta: { title: '收款列表', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/addPayment',
          name: 'addPayment',
          component: resolve => require(['@/pages/my/addPayment'], resolve),
          meta: { title: '收款方式', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/editeBank',
          name: 'editeBank',
          component: resolve => require(['@/pages/my/editeBank'], resolve),
          meta: { title: '修改银行账户', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/editeZfb',
          name: 'editeZfb',
          component: resolve => require(['@/pages/my/editeZfb'], resolve),
          meta: { title: '修改支付宝账户', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/myTeam',
          name: 'myTeam',
          component: resolve => require(['@/pages/task/myTeam'], resolve),
          meta: { title: '我的团队', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/contactUs',
          name: 'contactUs',
          component: resolve => require(['@/pages/my/contactUs'], resolve),
          meta: { title: '联系我们', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/leaderboard',
          name: 'leaderboard',
          component: resolve => require(['@/pages/task/leaderboard'], resolve),
          meta: { title: '排行榜', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/refundList',
          name: 'refundList',
          component: resolve => require(['@/pages/my/refundList'], resolve),
          meta: { title: '排行榜', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/invite1',
          name: 'invite1',
          component: resolve => require(['@/pages/my/inviteFriends'], resolve),
          meta: { title: '邀请好友', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/invite2',
          name: 'invite2',
          component: resolve => require(['@/pages/my/invite'], resolve),
          meta: { title: '邀请好友', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
        {
          path: '/share',
          name: 'share',
          component: resolve => require(['@/pages/my/share'], resolve),
          meta: { title: '画报分享', keepAlive: false, isShowHead: false, isShowTab: false, routerZindex: 2 }
        },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})



router.beforeEach(function (to, from, next) {
  if (Vue.prototype.$type == 1) {
    var whiteList = ['login','register','register1','guide','protocolTxt','home', 'classification', 'goodsDetail', ]
  } else {
    var whiteList = ['login','register','register1','guide','protocolTxt','home', 'classification', 'goodsDetail', ]
  }

  var firstPage = ['/home']
  var currentRoute = to.path
  if (firstPage.indexOf(currentRoute) > -1) {
    window.canRightSlipBack = false
  } else {
    window.canRightSlipBack = true
  }
  // 登录拦截
  store.commit('hide')
  /*   if (!config.isMallShop && currentRoute.indexOf('/mall/home') != -1) {
      // 当前往线上商城首页并无权进入时
      alert('此安装包暂无权限进入商城')
      return
    }
    if (!config.isMallUnderShop && currentRoute.indexOf('/mall/underShop') != -1) {
      // 当前往线下商城首页并无权进入时
      alert('此安装包暂无权限进入线下商城')
      return
    } */
  if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
