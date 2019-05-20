'use strict';

const USER = require('../models/user');

const getUserInfo = async (ctx) => {
    const userId = ctx.request.body.userId;
    const userInfo = await USER.getUserInfo(userId);

    return ctx.send(200, {
        userInfo,
    });
};

// 작성한 글 리스트
const writedList = async (ctx) => {
    return;
};

// 좋아요 누른 글 리스트
const likeList = async (ctx) => {
    return;
};

module.exports.getUserInfo = getUserInfo;
module.exports.writedList = writedList;
module.exports.likeList = likeList;
