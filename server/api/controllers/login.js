'use strict';

// const POST = require('../models/post');
// 글 목록
const kakaoLogin = async (ctx) => {
    const req = ctx.request.body;
    console.log(ctx);
    return ctx.send(200, {
        req,
    });
};


module.exports.kakaoLogin = kakaoLogin;
