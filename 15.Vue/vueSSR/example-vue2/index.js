const Vue = require('vue')
// 引入 renderer 对象后 调用 createRenderer 获取到真正的渲染器
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
	data: () => ({ msg: '我是服务端渲染的页面' }),
	template: `<div style="color: blue;">{{ msg }}</div>`
})

// 将 vue 项目渲染成字符串
// renderer.renderToString(app, (err, html) => {
// 	console.log(html);
// })

module.exports = renderer.renderToString(app)
