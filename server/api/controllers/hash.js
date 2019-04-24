'use strict';

const POST = require('../models/post');

// 해시태그 등록
const setHash = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const hash = req.hash;
    const hashes = await POST.setHash(pno, hash);
    return ctx.send(200, {
        hashes,
    });
};

const delHash = async (ctx) => {
    const req = ctx.request.body;
    const pno = req.pno;
    const id = req.writer;
    const upDate = req.upDate;
    const delInfo = [upDate, pno, id];
    const delHash = await POST.deleteHash(delInfo);
    return ctx.send(200, {
        delHash,
    });
};

module.exports.setHash = setHash;
module.exports.delHash = delHash;
