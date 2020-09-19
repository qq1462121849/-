export const storage = {
  set: function (key, data) {
    try {
      if (window.api) {
        // 有全局api对象时原生也存储一下
        api.setPrefs({key: key, value: JSON.stringify(data)})
      }
      return window.localStorage.setItem(key, window.JSON.stringify(data))
    } catch (err) {
      if (window.api) {
        // 有全局api对象时原生也存储一下
        api.setPrefs({key: key, value: data})
      }
      return window.localStorage.setItem(key, data)
    }
  },
  get: function (key) {
    if (window.api) {
      // 有全局api对象时用原生存储
      try {
        return JSON.parse(api.getPrefs({sync: true, key: key}))
      } catch (err) {
        return api.getPrefs({sync: true, key: key})
      }
    } else {
      // 没有全局api对象时
      try {
        return window.JSON.parse(window.localStorage.getItem(key))
      } catch (err) {
        return window.localStorage.getItem(key)
      }
    }
  },
  remove: function (key) {
    if (window.api) {
      api.removePrefs({key: key})
      window.localStorage.removeItem(key)
    } else {
      return window.localStorage.removeItem(key)
    }
  }
}
export function copyText (text) {
  return new Promise(function (resolve, reject) {
    // 复制链接
    var input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy')
    document.body.removeChild(input)
    resolve()
  })
}
/*
* 使用inShare模块,在targetsdkversion 26版本上运行良好
* @param imgArr: 要分享的图片数组
* @param targetApp: 要分享的目标app
* */
export function useInShare (imgArr, targetApp) {
  return new Promise(function (resolve, reject) {
    var inShare = api.require('inShare')
    inShare.shareImgsTo({
      imgPaths: imgArr.join(','),
      sendPattern: 'ONLY',
      app: targetApp
    })
  })
}

export function accAdd(a1, a2) {
	a1 = a1 || 0; a2 = a2 || 0;
  let r1, r2, m, c;
  try { r1 = a1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
  try { r2 = a2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      a1 = Number(a1.toString().replace(".", ""));
      a2 = Number(a2.toString().replace(".", "")) * cm;
    } else {
      a1 = Number(a1.toString().replace(".", "")) * cm;
      a2 = Number(a2.toString().replace(".", ""));
    }
  } else {
    a1 = Number(a1.toString().replace(".", ""));
    a2 = Number(a2.toString().replace(".", ""));
  }
  return (a1 + a2) / m;
}

export function accMul(arg1, arg2) {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.indexOf('.') > -1 ? s1.split(".")[1].length : 0;
  } catch (e) { throw e; }
  try {
    m += s2.indexOf('.') > -1 ? s2.split(".")[1].length : 0;
  } catch (e) { throw e; }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
export function accSub(a1, a2) {
	a1 = a1 || 0; a2 = a2 || 0;
  let r1, r2, m, n;
  try { r1 = a1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
  try { r2 = a2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((a1 * m - a2 * m) / m).toFixed(n);
}
export function accDiv(arg1, arg2) {
  let t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().indexOf('.') > -1 ? arg1.toString().split(".")[1].length : 0;
  } catch (e) { throw e;}
  try {
    t2 = arg2.toString().indexOf('.') > -1 ? arg2.toString().split(".")[1].length : 0;
  } catch (e) {throw e;}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return accMul((r1 / r2), Math.pow(10, t2 - t1));
}

export function parseTime(time, type) {
  if (!time) { return '' }
  if (arguments.length === 0) { return '' }
  let format, iDate, timer;
  switch (type) {
    case 1: format = '{y}年{m}月{d}日'; break;
    case 2: format = '{y}-{m}-{d} {h}:{i}:{s}'; break;
    case 3: format = '{m}月{d}日'; break;
    case 4: format = '{h}:{i}:{s}'; break;
    case 5: format = '{m}-{d} {h}:{i}:{s}'; break;
    case 6: format = '{y}/{m}/{d}'; break;
    default: format = '{y}-{m}-{d}'; break;
  }
  if (typeof time === 'object') {
    iDate = time;
  } else if (time) {
    timer = time;
    let reg = /^[0-9]+$/, num = reg.test(time);
    if (('' + time).length === 10 && num) { timer = parseInt(time) * 1000 }
    if (('' + time).length === 13 && num) { timer = parseInt(time) }
    if (('' + time).length === 8) { timer = (time.substring(0, 4) + "/" + time.substring(4, 6) + "/" + time.substring(6)); }
    if (('' + time).indexOf('T') != -1) { time = time.replace(/T/, " "); timer = time; }
    if (('' + time).indexOf('-') != -1) { time = time.replace(/-/g, "/"); timer = time; }
    iDate = new Date(timer);
  } else {
    iDate = new Date();
  }
  let formatObj = {
    y: iDate.getFullYear(),
    m: iDate.getMonth() + 1,
    d: iDate.getDate(),
    h: iDate.getHours(),
    i: iDate.getMinutes(),
    s: iDate.getSeconds(),
    a: iDate.getDay()
  }
  let time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
    let value = formatObj[key];
    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  })
  return time_str;
}

export function timeago (time) {
  const SEC_ARRAY = [24, 7, 365 / 7 / 12, 12];
  const ZH_CN = ['小时', '天', '周', '月', '年'];
  if(!time){return ''};
  let diff = (+new Date(new Date().toLocaleDateString()).getTime() + 86400000 - +new Date(time)) / 1000;
  const agoIn = diff < 0 ? 1 : 0;
  diff = Math.abs(diff);
  console.log(time, diff);
  let idx = 0;
  for (; diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length; idx++) {
    diff /= SEC_ARRAY[idx]*60*60;
  }
  
  diff = Math.floor(diff);
  idx *= 2;
  if (diff === 0 && idx === 2) return '今天';
  if (diff > (idx === 0 ? 9 : 1)) idx += 1;
  //if (idx === 0) return ['刚刚', '片刻后'][agoIn].replace('%s', diff.toString());
  const unit = ZH_CN[~~(idx / 2)];
  return [`${diff}${unit}前`, `${diff}${unit}后`][agoIn].replace('%s', diff.toString());
}
