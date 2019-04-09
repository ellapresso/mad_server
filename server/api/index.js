'use strict';

const Router = require('koa-router');

const testCtrl = require('./controllers/test2');

const TEST = '/api/test2';

module.exports = (app) => {
    const router = new Router();

    app.use(router.routes());
    app.use(router.allowedMethods());

    router.get(`${TEST}`, testCtrl.getTest);
};
