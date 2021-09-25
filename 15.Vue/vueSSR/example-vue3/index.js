// vue2 new Vue => vue3 createApp
const { createSSRApp } = require('vue')
//
const { renderToString } = require('@vue/server-renderer')

const app = createSSRApp({
	data: () => ({ msg: '这里是服务端渲染的页面', count: 0 }),
	template: `<div style="color: lawngreen" @click="count++">{{ msg }} - {{ count }}</div>`
})

module.exports = renderToString(app)
