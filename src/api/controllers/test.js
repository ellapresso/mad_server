'use strick';

const Test = require('../models/test');

const getTest = (ctx, next) => {
	const test = Test.getTest(1);
	console.log('--------------------------------------------------------');
	console.log(test);
	// return '-3-3-3-3-';
	return ctx.send(200, {test});
};

module.exports.getTest = getTest;
