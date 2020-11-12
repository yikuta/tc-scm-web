
import { MatchType, DataType } from '../constant/search'

function getDataType(obj) {
  return Reflect.apply(Object.prototype.toString, obj, []).replace(/^\[object\s(\w+)\]$/, '$1').toUpperCase()
}
function matchSearchDataType(obj) {
  let typeStr = getDataType(obj)
  if (!DataType[typeStr]) throw new Error(`找不到匹配类型 ${typeStr}`)
  return DataType[typeStr]
}

// 判断空对象
function isEmptyObject(obj = {}) {
  return !Object.keys(obj).length
}

// 过滤空筛选条件
function filterEmptyData(data) {
  const results = {}
  Object.keys(data).map(key => {
    const item = data[key]
    const valueType = getDataType(item.value)
    if (item.value === false || item.value === 0 || (item.value && ((valueType !== 'ARRAY') || (valueType === 'ARRAY' && item.value.length)))) {
      results[key] = { ...item }
    }
  })
  return results
}
/**
 * @param {*} form 表单对象
 * code: { value: '', matchType: MatchType.ALL, type: SearctType.STRING },
 * type: { value: '', matchType: MatchType.ALL, type: SearctType.STRING },
 * status: { value: 0, matchType: MatchType.ALL, type: SearctType.NUMBER },
 * date: { value: '', matchType: MatchType.ALL, type: SearctType.DATE },
 * term: { value: 0, matchType: MatchType.ALL, type: SearctType.NUMBER },
 * work: { value: 0, matchType: MatchType.ALL, type: SearctType.NUMBER }
 */
const searchTool = (form) => {
  let formObj = filterEmptyData(form)
  if (isEmptyObject(formObj)) return []
  const formArray = []
  Object.values(formObj).map(item => {
    let valueObj = {
      propertyValue1: item.value
    }
    if (getDataType(item.value) === 'ARRAY') {
      item.value.map((valueItem, index) => {
        let valueItemkey = `propertyValue${++index}`
        valueObj[valueItemkey] = valueItem
      })
    }
    formArray.push({
      tempMatchType: item.matchType || MatchType.ALL,
      propertyName: item.name,
      ...valueObj,
      tempType: item.type || matchSearchDataType(item.value)
    })
  })
  return formArray
}

export default searchTool
