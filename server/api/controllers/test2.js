'use strict';

const TEST = require('../models/test2');

// const getTest = async (ctx) => {
//     let test;
//     try {
//         test = await TEST.getTest();
//     } catch (err) {
//         console.log(err);
//         return ctx.send(422); // error code
//     }
//     console.log('con');
//     return ctx.send(200, test);
// };

const getTest = async (ctx) => {
    const test = await TEST.getTest();
    return ctx.send(200, test);
};

module.exports.getTest = getTest;
