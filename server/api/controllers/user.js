'use strict';

const USER = require('../models/user');

const getUserInfo = async (ctx) => {
    const userId = ctx.request.body.userId;
    return ctx.send(200, {
        userId,
    });
};

module.exports.getUserInfo = getUserInfo;
