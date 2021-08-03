const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
let router = new Router();

app.use(static(__dirname+'/static'));
router.get('/', (ctx, next) => {
    ctx.body = "hello run at 4000";
})

router.get('/getAjax', (ctx, next) => {
    // console.log(ctx.query.name)
    // ctx.body = {
    //     name: 'jam4000',
    //     age: 20
    // };
    // ctx.body = "var a = 20";
    let obj = {
        a: 1,
        b: 2,
    }
    let cb = ctx.query.cb;
    ctx.body = `${cb}(${JSON.stringify(obj)})`
})

app.use(router.routes());
app.listen(4000)
