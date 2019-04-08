'use strict';

const Router = require('koa-router');

// const userCtrl = require('./controllers/user');

// const USER = '/api/user';

module.exports = (app) => {
    const router = new Router();

    app.use(router.routes());
    app.use(router.allowedMethods());

    // router.get(`${USER}`, userCtrl.getUser);
};
