// 数据脱敏工具函数

/**
 * 姓名脱敏：第1个字保留，从第2个字开始用 * 代替
 * @param {string} name - 原始姓名
 * @returns {string} 脱敏后的姓名
 */
export const maskName = (name) => {
  if (!name || name.length === 0) return ''
  return name.charAt(0) + '*'.repeat(name.length - 1)
}

/**
 * 身份证号脱敏：前2位和后3位保留，中间13位用 * 代替
 * @param {string} idCard - 原始身份证号
 * @returns {string} 脱敏后的身份证号
 */
export const maskIdCard = (idCard) => {
  if (!idCard || idCard.length < 5) return idCard || ''
  return idCard.substring(0, 2) + '*'.repeat(13) + idCard.substring(idCard.length - 3)
}
