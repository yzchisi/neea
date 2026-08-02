// 接口请求模块 - 获取考生信息数据

/**
 * 获取考生信息数据
 * @returns {Promise<Array>} 考生信息数组
 */
export const fetchUserInfo = async () => {
  // 使用 BASE_URL 拼接，确保 GitHub Pages 子路径下请求路径正确
  const baseUrl = import.meta.env.BASE_URL
  const response = await fetch(`${baseUrl}json/info.json`)
  if (!response.ok) {
    throw new Error('获取数据失败')
  }
  const data = await response.json()
  return data.userInfo
}
