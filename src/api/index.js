import http from './http'
let mall = '/mall'
// let bizId = 1
// let biz = {biz_id: bizId}

//wang
//首页
export const homeinfo = function () {
  return http.post('amoy/index/index')
}
//玫瑰花首页
export const getsafflowerinfo = function () {
  return http.post('amoy/task/index')
}
//玫瑰花签到
export const signin = function () {
  return http.post('amoy/task/sign')
}
//签到礼包
export const giftpackage = function () {
  return http.post('amoy/task/award-gift')
}
//领取任务
export const receivetask = function (type, id) {
  return http.post('amoy/task/sprog', { type, id })
}
//领取任务奖励
export const taskdraw = function (type, id) {
  return http.post('amoy/task/draw', { type, id })
}
//兑换玫瑰花
export const exchangeflower = function (type, num) {
  return http.post('amoy/flower/exchange', { type, num }, true)
}
//任务列表
export const tasklist = function (task_type, task_tag, page) {
  return http.post('amoy/task-hall/get-task-list', { task_type, task_tag, page })
}
//任务详情
export const taskinfo = function (id) {
  return http.post('amoy/task-hall/get-task-info', { id })
}
//插入任务记录
export const inserttaskrecord = function () {
  return http.post('amoy/task-hall/task-record')
}
//任务记录列表
export const taskrecord = function () {
  return http.post('amoy/task-hall/get-task-record-list', true, true)
}
//我的消息
export const mynews = function (page) {
  return http.post('amoy/user/message-list', { page }, true, true)
}
//系统消息
export const systemnews = function (page) {
  return http.post('amoy/user/notice-list', { page }, true, true)
}
//红包设置
export const getredbag = function (type) {
  return http.post('amoy/redbag/get-redbag', { type })
}
//红包领取
export const receiveredbag = function (type) {
  return http.post('amoy/redbag/create-redbag-record', { type })
}
//邀请规则
export const inviterule = function () {
  return http.post('amoy/user/get-invite-rule')
}
//会员协议
export const membertreaty = function () {
  return http.post('amoy/user/get-member-agreement')
}
//问题反馈
export const feedback = function (type, content, contact) {
  return http.post('amoy/user/feedback', { type, content, contact })
}
//文章列表
export const articlelist = function (cid, page) {
  return http.post('amoy/index/article-list', { cid, page })
}
//文章详情
export const articledetail = function (id) {
  return http.post('amoy/index/article-detail', { id })
}

export const login = function () {
  return http.get('/amoy/auth/login')
}
// 微信授权登录
export const postWechatLogin = function (type, token, mobile, inviteCode, password, rePassword) {
  return http.post('/amoy/auth/we-login', { type: type, access_token: token, mobile: mobile, invite_code: inviteCode, password: password, re_password: rePassword }, true)
}
// 获取验证码
export const postSmsCode = function (mobile) {
  return http.post('/amoy/auth/sms-verifycode', { mobile: mobile })
}

export const forget = function () {
  return http.get('/api/mi')
}
//个人信息
export const userInfo = function () {
  return http.post('/amoy/user/user-info', true, true)
}
//修改昵称
export const updateuserInfo1 = function (nickname) {
  return http.post('amoy/user/update-user-info', { nickname })
}
//修改性别
export const updateuserInfo2 = function (gender) {
  return http.post('amoy/user/update-user-info', { gender })
}
//修改极光推送
export const updateuserInfo4 = function (is_jpush) {
  return http.post('amoy/user/update-user-info', { is_jpush })
}
//修改头像
export const updateuserInfo3 = function (avatar) {
  return http.post('amoy/user/update-user-info', { avatar })
}
//修改地址
export const updateuserInfo5 = function (province, city, district) {
  return http.post('amoy/user/update-user-info', { province, city, district })
}
//团队信息
export const teamInfo = function (type, page) {
  return http.post('/amoy/user/team', { type: type, page: page }, true)
}
//团队详情
export const teamDetail = function (uid, page) {
  return http.post('/amoy/user/team-detail', { uid: uid, page: page })
}
//全部任务列表
export const taskList = function (type) {
  return http.post('/amoy/task-hall/get-task-list', { task_type: type }, true, true)
}
//获取任务详情
export const taskDetail = function (id) {
  return http.post('/amoy/task-hall/get-task-info', { id: id }, true, true)
}
//我的钱包
export const myWallet = function () {
  return http.post('/amoy/user/my-wallet')
}
//获取邀请海报
export const invite = function (tpl, invite_code, uid) {
  return http.get('/amoy/user/invite', {
    params: {
      tpl,
      invite_code,
      uid
    }
  })
}
//实名认证
export const auth = function (mobile, real_name, front_card, back_card) {
  return http.post('/amoy/user/apply-real-name', { mobile, real_name, front_card, back_card })
}
//会员升级
export const levelUpgrade = function (pay_type, level_id) {
  return http.post('/amoy/member/create-level-order', { pay_type, level_id }, true, true)
}
//消息状态更新
export const newsNum = function (ids) {
  return http.post('/amoy/user/change-read-status', { ids })
}
//收益中心
export const incomeCenter = function () {
  return http.post('/amoy/user/income-center')
}
//钱包滚动
export const walltRoll = function () {
  return http.post('/amoy/index/wallet-roll')
}
//随机数据
export const incomeB = function () {
  return http.post('/amoy/index/income-barrage')
}