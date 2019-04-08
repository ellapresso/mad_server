'use strict';

// const http = require('http');
const Koa = require('koa');
const respond = require('koa-respond');
require('dotenv').config();

const app = new Koa();
const Router = require('koa-router');
const router = new Router();

const mysql = require('mysql2');

const madDatabase = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASS,
    database: process.env.MADDB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

madDatabase.connect();

app.listen(process.env.PORT);
app.use(respond());

app.use(router.routes()).use(router.allowedMethods());

router.get('/health', ctx => {
    ctx.ok();
});

router.get('/test', ctx => {
    const testSql = 'select * from test where test_no=2';
    return madDatabase
        .promise()
        .query(testSql)
        .then(([rows, fields]) => {
            return ctx.send(200, {test: rows});
        });
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
process.on('uncaughtException', err => {
    console.log(err);
});

// setImmediate(serverStart);

module.exports = app;
