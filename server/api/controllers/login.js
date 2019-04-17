'use strict';
const axios = require(axios);
// const POST = require('../models/post');
// 글 목록
const kakaoLogin = async (ctx) => {
    // const req = ctx.request.body;
    axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: 'Authorization: Bearer ric62_woWy7UMpAV-fRik2TNgWOIijdE7l-FYAopyWAAAAFqKkiLKQ',
    }).then(function (response) {
        console.log(response);
        return ctx.send(200, response);
    });
    // return ctx.send(200, {
    //     req_body: req.access_token,
    //     ctx,
    // });
};

module.exports.kakaoLogin = kakaoLogin;
