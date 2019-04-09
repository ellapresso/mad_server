'use strict';

const Router = require('koa-router');

const testCtrl = require('./controllers/test2');
const postCtrl = require('./controllers/post');
const hashCtrl = require('./controllers/hash');

const POST = '/api/post';
const HASH = '/api/hash';

module.exports = (app) => {
    const router = new Router();

    app.use(router.routes());
    app.use(router.allowedMethods());

    router.get(`/api/test2`, testCtrl.getTest);
    router.post(`${POST}`, postCtrl.setPost);
    router.post(`${POST}/edit`, postCtrl.updatePost);
    router.get(`${POST}/list`, postCtrl.getPost);

    router.post(`${HASH}/post`, hashCtrl.setHash);
};
