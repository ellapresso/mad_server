'use strict';

// const POST = require('../models/post');
// 글 목록
const kakaoLogin = async (ctx) => {
    const req = ctx.request.body;
    return ctx.send(200, {
        req_body: req,
        ctx,
    });
};


module.exports.kakaoLogin = kakaoLogin;
