'use sttict';

const bodyParser = require('koa-bodyparser');

module.exports = app => {
	app.use(
		bodyParser({
			enableTypes: ['json', 'form'],
			jsonLimit: '50mb',
			strict: true,
			onerror: (err, ctx) => {
				ctx.throw('body parse error', 422);
			}
		})
	);
};
