'use strict';

const http = require('http');
const Koa = require('koa');
// const database = require('./config/database');

const app = new Koa();
// const server = http.createServer(app.callback());
const Router = require('koa-router');
const router = new Router();
// require('./config/koa')(app);
// require('./routes')(app);

app.listen(4000);

app.use(async (ctx) => {
    ctx.body = 'Hello World';
});
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/health', (ctx) => {
    ctx.ok();
});
/**
 * 서버 구동
 */
// const serverStart = () => {
//     server.listen(process.env.PORT || 4000, async () => {
//         console.log('서버 시작');
//     });
// };

/**
 * 서버 종료시 후처리
 * - 데이터베이스 커넥션 종료
 */
// process.on('SIGINT', () => {
//     console.log('서버 종료');
//     server.close(() => {
//         database.mystockDb.close();
//         database.tudalwebDb.close();
//         database.redisDb.disconnect();
//         console.log('디비 종료');
//         process.exit(0);
//     });
// });

/**
 * 처리하지 못한 예외조항 로그기록
 */
process.on('uncaughtException', (err) => {
    console.log(err);
});

// setImmediate(serverStart);

module.exports = app;
