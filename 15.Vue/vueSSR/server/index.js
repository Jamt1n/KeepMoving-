const app = new (require('koa'))()
const router = new (require('koa-router'))()
const example2 = require('../example-vue2/index')
const example3 = require('../example-vue3/index')
const htmlTemplate = require('fs').readFileSync('./template.html', 'utf-8')

router.get('/', ctx => {
	ctx.body = '<div style="color: red;">我是服务端渲染出来的页面</div>'
})

router.get('/example2', async ctx => {
	const html = await example2
	ctx.body = htmlTemplate.replace(
		'<div id="app">',
		`<div id="app">${html}`
	)
})

router.get('/example3', async ctx => {
	const html = await example3
	ctx.body = htmlTemplate.replace(
		'<div id="app">',
		`<div id="app">${html}`
	)
})

app.use(router.routes())
app.listen(2233, () => {
	console.log("http://localhost:2233 服务已启动")
})
