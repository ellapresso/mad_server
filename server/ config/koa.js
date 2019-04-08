const cors = require('@koa/cors');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');

// Koa 미들웨어 설정
module.exports = (app) => {
    app.use(helmet());

    app.use(logger());

    app.use(
        bodyParser({
            enableTypes: ['json', 'form'],
            jsonLimit: '50mb',
            strict: true,
            onerror: (err, ctx) => {
                ctx.throw('body parse error', 422);
            },
        })
    );

    app.use(
        cors({
            allowHeaders: 'X-Requested-With',
            credentials: true,
        })
    );
    // app.use(CORS({ origin: 'https://mad-blog.now.sh/' }));
};
