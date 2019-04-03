const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = 'koa';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT, async () => {
	console.log('connected');
});
