'use strict';

const USER = require('../models/user');

const getUserInfo = async (ctx) => {
    const userId = ctx.request.body.userId;
    const userInfo = await USER.getUserInfo(userId);

    return ctx.send(200, {
        userInfo,
    });
};

module.exports.getUserInfo = getUserInfo;
