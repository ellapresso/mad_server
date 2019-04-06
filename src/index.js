const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const CORS = require('@koa/cors');

// const env = require('./config/.env');

const app = new Koa();
const router = new Router();

require('./api')(app);
require('./config/koa')(app);

router.get('/', (ctx, next) => {
	ctx.body = 'koa';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 4000, async () => {
	console.log('connected');
});

// app.use(CORS({origin: 'https://mad-project.herokuapp.com'})); //cors 제한.
