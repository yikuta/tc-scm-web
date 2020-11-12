
/**
 * @Description: 获取数据类型
 * @param data
 * @returns String
 */
export function dataType(data) {
  return Object.prototype.toString.call(data).replace(/^\[object\s([a-zA-Z]+)\]$/g, '$1')
}

/**
 * @Description: 字符串是否为空
 * @param {String} str
 * @returns {Boolean}
 */
export function notEmptyStr(str) {
  return str !== '' && str !== null && str !== undefined
}

/**
 * @Description: 判断空对象
 * @param { Object } obj
 * @returns Boolean
 */
export function isEmptyObject(obj = {}) {
  return !Object.keys(obj).length
}

/**
 * @Description: 深拷贝数据
 * @param data
 */
export function deepClone(data) {
  const type = Object.prototype.toString.call(data)
  if (type === '[object Object]' || type === '[object Array]') {
    return JSON.parse(JSON.stringify(data))
  }
  return data
}

/**
 * @Description: 对象合并
 * @param { Object, Object... } target obj1...
 */
export function mergeObject(target, ...objects) {
  objects.forEach(obj => {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          target[key] = deepClone(obj[key])
        }
      }
    }
  })
}

/**
 * @Description: 简单数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @Description: 过滤空数据
 * @param { Object } data
 * @returns Object
 */
export function filterEmptyParams(data) {
  if (dataType(data) === 'Object') {
    const results = {}
    Object.keys(data).forEach(key => {
      if (data.hasOwnProperty(key)) {
        if (notEmptyStr(data[key])) {
          results[key] = filterEmptyParams(data[key])
        }
      }
    })
    return results
  } else if (dataType(data) === 'Array') {
    const results = []
    data.forEach(item => {
      if (notEmptyStr(item)) {
        results.push(filterEmptyParams(item))
      }
    })
    return results
  }
  return data
}

/**
 * @Description: 取两个对象数组并集
 * @param { Array, Array, String } array1, array2, key
 * @returns Array
 */
export function mergeArray(array1, array2, key) {
  const array2Ids = deepClone(array1).map(item => item[key])
  const result = array2.filter(item => !array2Ids.includes(item[key]))
  return array1.concat(result)
}

/**
 * @Description: 区间内随机一个整数
 * @param { Number, Number } n, m
 * @returns Number
 */
export function randomInteger(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}

/**
 * @Description: 生成当前时间戳
 * @returns Number
 */
export function getTimestamp() {
  return parseInt((new Date().getTime() / 1000).toString(), 10)
}
