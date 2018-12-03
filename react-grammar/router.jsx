// 页面路由
window.location.href = 'https://www.baidu.com'
window.back(); // 回退

// hash 路由
window.location = '#hash'
window.onhashchange = function() {
  console.log('current hash:', window.location.hash)
}
// H5 路由
// 推进一个状态  三个参数  名字  标题  路径
history.pathState('name', 'Title', '/path')
// 替换一个状态
history.replaceState('name', 'Title', '/path')
//  监听事件
window.onpopstate = function() {
  console.log(window.location.href)
  console.log(window.location.pathname)
  console.log(window.location.hash)
}