import { Context } from 'koa';

// tslint:disable-next-line: interface-name
export interface RestKoaContext extends Context {
		rest: (data: any) => void;
}
