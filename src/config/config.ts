import { camelCase, snakeCase } from '../lib/changeCase';

const dbName = process.env.MYSQL_DB_NAME || 'address';

const specialChars = ['*'];

const convertToCase = (val: any, func: (data: any) => any) => {
	if (specialChars.includes(val)) {
		return val;
	}

	return func(val);
};

export default {
	db: {
		charset: 'utf8',
		client: 'mysql',
		connection: {
			database: dbName,
			host: process.env.MYSQL_HOST || 'db',
			password: process.env.MYSQL_PASSWORD || '267552',
			port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
			user: process.env.MYSQL_USER || 'root'
		},
		debug: process.env.DEBUG || false,
		pool: {
			bailAfter: 3 * 1000,
			max: process.env.POSTGRES_POOL_MAX || 10,
			min: process.env.POSTGRES_POOL_MIN || 2
		},
		postProcessResponse: (result: any, queryContext: any) => convertToCase(result, camelCase),
		wrapIdentifier: (value: string, origImpl: (value: string) => string, queryContext: any) => origImpl(convertToCase(value, snakeCase))
	}
};
