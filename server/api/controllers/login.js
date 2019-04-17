'use strict';
const axios = require('axios');
// const POST = require('../models/post');
// 글 목록
const kakaoLogin = async (ctx) => {
    const token = ctx.request.body;
    return axios({
        method : 'post',
        url : 'https://kapi.kakao.com/v2/user/me',
        headers : token,
        responseType : 'json',
    }).then(function(response){
        ctx.send(200,response.data);
    })

};

module.exports.kakaoLogin = kakaoLogin;
