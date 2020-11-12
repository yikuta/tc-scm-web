import { dataType, isEmptyObject } from './util'

export const MatchType = {
  ALL: '1', // 与
  UNEQUAL: '3', // 不等于
  EQUAL: '4', // 精准匹配 等于
  CONTAIN: '5', // 模糊匹配 包含
  LT: '6', // less than 小于
  GT: '7', // greater than 大于
  LTE: '8', // 小于等于
  GTE: '9', // 大于等于
  BETWEEN: '10', // 区间值(如：时间段)
  IN: '11', // in 包含,全模糊查询
  NOT_IN: '12', // 不包含
  NULL: '13', // 为空
  Not_NULL: '14', // 不为空
  PRE_DIM: '15' // 前模糊
}
export const DataType = {
  STRING: 'String',
  NUMBER: 'Number',
  DATE: 'Date',
  OBJECT: 'enum',
  ENUM: 'enum',
  BOOLEAN: 'boolean',
  INTEGER: 'Integer',
  ARRAY: 'List',
  LONG: 'Long',
  LISTLONG: 'List<Integer>',
  LISTLONG2: 'List<Long>',
  LISTENUM: 'List<enum>'
}

// 过滤空筛选条件
function filterEmptyData(data) {
  const results = {}
  Object.keys(data).map(key => {
    const item = data[key]
    const valueType = dataType(item.value)
    if (item.value === false || item.value === 0 || (item.value && ((valueType !== 'ARRAY') || (valueType === 'ARRAY' && item.value.length)))) {
      results[key] = { ...item }
    }
  })
  return results
}

function matchSearchDataType(obj) {
  const typeStr = dataType(obj).toUpperCase()
  if (!DataType[typeStr]) throw new Error(`找不到匹配类型 ${typeStr}`)
  return DataType[typeStr]
}

export default function searchFormat(data) {
  const newData = filterEmptyData(data)
  if (isEmptyObject(newData)) return []

  const results = []
  Object.keys(newData).forEach(key => {
    const item = newData[key]
    const itemObject = {
      tempMatchType: MatchType[item.matchType],
      propertyValue1: item.value,
      propertyName: item.name || key,
      tempType: item.tempType || matchSearchDataType(item.value)
    }
    if (dataType(item.value) === 'Array') {
      item.value.forEach((value, index) => {
        itemObject[`propertyValue${++index}`] = value
      })
    }
    results.push(itemObject)
  })
  return results
}
