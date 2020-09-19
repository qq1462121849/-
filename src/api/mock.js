// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const produceNewsData = function () {
  let articles = []
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

// 分类
const getSortLinst = function () {
  let code = []
  let data = []
  let msg = []
  code = 0
  data = {
    'sortLeft': [
      '食品',
      '饰品'
    ],
    'sortRight': [{
      title: '食品',
      list: [{
        url: Random.dataImage('300x250', 'mock的图片'),
        content: '休闲零食'
      }]
    },
      {
        title: '饰品',
        list: [{
          url: Random.dataImage('300x250', 'mock的图片'),
          content: '休闲零食'
        }]
      }]
  }
  msg = '信息返回成功'
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// 收益明细
const getProfitDetail = function () {
  let code = []
  let data = []
  let msg = []
  code = 0
  data = Mock.mock({
    '2019-04|3': [
      {
        'title': '@csentence',
        'created_at': Random.datetime('MM-dd HH:mm'),
        'updated_at': Random.datetime('MM-dd HH:mm'),
        'rebate': '@natural(1, 10)',
        'price': '@natural(10, 20)'
      }
    ]
  })
  msg = '信息返回成功'
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// 新手指南
const getBeginnerGuide = function () {
  let code = []
  let data = []
  let msg = []
  code = 0
  data = Mock.mock({
    'title': '@csentence',
    'content': '<img src="http://app.youquanyun.com/uploads/image/1/0/2019/04/ed0d7ee6a68440d952511e7cd3530ea1.png" alt="" />\n',
    'created_at': Random.datetime('MM-dd HH:mm')
  })
  msg = '信息返回成功'
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// 帮助中心
const getHelpCenter = function () {
  let code = []
  let data = []
  let msg = []
  code = 0
  data = Mock.mock([
    {
      img: '../../assets/img/my/weixin.png',
      title: '新手帮助',
      'info|1-4': [
        {
          title: '@csentence(3, 5)',
          content: '@paragraph'
        }
      ]
    },
    {
      img: '../../assets/img/my/weixin.png',
      title: '新手帮助',
      'info|1-4': [
        {
          title: '@csentence(3, 5)',
          content: '@paragraph'
        }
      ]
    },
    {
      img: '../../assets/img/my/weixin.png',
      title: '新手帮助',
      'info|1-4': [
        {
          title: '@csentence(3, 5)',
          content: '@paragraph'
        }
      ]
    },
    {
      img: '../../assets/img/my/weixin.png',
      title: '新手帮助',
      'info|1-4': [
        {
          title: '@csentence(3, 5)',
          content: '@paragraph'
        }
      ]
    },
    {
      img: '../../assets/img/my/weixin.png',
      title: '新手帮助',
      'info|1-4': [
        {
          title: '@csentence(3, 5)',
          content: '@paragraph'
        }
      ]
    }
  ])
  msg = '信息返回成功'
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// Mock.mock( url, post/get , 返回的数据)
Mock.mock('/api/m1/index', 'post', produceNewsData)
Mock.mock('/api/m1/sortLinst', 'get', getSortLinst)
// Mock.mock('/api/1/amoy/user/income-detail', 'post', getProfitDetail)
// Mock.mock('/api/1/amoy/user/new-article-list', 'get', getBeginnerGuide)
Mock.mock('/api/1/amoy/user/help-center', 'post', getHelpCenter)
