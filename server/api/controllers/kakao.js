'use strict';

const KAKAO = require('../models/kakao');
require('../middlewares/passport');

const getUser = async (ctx) => {
    const user = await KAKAO.getUser();
    return ctx.send(200, user);
};

module.exports.getUser = getUser;
