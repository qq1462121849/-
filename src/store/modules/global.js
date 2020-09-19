import * as utils from '../../utils'

const state = {
  footer: utils.storage.get('footer')||"",
  content: utils.storage.get('content'),
  appLoginLogo: utils.storage.get('appLoginLogo'),
  floating: null,
  myContent: null,
  search: { bgDeg: '90', bgColor: '#fc3357', bgSecondColor: '#fc3357', color: '#fff', searchPlaceholder: '请输入关键字' },
  theme: { deg: '90', mainColor: '#FF5847', secondColor: '#fe6868', thirdColor: '#ffe7e9' },
  mallFooter: utils.storage.get('mallFooter'),
  mallContent: utils.storage.get('mallContent'),
  mallSearch: utils.storage.get('mallSearch'),
  mallSwiper: utils.storage.get('mallSwiper'),
  mallNavslide: utils.storage.get('mallNavslide'),
  mallBobao: utils.storage.get('mallBobao'),
  mallHot: null,
  activity: null,
  mallMy: utils.storage.get('mallMy'),
  firstNav: '/home',
  block: null,
  registrationId: null,
  swiperProgress: null,
  goodsList: null,
  site: '',
  showshare: utils.storage.get('showshare'),
  statusH: 0,
  swiperData: [],
  initData:null
}

const getters = {}

const actions = {}

const mutations = {
  setFooter(state, data) {
    utils.storage.set('footer', data)
    state.footer = data
  },
  setContent(state, data) {
    utils.storage.set('content', data)
    state.content = data
  },
  setFloating(state, data) {
    utils.storage.set('floating', data)
    state.floating = data
  },
  setActivity(state, data) {
    state.activity = data
  },
  setTheme(state, data) {
    state.theme = data
  },
  setSearch(state, data) {
    state.search = data
  },
  setGoodsList(state, data) {
    utils.storage.set('goodsList', data)
    state.goodsList = data
  },
  setMallFooter(state, data) {
    utils.storage.set('mallFooter', data)
    state.mallFooter = data
  },
  setMallContent(state, data) {
    utils.storage.set('mallContent', data)
    state.mallContent = data
  },
  setMallSearch(state, data) {
    utils.storage.set('mallSearch', data)
    state.mallSearch = data
  },
  setMallHot(state, data) {
    utils.storage.set('mallHot', data)
    state.mallHot = data
  },
  setMallMy(state, data) {
    utils.storage.set('mallMy', data)
    state.mallMy = data
  },
  setSwiper(state, data) {
    utils.storage.set('mallSwiper', data)
    state.mallSwiper = data
  },
  setNavslide(state, data) {
    utils.storage.set('mallNavslide', data)
    state.mallNavslide = data
  },
  setBobao(state, data) {
    utils.storage.set('mallBobao', data)
    state.mallBobao = data
  },
  setBlock(state, data) {
    state.block = data
  },
  setFirstNav(state, data) {
    state.firstNav = data
  },
  setMyContent(state, data) {
    state.myContent = data
  },
  setRegistrationId(state, data) {
    state.registrationId = data
  },
  setSwiperProgress(state, data) {
    console.log(data)
    state.swiperProgress = data
  },
  setSite(state, data) {
    utils.storage.set('site', data)
    state.site = data
  },
  setInvitedImg(state, data) {
    state.invitedImg = data
  },
  setShowShare(state, data) {
    utils.storage.set('showshare', data)
    state.showshare = data
  },
  setStatusH(state, data) {
    state.statusH = data
  },
  setSwiperData(state, data) {
    state.swiperData = data
  },
  setInitData(state,data){
    state.initData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
