'use strict';

const POST = require('../models/post');
const getPost = async (ctx) => {
    const post = await POST.getPost();
    return ctx.send(200, post);
};

const setPost = async (ctx) => {
    const req = ctx.request.body;
    const postContents = [req.title, req.contents, req.writer];
    const hash = req.hash;
    const write = await POST.setPost(postContents);
    const hashes = await POST.setHash(write.insertId, hash);
    /* TODO..
     * hash등록 에러시, post는 등록이 되는 상태.
     * 그 경우 error는 보내지고 있음.
     * try catch 로 잡아주기.
     * */
    return ctx.send(200, { write, hashes });
};
module.exports.getPost = getPost;
module.exports.setPost = setPost;
