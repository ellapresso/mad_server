'use strick';

const Test = require('../models/test');

const getTest = (ctx, next) => {
	const test = Test.getTest(1);
	console.log('--------------------------------------------------------');
	console.log(test);
	ctx.response.body = test;
	console.log(ctx.response.body);
	return '-3-3-3-3-';
	// return ctx.send(200, {test});
};

module.exports.getTest = getTest;
