import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { restify } from './src/middleware/rest';
import { router } from './src/route/route';

const app = new Koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
	// tslint:disable-next-line: no-console
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});

app.use(restify());

app.use(router.routes());

// Listen for 8443
app.listen(8443);
// tslint:disable-next-line: no-console
console.log('app started at port 8443...');
