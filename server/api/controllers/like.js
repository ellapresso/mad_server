'use strict';

const LIKE = require('../models/like');

// 해시태그 등록
const setLike = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const userId = req.userId;
    const setLike = await LIKE.setLike(pno, userId);
    return ctx.send(200, {
        setLike,
    });
};

module.exports.setLike = setLike;
